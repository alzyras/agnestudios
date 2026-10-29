#!/usr/bin/env python3
"""Build versioned display WebP derivatives referenced by the Figma frames.

Run from any working directory with Pillow installed:
    python3 AGNESTUDIOS/scripts/build-image-previews.py

The script reads each frame's data-full-src and data-display-src attributes,
creates a display-v2 derivative beside the existing display image, updates
only data-display-src references, verifies the new references, then removes
unreferenced legacy display derivatives. Small preview files are untouched.
"""

from __future__ import annotations

import re
import statistics
import sys
from collections import Counter
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

from PIL import Image, ImageOps


PROJECT_ROOT = Path(__file__).resolve().parents[1]
FRAMES_DIR = PROJECT_ROOT / "assets" / "figma" / "frames"
PREVIEWS_DIR = PROJECT_ROOT / "assets" / "figma" / "previews"
MAX_EDGE = 2560
QUALITY = 88
METHOD = 6

IMAGE_TAG_RE = re.compile(r"<img\b[^>]*>", re.IGNORECASE | re.DOTALL)
DISPLAY_ATTR_RE = re.compile(
    r"(\bdata-display-src\s*=\s*)([\"'])(.*?)\2", re.IGNORECASE | re.DOTALL
)
TEXT_SUFFIXES = {".css", ".html", ".js", ".json", ".md", ".mjs", ".py", ".txt"}


@dataclass(frozen=True)
class FrameImage:
    frame_path: Path
    source_ref: str
    display_ref: str


class ImageReferenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.images: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() != "img":
            return
        attributes = dict(attrs)
        source_ref = attributes.get("data-full-src")
        display_ref = attributes.get("data-display-src")
        if source_ref and display_ref:
            self.images.append((source_ref, display_ref))


def image_references(frame_path: Path) -> list[FrameImage]:
    parser = ImageReferenceParser()
    parser.feed(frame_path.read_text(encoding="utf-8"))
    return [
        FrameImage(frame_path, source_ref, display_ref)
        for source_ref, display_ref in parser.images
    ]


def local_path(reference: str) -> Path:
    path = unquote(urlsplit(reference).path)
    if not path or path.startswith("/"):
        raise ValueError(f"Expected a project-relative asset path, got: {reference}")
    resolved = (PROJECT_ROOT / path).resolve()
    if not resolved.is_relative_to(PROJECT_ROOT):
        raise ValueError(f"Asset path escapes the project directory: {reference}")
    return resolved


def versioned_display_ref(reference: str) -> str:
    parsed = urlsplit(reference)
    path = Path(unquote(parsed.path))
    if path.suffix.lower() != ".webp":
        raise ValueError(f"Expected a WebP display derivative, got: {reference}")
    if path.stem.endswith("-display-v2"):
        new_path = path
    elif path.stem.endswith("-display"):
        new_path = path.with_name(f"{path.stem}-v2{path.suffix}")
    else:
        raise ValueError(f"Expected display filename ending in -display.webp: {reference}")
    return new_path.as_posix()


def collect_frame_images() -> list[FrameImage]:
    if not FRAMES_DIR.is_dir():
        raise FileNotFoundError(f"Frame directory not found: {FRAMES_DIR}")
    frames = sorted(FRAMES_DIR.glob("*.html"))
    if not frames:
        raise FileNotFoundError(f"No frame HTML files found in {FRAMES_DIR}")
    return [image for frame in frames for image in image_references(frame)]


def save_display_derivative(source_path: Path, output_path: Path) -> tuple[int, int]:
    if not source_path.is_file():
        raise FileNotFoundError(f"Image source not found: {source_path}")

    with Image.open(source_path) as source:
        image = ImageOps.exif_transpose(source)
        image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
        has_alpha = "A" in image.getbands() or "transparency" in image.info
        image = image.convert("RGBA" if has_alpha else "RGB")
        icc_profile = image.info.get("icc_profile")
        output_path.parent.mkdir(parents=True, exist_ok=True)
        save_options: dict[str, object] = {
            "format": "WEBP",
            "quality": QUALITY,
            "method": METHOD,
        }
        if icc_profile:
            save_options["icc_profile"] = icc_profile
        image.save(output_path, **save_options)
        return image.size


def replace_display_attributes(text: str, reference_map: dict[str, str]) -> str:
    def replace_tag(match: re.Match[str]) -> str:
        tag = match.group(0)
        attribute = DISPLAY_ATTR_RE.search(tag)
        if not attribute:
            return tag
        replacement = reference_map.get(attribute.group(3))
        if replacement is None:
            return tag
        start, end = attribute.span(3)
        return tag[:start] + replacement + tag[end:]

    return IMAGE_TAG_RE.sub(replace_tag, text)


def rewrite_frame_references(reference_map: dict[str, str]) -> int:
    changed_frames = 0
    for frame_path in sorted(FRAMES_DIR.glob("*.html")):
        original = frame_path.read_text(encoding="utf-8")
        updated = replace_display_attributes(original, reference_map)
        if updated != original:
            temporary_path = frame_path.with_suffix(frame_path.suffix + ".tmp")
            temporary_path.write_text(updated, encoding="utf-8")
            temporary_path.replace(frame_path)
            changed_frames += 1
    return changed_frames


