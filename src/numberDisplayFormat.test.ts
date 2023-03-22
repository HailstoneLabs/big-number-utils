import { strToWad } from './DSMath'
import {
  fillZeros,
  getCommifiedFormat,
  getDpFormat,
  getDynamicFormat,
  getMillifiedFormat,
  getSfFormat,
  getZerosStr,
} from './numberDisplayFormat'

describe('getZerosStr', () => {
  test('2 => 00', () => {
    expect(getZerosStr(2)).toBe('00')
  })
  test('0 => empty string', () => {
    expect(getZerosStr(0)).toBe('')
  })
})

describe('fillZeros', () => {
  test('2.001,2 => 2.001', () => {
    expect(fillZeros('2.001', 2)).toBe('2.001')
  })
  test('2,2 => 2.00', () => {
    expect(fillZeros('2', 2)).toBe('2.00')
  })
  test('2.12,2 => 2.12', () => {
    expect(fillZeros('2.12', 2)).toBe('2.12')
  })
  test('2.12,4 => 2.1200', () => {
    expect(fillZeros('2.12', 4)).toBe('2.1200')
  })
  test('0.12,4 => 0.1200', () => {
    expect(fillZeros('0.12', 4)).toBe('0.1200')
  })
})

describe('getDynamicFormat', () => {
  test('BN (> 100000) 120000 -> (millify) 120k', () => {
    expect(getDynamicFormat(strToWad('120000'))).toBe('120K')
  })
  test('BN (>= 100000) 100000 -> (millify) 100k', () => {
    expect(getDynamicFormat(strToWad('100000'))).toBe('100K')
  })
  test('BN (< 100000) 10000 -> (commify) 1,0000.00', () => {
    expect(getDynamicFormat(strToWad('10000'))).toBe('10,000.00')
  })
  test('BN (< 100000) 1000.123 -> (commify) 1,0000.12', () => {
    expect(getDynamicFormat(strToWad('1000.123'))).toBe('1,000.12')
  })
  test('String (> 100000) 120000 -> (millify) 120k', () => {
    expect(getDynamicFormat('120000')).toBe('120K')
  })
  test('String (>= 100000) 100000 -> (millify) 100k', () => {
    expect(getDynamicFormat('100000')).toBe('100K')
  })
  test('String (< 100000) 10000 -> (commify) 10,000.00', () => {
    expect(getDynamicFormat('10000')).toBe('10,000.00')
  })
  test('String (< 100000) 1000.123 -> (commify) 1,0000.12', () => {
    expect(getDynamicFormat('1000.123')).toBe('1,000.12')
  })
})
describe('getDpFormat(round off)', () => {
  test('-1.1234567,6 -> -1.123457', () => {
    expect(getDpFormat('-1.1234567', 6, 'off')).toBe('-1.123457')
  })
  test('1.1234567,6 -> 1.123457', () => {
    expect(getDpFormat('1.1234567', 6, 'off')).toBe('1.123457')
  })
  test('0.1123,6 -> 0.112300', () => {
    expect(getDpFormat('0.1123', 6, 'off')).toBe('0.112300')
  })
  test('0.1123,4 -> 0.1123', () => {
    expect(getDpFormat('0.1123', 4, 'off')).toBe('0.1123')
  })

  test('0,6 -> 0.000000', () => {
    expect(getDpFormat('0', 6, 'off')).toBe('0.000000')
  })

  test('49.999,2 -> 50.00', () => {
    expect(getDpFormat('49.999', 2, 'off')).toBe('50.00')
  })

  test('49.9,0 -> 50', () => {
    expect(getDpFormat('49.999', 0, 'off')).toBe('50')
  })

  test('0.123456789123456789,17 -> 0.12345678912345679', () => {
    expect(getDpFormat('0.123456789123456789', 17, 'off')).toBe(
      '0.12345678912345679',
    )
  })

  test('1000.15,0 -> 1000', () => {
    expect(getDpFormat('1000.15', 0, 'off')).toBe('1000')
  })

  test('abc,2 -> 0.00', () => {
    expect(getDpFormat('abc', 2, 'off')).toBe('0.00')
  })
})
describe('getDpFormat', () => {
  test('0.01,2 -> 0.01', () => {
    expect(getDpFormat('0.01', 2, 'down', true)).toBe('0.01')
  })
  test('0.001,2 -> 0.001', () => {
    expect(getDpFormat('0.001', 2, 'down', true)).toBe('< 0.01')
  })

  test('0 -> 0.00', () => {
    expect(getDpFormat('0', 2, 'down', true)).toBe('0.00')
  })

  test('0 -> 0.00000', () => {
    expect(getDpFormat('0', 5, 'down', true)).toBe('0.00000')
  })

  test('-1.1234567,6 -> -1.123456', () => {
    expect(getDpFormat('-1.1234567', 6)).toBe('-1.123456')
  })
  test('1.1234567,6 -> 1.123456', () => {
    expect(getDpFormat('1.1234567', 6)).toBe('1.123456')
  })
  test('0.1123,6 -> 0.112300', () => {
    expect(getDpFormat('0.1123', 6)).toBe('0.112300')
  })
  test('0.1123,4 -> 0.1123', () => {
    expect(getDpFormat('0.1123', 4)).toBe('0.1123')
  })
  test('1,6 -> 0.000000', () => {
    expect(getDpFormat('1', 6)).toBe('1.000000')
  })
  test('0,6 -> 0.000000', () => {
    expect(getDpFormat('0', 6)).toBe('0.000000')
  })
  test('0.123456789123456789123,18 -> 0.123456789123456789', () => {
    expect(getDpFormat('0.123456789123456789', 18)).toBe('0.123456789123456789')
  })

  test('1000.15,0 -> 1000', () => {
    expect(getDpFormat('1000.15', 0)).toBe('1000')
  })

  test('abc,2 -> 0.00', () => {
    expect(getDpFormat('abc')).toBe('0.00')
  })

  test('12. -> 12.00', () => {
    expect(getDpFormat('12.')).toBe('12.00')
  })

  test('12. -> 12.0000', () => {
    expect(getDpFormat('12.', 4)).toBe('12.0000')
  })
})

