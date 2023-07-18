import { abs } from './BigInt'

describe('abs', () => {
  it('should return 0 when input is 0n', () => {
    expect(abs(0n)).toBe(0n)
  })

  it('should return the number itself when input is a positive number', () => {
    expect(abs(1234n)).toBe(1234n)
    expect(abs(987654321n)).toBe(987654321n)
    expect(abs(9999999n)).toBe(9999999n)
  })

  it('should return the absolute value when input is a negative number', () => {
    expect(abs(-1234n)).toBe(1234n)
    expect(abs(-987654321n)).toBe(987654321n)
    expect(abs(-9999999n)).toBe(9999999n)
  })

  it('should return the number itself when input is already a positive bigint', () => {
    expect(abs(9223372036854775807n)).toBe(9223372036854775807n)
  })

  it('should return the absolute value when input is already a negative bigint', () => {
    expect(abs(-9223372036854775808n)).toBe(9223372036854775808n)
  })

  it('should return the number itself when input is already zero', () => {
    expect(abs(0n)).toBe(0n)
  })

  it('should return the number itself when input is a very large bigint', () => {
    expect(abs(1000000000000000000000n)).toBe(1000000000000000000000n)
  })

  it('should return the absolute value when input is a very small bigint', () => {
    expect(abs(-1000000000000000000000n)).toBe(1000000000000000000000n)
  })

  it('should return the number itself when input is already a positive integer', () => {
    expect(abs(42n)).toBe(42n)
  })

  it('should return the absolute value when input is already a negative integer', () => {
    expect(abs(-42n)).toBe(42n)
  })
})