def verify_references() -> list[FrameImage]:
    images = collect_frame_images()
    missing: list[str] = []
    for image in images:
        if not image.display_ref.endswith("-display-v2.webp"):
            missing.append(f"{image.frame_path.name}: {image.display_ref}")
            continue
        display_path = local_path(image.display_ref)
        if not display_path.is_file():
            missing.append(f"{image.frame_path.name}: missing {image.display_ref}")
    if missing:
        raise RuntimeError("Display reference verification failed:\n  " + "\n  ".join(missing))
    return images


def find_text_references(reference: str) -> list[Path]:
    references: list[Path] = []
    for path in PROJECT_ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        if reference in text:
            references.append(path)
    return references


def remove_unused_legacy_displays(old_refs: set[str]) -> int:
    # Check every old path before deleting any of them.
    remaining: dict[str, list[Path]] = {
        reference: find_text_references(reference) for reference in old_refs
    }
    referenced = {
        reference: paths for reference, paths in remaining.items() if paths
    }
    if referenced:
        detail = "\n".join(
            f"  {reference}: {', '.join(str(path) for path in paths)}"
            for reference, paths in sorted(referenced.items())
        )
        raise RuntimeError(
            "Legacy display files are still referenced; leaving them in place:\n" + detail
        )

    deleted = 0
    for reference in sorted(old_refs):
        old_path = local_path(reference)
        if old_path.exists():
            old_path.unlink()
            deleted += 1
    return deleted


def report_outputs(output_paths: set[Path]) -> None:
    rows: list[tuple[int, int, int]] = []
    for path in sorted(output_paths):
        with Image.open(path) as image:
            rows.append((image.width, image.height, path.stat().st_size))
    total_bytes = sum(size for _, _, size in rows)
    dimension_bins = Counter(
        "<=1024 px" if max(width, height) <= 1024
        else "1025–1600 px" if max(width, height) <= 1600
        else "1601–2559 px" if max(width, height) < MAX_EDGE
        else "2560 px"
        for width, height, _ in rows
    )
    sizes = [size for _, _, size in rows]
    print(f"Generated {len(rows)} display-v2 WebPs; total {total_bytes:,} bytes.")
    print(
        "Dimensions by long edge: "
        + ", ".join(
            f"{label}: {dimension_bins[label]}"
            for label in ("<=1024 px", "1025–1600 px", "1601–2559 px", "2560 px")
            if dimension_bins[label]
        )
    )
    if sizes:
        print(
            "File sizes: "
            f"min {min(sizes):,} bytes, "
            f"median {int(statistics.median(sizes)):,} bytes, "
            f"max {max(sizes):,} bytes."
        )


def main() -> int:
    frame_images = collect_frame_images()
    reference_map: dict[str, str] = {}
    source_by_output: dict[str, str] = {}
    for image in frame_images:
        new_ref = versioned_display_ref(image.display_ref)
        previous = reference_map.setdefault(image.display_ref, new_ref)
        if previous != new_ref:
            raise ValueError(f"Conflicting output paths for {image.display_ref}")
        previous_source = source_by_output.setdefault(new_ref, image.source_ref)
        if previous_source != image.source_ref:
            raise ValueError(f"Multiple full sources point to {new_ref}")

    if not reference_map:
        raise RuntimeError("No paired data-full-src/data-display-src image references found.")

    output_paths: set[Path] = set()
    new_dimensions: dict[str, tuple[int, int]] = {}
    for old_ref, new_ref in sorted(reference_map.items()):
        output_path = local_path(new_ref)
        dimensions = save_display_derivative(
            local_path(source_by_output[new_ref]),
            output_path,
        )
        output_paths.add(output_path)
        new_dimensions[new_ref] = dimensions

    # Confirm every derivative can be reopened before changing any HTML.
    for path in output_paths:
        with Image.open(path) as image:
            image.verify()
    if any(max(dimensions) > MAX_EDGE for dimensions in new_dimensions.values()):
        raise RuntimeError(f"An output exceeds the {MAX_EDGE}px long-edge limit.")

    changed_frames = rewrite_frame_references(reference_map)
    verified_images = verify_references()
    updated_refs = {image.display_ref for image in verified_images}
    if updated_refs != set(reference_map.values()):
        raise RuntimeError("Updated frame references do not match the generated display set.")

    # Any old display file not represented by a current data-display-src is safe
    # to remove only after scanning text files for remaining exact references.
    legacy_refs = {
        path.relative_to(PROJECT_ROOT).as_posix()
        for path in PREVIEWS_DIR.glob("*-display.webp")
    }
    legacy_refs -= updated_refs
    deleted_legacy = remove_unused_legacy_displays(legacy_refs)

    print(
        f"Updated display-src references in {changed_frames} frame files "
        f"({len(verified_images)} image references, {len(updated_refs)} unique assets)."
    )
    print(
        f"Deleted {deleted_legacy} unreferenced legacy display WebPs. "
        "Small previews and full-resolution sources were left unchanged."
    )
    report_outputs(output_paths)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(f"build-image-previews.py: {error}", file=sys.stderr)
        raise
