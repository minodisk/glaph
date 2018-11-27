import * as assert from 'assert'
import { HSV, hsv2rgb, hue, rgb2hsv, saturation } from './color'

describe('utils/color', () => {
  describe('rgb2hsv', () => {
    ;[
      { rgb: 0x000000, expected: [0, 0, 0] },
      { rgb: 0xff0000, expected: [0, 1, 1] },
      { rgb: 0x00ff00, expected: [120, 1, 1] },
      { rgb: 0x0000ff, expected: [240, 1, 1] },
      { rgb: 0xffff00, expected: [60, 1, 1] },
      { rgb: 0xff00ff, expected: [300, 1, 1] },
      { rgb: 0x00ffff, expected: [180, 1, 1] },
      { rgb: 0xffffff, expected: [0, 0, 1] },
      { rgb: 0x000002, expected: [240, 1, 0x02 / 0xff] },
    ].forEach(({ rgb, expected }) => {
      it(`should return ${expected} with ${rgb.toString(16)}`, () => {
        assert.deepStrictEqual(rgb2hsv(rgb), expected)
      })
    })
  })

  describe('hsv2rgb', () => {
    ;[
      { hsv: [0, 0, 0], expected: 0x000000 },
      { hsv: [180, 0, 0], expected: 0x000000 },
      { hsv: [0, 1, 0], expected: 0x000000 },
      { hsv: [180, 1, 0], expected: 0x000000 },
      { hsv: [0, 0, 1], expected: 0xffffff },
      { hsv: [180, 0, 1], expected: 0xffffff },
      { hsv: [0, 1, 1], expected: 0xff0000 },
      { hsv: [60, 1, 1], expected: 0xffff00 },
      { hsv: [120, 1, 1], expected: 0x00ff00 },
      { hsv: [180, 1, 1], expected: 0x00ffff },
      { hsv: [240, 1, 1], expected: 0x0000ff },
      { hsv: [300, 1, 1], expected: 0xff00ff },
      { hsv: [360, 1, 1], expected: 0xff0000 },
    ].forEach(({ hsv, expected }) => {
      it(`should return ${expected.toString(16)} with ${hsv}`, () => {
        assert(hsv2rgb(hsv as HSV) === expected)
      })
    })
  })

  describe('rgb2hsv pipes hsv2rgb', () => {
    for (let i = 0; i <= 1000; i += 1) {
      const rgb = (0xffffff * Math.random()) >> 0
      const [h, s, v] = rgb2hsv(rgb)
      it(`hsv should be in valid range`, () => {
        assert(h >= 0)
        assert(h <= 360)
        assert(s >= 0)
        assert(s <= 1)
        assert(v >= 0)
        assert(v <= 1)
      })
      it(`should be always same value as input: ${rgb.toString(16)}`, () => {
        assert(hsv2rgb([h, s, v]) === rgb)
      })
    }
  })

  describe('hue', () => {
    ;[
      { rgb: 0x000000, delta: 0, expected: 0x000000 },
      { rgb: 0x000000, delta: 120, expected: 0x000000 },
      { rgb: 0x000000, delta: 240, expected: 0x000000 },
      { rgb: 0x000000, delta: 360, expected: 0x000000 },
      { rgb: 0xff0000, delta: 0, expected: 0xff0000 },
      { rgb: 0xff0000, delta: 120, expected: 0x00ff00 },
      { rgb: 0xff0000, delta: 240, expected: 0x0000ff },
      { rgb: 0xff0000, delta: 360, expected: 0xff0000 },
      { rgb: 0x00ff00, delta: 0, expected: 0x00ff00 },
      { rgb: 0x00ff00, delta: 120, expected: 0x0000ff },
      { rgb: 0x00ff00, delta: 240, expected: 0xff0000 },
      { rgb: 0x00ff00, delta: 360, expected: 0x00ff00 },
      { rgb: 0x0000ff, delta: 0, expected: 0x0000ff },
      { rgb: 0x0000ff, delta: 120, expected: 0xff0000 },
      { rgb: 0x0000ff, delta: 240, expected: 0x00ff00 },
      { rgb: 0x0000ff, delta: 360, expected: 0x0000ff },
      { rgb: 0xffff00, delta: 0, expected: 0xffff00 },
      { rgb: 0xffff00, delta: 120, expected: 0x00ffff },
      { rgb: 0xffff00, delta: 240, expected: 0xff00ff },
      { rgb: 0xffff00, delta: 360, expected: 0xffff00 },
    ].forEach(({ rgb, delta, expected }) => {
      it(`should return ${expected.toString(16)} with rgb: ${rgb.toString(
        16,
      )} and delta: ${delta}`, () => {
        assert(hue(rgb, delta) === expected)
      })
    })
  })

  describe('saturation', () => {
    ;[
      { rgb: 0xff0000, delta: 0, expected: 0xff0000 },
      { rgb: 0xff0000, delta: -0.2, expected: 0xff3333 },
      { rgb: 0xff0000, delta: -0.4, expected: 0xff6666 },
      { rgb: 0xff0000, delta: -0.6, expected: 0xff9999 },
      { rgb: 0xff0000, delta: -0.8, expected: 0xffcccc },
      { rgb: 0xff0000, delta: -1, expected: 0xffffff },
    ].forEach(({ rgb, delta, expected }) => {
      it(`rgb: ${rgb.toString(
        16,
      )}, delta: ${delta} should be ${expected.toString(16)}`, () => {
        assert(saturation(rgb, delta) === expected)
      })
    })
  })
})
