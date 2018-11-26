import { translatePer, translatePx } from './style'

describe('utils/style', () => {
  describe('translatePx', () => {
    it('should return translate(Xpx, Ypx)', () => {
      expect(translatePx(10, 20)).toBe('translate(10px, 20px)')
    })
  })

  describe('translatePer', () => {
    it('should return translate(X%, Y%)', () => {
      expect(translatePer(10, 20)).toBe('translate(10%, 20%)')
    })
  })
})
