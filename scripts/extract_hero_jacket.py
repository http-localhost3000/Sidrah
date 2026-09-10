"""Extract the reference jacket (the hooded bomber from the user's mockup)
as a high-resolution transparent PNG for the hero stage.

Pipeline:
  1. crop the jacket region from the reference mockup
  2. EDSR x4 neural super-resolution -> ~2240x1560 (4K-class garment)
  3. unsharp pass to counter the mockup's soft/motion-blurred sleeve
  4. rembg (isnet) background removal at the upscaled resolution
  5. inpaint the purple script that crosses both sleeves
  6. fragment cleanup, edge erosion, dark-fringe decontamination

Usage: python scripts/extract_hero_jacket.py
"""

import os

import cv2
import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove

REF = r"C:\Users\Nitin\.zcode\cli\image-cache\sess_c87ace47-11e8-4890-8817-c8c21f722b18\image-1b1152bebbaae519d7ab26dd890c0e1d.png"
OUT_DIR = "public/images/hero"
CROP = (260, 230, 820, 620)  # x0, y0, x1, y1 around the jacket
IVORY = (254, 250, 224)
MODEL = "isnet-general-use"
DST = os.path.join(OUT_DIR, "hero-jacket.png")
SR_MODEL = "models/EDSR_x4.pb"
SCALE = 4


