import { translatePx } from './style'

describe('style', () => {
  describe('transltePx', () => {
    it('should return translate(Xpx Ypx)', () => {
      expect(translatePx(10, 20)).toBe('translate(10px, 20px)')
    })
  })
})
