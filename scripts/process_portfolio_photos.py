"""Create metadata-free, web-sized portfolio images from the selected originals."""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

from PIL import Image, ImageOps


SOURCE_DIR = Path.home() / "OneDrive - PwC" / "Pictures" / "Portfolio pictures"
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "assets" / "photos"
HEIF_CONVERT = shutil.which("heif-convert")

FILES = [
    "20250101_094540235_iOS.heic",
    "20250611_055911708_iOS.heic",
    "20240530_061940342_iOS.jpg",
    "20240630_011830940_iOS.jpg",
    "20240630_031217697_iOS.jpg",
    "20240705_041712185_iOS.jpg",
    "20240707_024815180_iOS.jpg",
    "20240811_004235087_iOS.jpg",
    "20240816_035157206_iOS.jpg",
    "20250101_043921854_iOS.jpg",
    "20250101_064904289_iOS.jpg",
    "20250601_100024000_iOS.jpg",
    "20250602_134950000_iOS.jpg",
    "20250605_180315000_iOS.jpg",
    "20250607_132032000_iOS.jpg",
    "20250703_004113000_iOS.jpg",
    "20250704_013904000_iOS.jpg",
    "20250928_142845000_iOS.jpg",
    "20251027_225931000_iOS.jpg",
    "20251126_223418000_iOS.jpg",
    "20260208_000746000_iOS.jpg",
    "20260208_005154000_iOS.jpg",
    "20260606_211116000_iOS.jpg",
    "20260613_190753000_iOS.jpg",
    "20260629_132433000_iOS.jpg",
    "20260630_163536000_iOS.jpg",
    "20260702_112818000_iOS.jpg",
    "20260703_174112000_iOS.jpg",
    "20260708_184646000_iOS.jpg",
    "20260709_143239000_iOS.jpg",
    "20260709_191427000_iOS.jpg",
    "20260718_043735000_iOS.jpg",
    "20260718_051004000_iOS.jpg",
    "20260808_234137152_iOS.jpg",
    "20260808_235615225_iOS.jpg",
]


def open_image(source: Path, scratch_dir: Path) -> Image.Image:
    if source.suffix.lower() != ".heic":
        return Image.open(source)

    if not HEIF_CONVERT:
        raise RuntimeError("heif-convert is required to process the selected HEIC images")

    converted = scratch_dir / f"{source.stem}-source.png"
    subprocess.run(
        [str(HEIF_CONVERT), str(source), str(converted)],
        check=True,
        capture_output=True,
        text=True,
    )
    return Image.open(converted)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for index, filename in enumerate(FILES, start=1):
        source = SOURCE_DIR / filename
        output = OUTPUT_DIR / f"frame-{index:02d}.webp"
        converted = OUTPUT_DIR / f"{source.stem}-source.png"
        with open_image(source, OUTPUT_DIR) as raw_image:
            image = ImageOps.exif_transpose(raw_image).convert("RGB")
            image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            width, height = image.size
            image.save(
                output,
                "WEBP",
                quality=82,
                method=6,
                exif=b"",
                icc_profile=None,
            )
        if converted.exists():
            converted.unlink()
        print(f"{index:02d}\t{filename}\t{width}x{height}\t{output.stat().st_size}")

    total = sum((OUTPUT_DIR / f"frame-{i:02d}.webp").stat().st_size for i in range(1, len(FILES) + 1))
    print(f"total\t{len(FILES)} files\t{total} bytes")


if __name__ == "__main__":
    main()
