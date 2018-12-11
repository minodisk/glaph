const { pow } = Math

export const digits = (n: number): number => {
  if (n === 0) {
    return 0
  }
  if (n < 0) {
    n *= -1
  }
  if (n >= 1) {
    return (n >> 0).toString().length
  }
  const d = n.toString().split('.')[1]
  for (let i = 0; i < d.length; i++) {
    if (d.charAt(i) !== '0') {
      return -(i + 1)
    }
  }
  throw new Error(`should not reach`)
}

export const roundUp = (n: number): number => {
  const i = digits(n)
  if (i >= 2) {
    const low = pow(10, i - 2)
    const rounded = (n / low) >> 0
    if (n === rounded * low) {
      return n
    }
    return (rounded + 1) * low
  }
  return 0
}

export const step = (n: number): number => {
  const i = digits(n)
  return ((n / pow(10, i - 1)) >> 0) * pow(10, i - 2)
}

export const steps = (n: number): Array<number> => {
  const upper = roundUp(n)
  const interval = step(upper)
  const arr = []
  let i = 0
  while (true) {
    i += interval
    arr.push(i)
    if (i >= upper) {
      break
    }
  }
  return arr
}
