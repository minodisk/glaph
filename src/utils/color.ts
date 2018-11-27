const { max, min, round } = Math

/**
 * [0]: 0 ~ 360
 * [1]: 0 ~ 1
 * [2]: 0 ~ 1
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
  if (v > 1) {
    return 1
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
  return [h, a === 0 ? s : s / a, a / 0xff]
}

export const hsv2rgb = ([h, s, v]: HSV): number => {
  if (s <= 0) {
    const c = round(v * 0xff)
    return (c << 16) | (c << 8) | c
  }
  h /= 60
  const i = h >> 0
  const f = h - i
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
  return (round(r * 0xff) << 16) | (round(g * 0xff) << 8) | round(b * 0xff)
}