def super_resolve(bgr: np.ndarray) -> np.ndarray:
    """EDSR x4 with a Lanczos fallback if the model cannot be loaded."""
    try:
        sr = cv2.dnn_superres.DnnSuperResImpl_create()
        sr.readModel(SR_MODEL)
        sr.setModel("edsr", SCALE)
        out = sr.upsample(bgr)
        print("super-resolution: EDSR x4")
        return out
    except Exception as e:
        print(f"EDSR unavailable ({e}); falling back to Lanczos")
        img = Image.fromarray(cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB))
        img = img.resize((bgr.shape[1] * SCALE, bgr.shape[0] * SCALE), Image.LANCZOS)
        return cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    im = Image.open(REF).convert("RGB").crop(CROP)
    print(f"crop: {im.size}")

    # 1) neural upscale + fabric crispening -------------------------------
    bgr = super_resolve(cv2.cvtColor(np.array(im), cv2.COLOR_RGB2BGR))
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
    rgb8 = Image.fromarray(rgb, "RGB").filter(
        ImageFilter.UnsharpMask(radius=3, percent=80, threshold=2)
    )
    rgb = np.array(rgb8)
    print(f"upscaled: {rgb.shape[1]}x{rgb.shape[0]}")

    # 2) background removal at full resolution ----------------------------
    session = new_session(MODEL)
    cut = remove(Image.fromarray(rgb, "RGB"), session=session)
    a = np.array(cut)

    # 3) purple script removal — hybrid resolution approach: TELEA inpainting
    #    smears badly on the 4x image (letters are huge there), so the fill is
    #    computed at native crop resolution, upscaled, and blended back ONLY
    #    under the dilated letter mask. Everything outside the mask stays at
    #    full EDSR crispness.
    hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
    purple4x = (
        (hsv[:, :, 0] > 115)
        & (hsv[:, :, 0] < 170)
        & (hsv[:, :, 1] > 55)
        & (hsv[:, :, 2] > 55)
        & (a[:, :, 3] > 40)
    ).astype(np.uint8) * 255
    band4x = np.zeros(purple4x.shape, dtype=np.uint8)
    band4x[130 * SCALE : 225 * SCALE, 30 * SCALE : 145 * SCALE] = 1
    band4x[130 * SCALE : 225 * SCALE, 350 * SCALE : 545 * SCALE] = 1
    purple4x = cv2.bitwise_and(purple4x, band4x)
    purple4x = cv2.dilate(purple4x, np.ones((13, 13), np.uint8), iterations=2)

    if purple4x.any():
        small = cv2.resize(
            rgb,
            (rgb.shape[1] // SCALE, rgb.shape[0] // SCALE),
            interpolation=cv2.INTER_AREA,
        )
        hsv_s = cv2.cvtColor(small, cv2.COLOR_RGB2HSV)
        purple_s = (
            (hsv_s[:, :, 0] > 115)
            & (hsv_s[:, :, 0] < 170)
            & (hsv_s[:, :, 1] > 55)
            & (hsv_s[:, :, 2] > 55)
        ).astype(np.uint8) * 255
        band_s = np.zeros(purple_s.shape, dtype=np.uint8)
        band_s[130:225, 30:145] = 1
        band_s[130:225, 350:545] = 1
        purple_s = cv2.bitwise_and(purple_s, band_s)
        purple_s = cv2.dilate(purple_s, np.ones((7, 7), np.uint8), iterations=2)

        filled_s = cv2.inpaint(
            cv2.cvtColor(small, cv2.COLOR_RGB2BGR), purple_s, 9, cv2.INPAINT_TELEA
        )
        filled_up = cv2.resize(
            filled_s, (rgb.shape[1], rgb.shape[0]), interpolation=cv2.INTER_CUBIC
        )

        # feathered blend weight: 1 inside the letters, easing out over ~24px
        weight = cv2.GaussianBlur(
            cv2.resize(purple_s, (rgb.shape[1], rgb.shape[0])).astype(np.float32) / 255.0,
            (0, 0),
            8,
        )[..., None]
        rgb = (rgb.astype(np.float32) * (1 - weight) + filled_up.astype(np.float32) * weight)
        rgb = rgb.astype(np.uint8)
        # sync the repaired colours into the rembg result
        a[:, :, :3] = rgb

    # 4) drop small disconnected fragments --------------------------------
    al = a[:, :, 3]
    n, labels, stats, _ = cv2.connectedComponentsWithStats((al > 40).astype(np.uint8), 8)
    if n > 1:
        areas = stats[1:, cv2.CC_STAT_AREA]
        biggest = 1 + int(np.argmax(areas))
        for i in range(1, n):
            if i != biggest and stats[i, cv2.CC_STAT_AREA] < areas.max() * 0.02:
                al[labels == i] = 0

    # 5) 1px-equivalent erosion + dark-fringe decontamination --------------
    al = cv2.erode(al, np.ones((5, 5), np.uint8))
    a[:, :, 3] = al
    semi = (a[:, :, 3] > 0) & (a[:, :, 3] < 250)
    a[:, :, :3][semi] = (a[:, :, :3][semi].astype(np.float32) * 0.78).astype(np.uint8)

    out = Image.fromarray(a, "RGBA")
    bbox = out.getchannel("A").point(lambda v: 255 if v > 10 else 0).getbbox()
    out = out.crop(bbox)
    out = out.filter(ImageFilter.UnsharpMask(radius=2, percent=45, threshold=3))
    out.save(DST, optimize=True)
    print("saved", DST, out.size)

    prev = Image.new("RGB", (out.size[0] // 2, out.size[1] // 2), IVORY)
    prev.paste(out.resize(prev.size, Image.LANCZOS), (0, 0), out.resize(prev.size, Image.LANCZOS))
    prev.save(os.path.join(OUT_DIR, "hero-jacket-preview.jpg"), quality=92)
    # zoomed left-sleeve crop so the softness can be judged directly
    zw, zh = out.size[0] // 3, out.size[1] // 3
    sleeve = out.crop((0, out.size[1] // 4, zw, out.size[1] // 4 + zh))
    sleeve_prev = Image.new("RGB", sleeve.size, IVORY)
    sleeve_prev.paste(sleeve, (0, 0), sleeve)
    sleeve_prev.save(os.path.join(OUT_DIR, "hero-jacket-sleeve-preview.jpg"), quality=92)


if __name__ == "__main__":
    main()
