"""Build responsive WebP copies from the existing, metadata-free site photos."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
photos = root / 'assets' / 'photos'
output = photos / 'small'
output.mkdir(exist_ok=True)
before = after = 0
# Preserve the higher-quality thumbnails chosen in the September quality pass.
retouched = {37, 38, 49, 58, 61, 62, 67}
for source in sorted(photos.glob('frame-*.webp')):
    with Image.open(source) as photo:
        width = min(640, photo.width)
        resized = photo.resize((width, round(photo.height * width / photo.width)), Image.Resampling.LANCZOS)
        target = output / source.name
        quality = 85 if int(source.stem.split('-')[1]) in retouched else 78
        resized.save(target, 'WEBP', quality=quality, method=6)
        before += source.stat().st_size
        after += target.stat().st_size
print(f'Responsive copies: {before:,} -> {after:,} bytes ({(1-after/before):.0%} smaller)')