describe('getSfFormat', () => {
  test('x: 1.0000 sf:5 -> 1', () => {
    expect(getSfFormat('1.0000', 1)).toBe('1')
  })
  test('x: 0.01000 sf:2 -> 0.01', () => {
    expect(getSfFormat('0.01000', 2)).toBe('0.01')
  })
  test('x: 12.001123231 sf:2 -> 12', () => {
    expect(getSfFormat('12.001123231', 2)).toBe('12')
  })
  test('x: 12.001123231 sf:3 -> 12', () => {
    expect(getSfFormat('12.001123231', 3)).toBe('12')
  })
  test('x: 12001123.231 sf:2 -> 12000000', () => {
    expect(getSfFormat('12001123.231', 2)).toBe('12000000')
  })
  test('x: 12001123.231 sf:2 -> 12000000', () => {
    expect(getSfFormat('12001123.231', 6)).toBe('12001100')
  })
  test('it should avoid scientific notation with x: 0.00000000000000002', () => {
    expect(getSfFormat('0.00000000000000002', 6)).toBe('0.00000000000000002')
  })

  test('x: "" sf:2 -> 0', () => {
    expect(getSfFormat('', 6)).toBe('0')
  })
  test('abc,2 -> 0', () => {
    expect(getSfFormat('abc', 2)).toBe('0')
  })
})

describe('getMillifiedFormat', () => {
  it('returns 1.1M when passing a string of 1120121', () => {
    expect(getMillifiedFormat('1120121')).toBe('1.1M')
  })

  it('returns 1.1M when passing a WAD of 1120121', () => {
    expect(getMillifiedFormat(strToWad('1120121'))).toBe('1.1M')
  })

  it('returns 0 when passing an empty string', () => {
    expect(getMillifiedFormat('')).toBe('0')
  })

  it('returns 0 when passing a non-number string', () => {
    expect(getMillifiedFormat('abc')).toBe('0')
  })

  it('returns < 0.01 when passing 0.00001 and shownLessThanZeroPointZeroOne is true', () => {
    expect(getMillifiedFormat('0.00001', true)).toBe('< 0.01')
  })

  it('returns 0 when passing 0 and shownLessThanZeroPointZeroOne is false', () => {
    expect(getMillifiedFormat('0', false)).toBe('0')
  })
})

describe('getCommifiedFormat', () => {
  it('returns 1,120,121 when passing a string of 1120121', () => {
    expect(getCommifiedFormat('1120121', 0)).toBe('1,120,121')
  })

  it('returns 1,120,121 when passing a WAD of 1120121', () => {
    expect(getCommifiedFormat(strToWad('1120121'), 0)).toBe('1,120,121')
  })

  it('returns 0 when passing an empty string', () => {
    expect(getCommifiedFormat('', 0)).toBe('0')
  })

  it('returns 1,120,121.56 when passing a string of 1120121.5687 and a decimal place of 2', () => {
    expect(getCommifiedFormat('1120121.5687')).toBe('1,120,121.56')
  })

  it('returns 1,120,121.568 when passing a string of 1120121.5687 and a decimal place of 3', () => {
    expect(getCommifiedFormat('1120121.5687', 3)).toBe('1,120,121.568')
  })

  it('returns 0.00 when passing a non-number string', () => {
    expect(getCommifiedFormat('abc')).toBe('0.00')
  })

  it('returns 1,120,121.568234233234 when passing a string of 1120121.568234233234 and showExact is true', () => {
    expect(getCommifiedFormat('1120121.568234233234', 2, true)).toBe(
      '1,120,121.568234233234',
    )
  })

  it('returns < 0.01 when passing a string of 0.000001', () => {
    expect(getCommifiedFormat('0.000001', 0)).toBe('< 0.01')
  })

  it('returns 1,120,121.568700 when passing a string of 1120121.5687', () => {
    expect(getCommifiedFormat('1120121.5687', 6)).toBe('1,120,121.568700')
  })
})
