import * as assert from 'assert'
import { digits, roundUp } from './number'

describe('utils', () => {
  describe('number', () => {
    describe('digits', () => {
      ;[
        {
          input: 1234.123,
          expected: 4,
        },
        {
          input: 1234,
          expected: 4,
        },
        {
          input: 1,
          expected: 1,
        },
        {
          input: 0,
          expected: 0,
        },
        {
          input: 0.123,
          expected: -1,
        },
        {
          input: 0.0123,
          expected: -2,
        },
        {
          input: -1234.123,
          expected: 4,
        },
        {
          input: -1234,
          expected: 4,
        },
        {
          input: -1,
          expected: 1,
        },
        {
          input: -0.123,
          expected: -1,
        },
        {
          input: -0.0123,
          expected: -2,
        },
      ].forEach(({ input, expected }) => {
        it(`should return ${expected} with ${input}`, () => {
          assert.deepStrictEqual(digits(input), expected)
        })
      })
    })

    describe('roundUp', () => {
      ;[
        {
          input: 1000,
          expected: 1000,
        },
        {
          input: 1001,
          expected: 1100,
        },
        {
          input: 1100,
          expected: 1100,
        },
      ].forEach(({ input, expected }) => {
        it(`should return ${expected} with ${input}`, () => {
          assert(roundUp(input) === expected)
        })
      })
    })
  })
})
