import { commify } from './format'

describe('numberWithCommas', () => {
  it('should return "0" when input is 0', () => {
    expect(commify('0')).toBe('0')
  })

  it('should return the number itself when input is less than or equal to 999', () => {
    expect(commify('99')).toBe('99')
    expect(commify('123')).toBe('123')
    expect(commify('999')).toBe('999')
  })

  it('should add commas for numbers greater than 999', () => {
    expect(commify('1000')).toBe('1,000')
    expect(commify('1234')).toBe('1,234')
    expect(commify('987654321')).toBe('987,654,321')
  })

  it('should not add commas for numbers with decimal places <= 2', () => {
    expect(commify('1234.56')).toBe('1,234.56')
    expect(commify('7890.12')).toBe('7,890.12')
    expect(commify('98765.43')).toBe('98,765.43')
  })

  it('should add commas for numbers with decimal places > 2', () => {
    expect(commify('1234.5678')).toBe('1,234.5678')
    expect(commify('7890.1234')).toBe('7,890.1234')
    expect(commify('98765.4321')).toBe('98,765.4321')
  })

  it('should not add commas for negative numbers', () => {
    expect(commify('-1000')).toBe('-1,000')
    expect(commify('-1234.56')).toBe('-1,234.56')
    expect(commify('-987654321')).toBe('-987,654,321')
  })

  it('should not add commas when input is already a number with commas', () => {
    expect(commify('1,000')).toBe('1,000')
    expect(commify('1,234')).toBe('1,234')
    expect(commify('987,654,321')).toBe('987,654,321')
  })
})
