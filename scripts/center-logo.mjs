import fs from 'node:fs'
import sharp from 'sharp'

const SRC = process.env.LOGO_SRC || 'public/miki-logo.JPG'
const OUT = 'public/miki-logo.png'
const OUT_SMALL = 'public/miki-logo-64.png'

// 1) Trim the surrounding off-white background.
// 2) Re-pad to a perfect square with the artwork centered by the pixel centroid
//    of the dark pixels, not the bounding-box center. That corrects any
//    slight asymmetry in the artwork itself.

async function main() {
  const src = sharp(SRC).ensureAlpha()
  const meta = await src.metadata()
  console.log('Source:', meta.width, 'x', meta.height)

  const {data, info} = await src
    .raw()
    .toBuffer({resolveWithObject: true})
  const {width, height, channels} = info

  // Find dark-pixel centroid + bounding box.
  let minX = width,
    minY = height,
    maxX = -1,
    maxY = -1
  let sumX = 0,
    sumY = 0,
    count = 0
  // "Ink" = any pixel that differs meaningfully from the off-white background.
  // Covers both black and coloured (e.g. green) logos.
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      const r = data[i],
        g = data[i + 1],
        b = data[i + 2]
      const isInk = r < 230 || g < 230 || b < 230
      if (isInk) {
        if (x < minX) minX = x
        if (y < minY) minY = y
        if (x > maxX) maxX = x
        if (y > maxY) maxY = y
        sumX += x
        sumY += y
        count++
      }
    }
  }
  if (count === 0) throw new Error('No ink pixels found')
  const bw = maxX - minX + 1
  const bh = maxY - minY + 1
  // Geometric centering uses the bounding-box midpoint, not the centroid —
  // otherwise a top-heavy shape like three triangles on two legs drifts upward.
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  console.log('Bounding box:', {minX, minY, maxX, maxY, bw, bh})
  console.log('Geometric center:', {cx: cx.toFixed(1), cy: cy.toFixed(1)})

  // Crop to the bounding box with a 10% margin, then pad to a perfect
  // square with the centroid placed at the exact center.
  const MARGIN = 0.1
  const side = Math.ceil(Math.max(bw, bh) * (1 + 2 * MARGIN))
  const half = side / 2

  // Extract a square region from the source image that has the centroid
  // exactly at its center. If that region extends past the source image,
  // pad the missing strip.
  const left = Math.round(cx - half)
  const top = Math.round(cy - half)

  // Compute how much of the crop goes outside the source image.
  const padLeft = Math.max(0, -left)
  const padTop = Math.max(0, -top)
  const padRight = Math.max(0, left + side - width)
  const padBottom = Math.max(0, top + side - height)
  const extractLeft = Math.max(0, left)
  const extractTop = Math.max(0, top)
  const extractW = side - padLeft - padRight
  const extractH = side - padTop - padBottom

  const centered = await sharp(SRC)
    .extract({
      left: extractLeft,
      top: extractTop,
      width: extractW,
      height: extractH,
    })
    .extend({
      top: padTop,
      bottom: padBottom,
      left: padLeft,
      right: padRight,
      background: {r: 255, g: 255, b: 255, alpha: 0},
    })
    .png({compressionLevel: 9})
    .toBuffer()

  fs.writeFileSync(OUT, centered)
  console.log(`Wrote ${OUT} (${side}x${side})`)

  // Also emit a smaller 128x128 optimized variant for header use.
  const small = await sharp(centered).resize(128, 128).png({compressionLevel: 9}).toBuffer()
  fs.writeFileSync(OUT_SMALL, small)
  console.log(`Wrote ${OUT_SMALL} (128x128)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
