"""Extract the hero model as a transparent PNG using rembg (U²-Net).

Runs a couple of models, composites each result on the brand ivory so the
matte quality can be judged, and writes the winner to
public/images/hero/hero-cutout.png.

Usage: python scripts/extract_hero_cutout.py
"""

import os

from PIL import Image
from rembg import new_session, remove

SRC = "public/images/products/SIDRAH FASHION PRODUCTS IMAGE/IMG_20260902_181530.jpg.jpeg"
OUT_DIR = "public/images/hero"
DST = os.path.join(OUT_DIR, "hero-cutout.png")

IVORY = (254, 250, 224)  # --ivory
MODELS = ["u2net", "isnet-general-use", "u2net_human_seg"]


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    im = Image.open(SRC).convert("RGB")
    print(f"source: {SRC} ({im.size[0]}x{im.size[1]})")

    for model in MODELS:
        print(f"model: {model} ...")
        session = new_session(model)
        cut = remove(im, session=session)
        preview = Image.new("RGB", im.size, IVORY)
        preview.paste(cut, (0, 0), cut)
        preview.save(os.path.join(OUT_DIR, f"preview-{model}.jpg"), quality=92)
        cut.save(os.path.join(OUT_DIR, f"cutout-{model}.png"), optimize=True)
        print(f"  wrote preview-{model}.jpg / cutout-{model}.png")


if __name__ == "__main__":
    main()
