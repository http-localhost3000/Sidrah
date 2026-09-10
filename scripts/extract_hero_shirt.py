"""Build the shirt-only hero cutout (public/images/hero/hero-shirt.png).

Takes the full-body rembg cutout of the sage kurta model and converts it
into a floating-garment presentation:
  1. removes everything above the collar line (head),
  2. chromatically removes bare arms below the sleeve openings and any
     denim below the waist (fabric is green, skin warm, jeans blue),
  3. repairs the fabric area where the forearm overlapped the shirt with
     a targeted Telea inpaint,
  4. trims below the hem, drops disconnected scraps and feathers edges.

Usage: python scripts/extract_hero_shirt.py
"""

import cv2
import numpy as np
from PIL import Image, ImageFilter

SRC = "public/images/hero/shirt-sage.png"
DST = "public/images/hero/hero-shirt.png"
PREVIEW = "public/images/hero/hero-shirt-preview.jpg"
IVORY = (254, 250, 224)

TOP = 430  # just above the collar peak
SLEEVE_Y = 880  # sleeve openings; bare arms live below this
BITE = (552, 1010, 668, 1255)  # x0, y0, x1, y1 - forearm/fabric overlap
BOTTOM = 1425  # hard cut below the hem
HEM_ROW = 1385  # row that defines the shirt width for the side trim
PATCH_BOX = (1130, 1275, 110, 200)  # y0, y1, x0, x1 - leather label


def main():
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    a = np.array(im).astype(np.uint8)
    alpha = a[:, :, 3].astype(np.int16)
    rgb = a[:, :, :3].astype(np.int16)
    R, G, B = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    rows = np.arange(h)[:, None]

    # 1) head removal
    alpha[:TOP, :] = 0

    # 2) chromatic cleanup ------------------------------------------------
    skin = (R > G + 4) & (R > B + 6)
    was_opaque = (alpha > 120)

    bite_mask = np.zeros((h, w), dtype=bool)
    x0, y0, x1, y1 = BITE
    bite_mask[y0:y1, x0:x1] = True
    inpaint_mask = (bite_mask & was_opaque & skin & (rows >= SLEEVE_Y))

    arm = skin & (rows >= SLEEVE_Y) & ~inpaint_mask
    y0p, y1p, x0p, x1p = PATCH_BOX
    arm[y0p:y1p, x0p:x1p] = False
    alpha[arm] = 0
    alpha[TOP:620][skin[TOP:620]] = 0

    alpha[(B > R + 8) & (rows >= 1250)] = 0  # jeans

    # 3) inpaint the forearm/fabric overlap -------------------------------
    m = inpaint_mask.astype(np.uint8) * 255
    if m.any():
        rgb8 = a[:, :, :3].copy()
        rgb8[m > 0] = 0
        filled = cv2.inpaint(cv2.cvtColor(rgb8, cv2.COLOR_RGB2BGR), m, 9, cv2.INPAINT_TELEA)
        a[:, :, :3] = cv2.cvtColor(filled, cv2.COLOR_BGR2RGB)
        alpha_filled = cv2.inpaint(alpha.astype(np.uint8), m, 9, cv2.INPAINT_TELEA)
        alpha[m > 0] = np.clip(alpha_filled[m > 0], 0, 255)

    # 4) bottom trim -------------------------------------------------------
    alpha[BOTTOM:, :] = 0
    row = np.where(alpha[HEM_ROW] > 60)[0]
    if len(row):
        l, r = int(row[0]) + 16, int(row[-1]) - 16
        ys2, xs2 = np.mgrid[0:h, 0:w]
        alpha[(ys2 > HEM_ROW) & ((xs2 < l) | (xs2 > r))] = 0

    # 4b) hem edge cleanup: dark jean/shadow remnants near the bottom edge
    dark = (R + G + B) < 340
    alpha[dark & (rows > 1330)] = 0

    # 5) feather + prune thin appendages + largest component --------------
    am = Image.fromarray(alpha.astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.3))
    am = am.point(lambda v: 0 if v < 28 else min(255, int(v * 1.3)))
    al = np.array(am)
    binm = (al > 40).astype(np.uint8)
    # opening cuts thin bridges, so dangling scraps detach from the shirt
    opened = cv2.morphologyEx(binm, cv2.MORPH_OPEN, np.ones((9, 9), np.uint8))
    n, labels, stats, _ = cv2.connectedComponentsWithStats(opened, 8)
    if n > 1:
        biggest = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
        keep = cv2.dilate((labels == biggest).astype(np.uint8), np.ones((7, 7), np.uint8))
        al[keep == 0] = 0
    a[:, :, 3] = al

    # 6) fill the neck hole so the collar reads like a real garment --------
    # Transparent pixels inside the collar with fabric on both sides at the
    # same row get a shadowed fabric fill (darkest at the top, like the
    # shaded interior of a worn shirt) instead of showing the page through.
    ys3, xs3 = np.mgrid[0:h, 0:w]
    region = np.zeros((h, w), dtype=bool)
    region[428:478, 315:475] = True
    hole = (al < 50) & region
    hole &= np.roll(al > 120, -7, axis=1) & region
    hole &= np.roll(al > 120, 7, axis=1) & region
    if hole.any():
        hole_rows = ys3[hole]
        top_r, bot_r = int(hole_rows.min()), int(hole_rows.max())
        t = ((ys3 - top_r) / max(1, bot_r - top_r)).clip(0, 1)
        for c, base in enumerate((168, 182, 118)):  # collar sage, shadowed
            ch = a[:, :, c].astype(np.float32)
            ch[hole] = base * (0.55 + 0.25 * t)
            a[:, :, c] = np.clip(ch, 0, 255).astype(np.uint8)
        al[hole] = 255
        # soften the fill boundary into the collar fabric
        soft = cv2.GaussianBlur(al, (5, 5), 1.2)
        edge = hole & (soft < 250)
        al[edge] = soft[edge]
        a[:, :, 3] = al

    # 7) gentle fabric enhancement (crisper weave, no halos) ---------------
    rgb_img = Image.fromarray(a[:, :, :3], "RGB")
    rgb_img = rgb_img.filter(ImageFilter.UnsharpMask(radius=2, percent=55, threshold=3))
    a[:, :, :3] = np.array(rgb_img)

    out = Image.fromarray(a, "RGBA")
    bbox = out.getchannel("A").point(lambda v: 255 if v > 10 else 0).getbbox()
    out = out.crop(bbox)
    out.save(DST, optimize=True)
    print("saved", DST, out.size)

    prev = Image.new("RGB", out.size, IVORY)
    prev.paste(out, (0, 0), out)
    prev.save(PREVIEW, quality=90)


if __name__ == "__main__":
    main()
