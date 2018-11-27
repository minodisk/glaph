const { max, min, round } = Math

/**
 * [0]: 0 ~ 360
 * [1]: 0x00 ~ 0xff
 * [2]: 0x00 ~ 0xff
 */
export type HSV = [number, number, number]

export const hue = (rgb: number, delta: number): number => {
  const [h, s, v] = rgb2hsv(rgb)
  return hsv2rgb([(h + delta) % 360, s, v])
}

export const saturation = (rgb: number, delta: number): number => {
  const [h, s, v] = rgb2hsv(rgb)
  return hsv2rgb([h, normalize(s + delta), v])
}

export const value = (rgb: number, delta: number): number => {
  const [h, s, v] = rgb2hsv(rgb)
  return hsv2rgb([h, s, normalize(v + delta)])
}

const normalize = (v: number): number => {
  if (v < 0) {
    return 0
  }
  if (v > 0xff) {
    return 0xff
  }
  return v
}

export const rgb2hsv = (rgb: number): HSV => {
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = rgb & 0xff
  const i = min(r, g, b)
  const a = max(r, g, b)
  const s = a - i
  let h = 0
  switch (a) {
    case i:
      break
    case r:
      h = 60 * ((g - b) / s)
      if (h < 0) {
        h += 360
      }
      break
    case g:
      h = 120 + 60 * ((b - r) / s)
      break
    case b:
      h = 240 + 60 * ((r - g) / s)
      break
  }
  return [h, a === 0 ? s : (s / a) * 0xff, a]
}

export const hsv2rgb = ([h, s, v]: HSV): number => {
  if (s <= 0) {
    return (v << 16) | (v << 8) | v
  }
  h /= 60
  const i = h >> 0
  const f = h - i
  s /= 0xff
  let r = v
  let g = v
  let b = v
  switch (i) {
    case 0:
    case 6:
      g *= 1 - s * (1 - f)
      b *= 1 - s
      break
    case 1:
      r *= 1 - s * f
      b *= 1 - s
      break
    case 2:
      r *= 1 - s
      b *= 1 - s * (1 - f)
      break
    case 3:
      r *= 1 - s
      g *= 1 - s * f
      break
    case 4:
      r *= 1 - s * (1 - f)
      g *= 1 - s
      break
    case 5:
      g *= 1 - s
      b *= 1 - s * f
      break
  }
  return (round(r) << 16) | (round(g) << 8) | round(b)
}
