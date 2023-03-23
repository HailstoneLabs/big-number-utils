/** typescript implementation of DSMath https://github.com/dapphub/ds-math */

import { BigNumber, constants, utils } from 'ethers'
import { WAD_DECIMALS } from '../constants'
import { isParsableString } from './isParsableString'

export const WAD = BigNumber.from(10).pow(18)
export const RAY = BigNumber.from(10).pow(27)
/**
 * sum of two values (BigNumber or string)
 * @param  {BigNumber | string} x BigNumber must be WAD
 * @param  {BigNumber | string} y BigNumber must be WAD
 * @returns {string} sum
 */
export function sum(x: BigNumber | string, y: BigNumber | string): string {
  const xWad = typeof x === 'string' ? strToWad(x) : x
  const yWad = typeof y === 'string' ? strToWad(y) : y
  return utils.formatEther(xWad.add(yWad))
}

/**
 * Check is x - y > or === value?
 * @param x
 * @param y
 * @param value
 */
export function differenceComparesValue(
  x: BigNumber,
  y: BigNumber,
  value: BigNumber,
  operator: 'lt' | 'eq' | 'gt',
): boolean {
  return x.sub(y)[operator](value)
}

/**
 *
 * @param {BigNumber} x
 * @param {number} decimal
 * @returns {boolean}
 */
export function lessThanZeroPointZeroOne(
  x: BigNumber,
  decimal: number,
): boolean {
  return x.lt(BigNumber.from(10).pow(decimal).div(100))
}
/**
 *
 * @param {Number}fromDecimal
 * @param {Number}toDecimal
 * @param {BigNumber}fromAmount
 * @returns {BigNumber} toAmount in BigNumber
 */
export function changeDecimal(
  fromDecimal: number,
  toDecimal: number,
  fromAmount: BigNumber,
): BigNumber {
  const multiplier = BigNumber.from(10).pow(Math.abs(fromDecimal - toDecimal))
  let toAmount = fromAmount
  if (fromDecimal > toDecimal) {
    toAmount = fromAmount.div(multiplier)
  } else if (fromDecimal < toDecimal) {
    toAmount = fromAmount.mul(multiplier)
  }
  return toAmount
}
/**
 * @param {BigNumber} x in BigNumber
 * @returns convertion to WAD
 */
export function nativeToWAD(x: BigNumber, decimal: number): BigNumber {
  const denominator = BigNumber.from(10).pow(decimal)
  const multiplier = WAD
  return x.mul(multiplier).div(denominator)
}

/**
 * @param {BigNumber} x in BigNumber
 * @returns convertion to Origin
 */
export function wadToNative(x: BigNumber, decimal: number): BigNumber {
  const denominator = WAD
  const multiplier = BigNumber.from(10).pow(decimal)
  return x.mul(multiplier).div(denominator)
}

/**
 * @param {BigNumber} x in BigNumber Int
 * @returns convertion to WAD
 */
export function bnIntToWAD(x: BigNumber): BigNumber {
  return x.mul(WAD)
}

/**
 * @param {BigNumber} x in BigNumber Int
 * @returns convertion to RAY
 */
export function bnIntToRAY(x: BigNumber): BigNumber {
  return x.mul(RAY)
}

/**
 * @param {BigNumber} x in WAD
 * @returns convertion to RAY
 */
export function wadToRay(x: BigNumber): BigNumber {
  return x.mul(RAY).div(WAD)
}

/**
 * @param {BigNumber} x in RAY
 * @returns convertion to WAD
 */
export function rayToWad(x: BigNumber): BigNumber {
  return x.mul(WAD).div(RAY)
}

/**
 * @param {BigNumber} x in WAD
 * @param {BigNumber} y in WAD
 * @returns the product of x and y, in WAD
 */
export function wmul(x: BigNumber, y: BigNumber): BigNumber {
  return x.mul(y).add(WAD.div(2)).div(WAD)
}

/**
 * @param {BigNumber} x in WAD
 * @param {BigNumber} y in WAD
 * @returns the quotient of x divided by y, in WAD
 */
export function wdiv(x: BigNumber, y: BigNumber): BigNumber {
  return x.mul(WAD).add(y.div(2)).div(y)
}

/**
 * @param {BigNumber} x in WAD
 * @param {BigNumber} y in WAD
 * @returns the quotient of x divided by y, in WAD
 */
export function safeWdiv(x: BigNumber, y: BigNumber): BigNumber {
  if (y.eq(constants.Zero)) {
    return constants.Zero
  }
  return x.mul(WAD).add(y.div(2)).div(y)
}

/**
 * @param {BigNumber} x in BigNumber
 * @param {BigNumber} y in BigNumber
 * @returns the quotient of x divided by y, in BigNumber
 */
export function safeDiv(x: BigNumber, y: BigNumber): BigNumber {
  if (y.eq(constants.Zero)) {
    return constants.Zero
  }
  return x.div(y)
}

/**
 * @param {BigNumber} x in RAY
 * @param {BigNumber} y in RAY
 * @returns the product of x and y, in RAY
 */
export function rmul(x: BigNumber, y: BigNumber): BigNumber {
  return x.mul(y).add(RAY.div(2)).div(RAY)
}

/**
 * @param {BigNumber} x in RAY
 * @param {BigNumber} n
 * @returns the exponential of x to the power n, in RAY
 */
export function rpow(x: BigNumber, n: BigNumber): BigNumber {
  let z = !n.mod(2).eq(0) ? x : RAY

  for (n = n.div(2); !n.eq(0); n = n.div(2)) {
    x = rmul(x, x)

    if (!n.mod(2).eq(0)) {
      z = rmul(z, x)
    }
  }
  return z
}

/**
 * @see https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method
 * @param {BigNumber} x in BigNumber Int
 * @returns the square root of x, in BigNumber Int
 */
export function sqrt(x: BigNumber): BigNumber {
  const ONE = BigNumber.from(1)
  const TWO = BigNumber.from(2)
  const x0 = BigNumber.from(x)
  let b = x0.add(ONE).div(TWO)
  let a = x0
  while (b.sub(a).isNegative()) {
    a = b
    b = x0.div(b).add(b).div(TWO)
  }
  return a
}

/**
 * @param {BigNumber} x in WAD
 * @returns the square root of x, in WAD
 */
export function wsqrt(x: BigNumber): BigNumber {
  return sqrt(x.mul(WAD))
}

/**
 * Change string to WAD if not undefined, else constants.Zero
 * @param {string | undefined} wadString
 * @returns {BigNumber}
 */
export const strToWad = (wadString: string | undefined): BigNumber => {
  if (!wadString) {
    return constants.Zero
  } else {
    if (isParsableString(wadString, WAD_DECIMALS, false)) {
      return utils.parseEther(wadString)
    } else {
      return constants.Zero
    }
  }
}

/**
 * @param {BigNumber} x in WAD
 * @param {BigNumber} y in WAD
 * @param {BigNumber} upperBound the upper bound percentage, in WAD
 * @returns {string} the percentage of x in y, in string. return upperBound if the value exceeds upperBound
 */
export const getPercentageFromTwoWAD = (
  x: BigNumber,
  y: BigNumber,
  upperBound?: BigNumber,
): string => {
  const hasZeroValues = x.isZero() || y.isZero()
  if (hasZeroValues) {
    return '0.0'
  }

  let result = wdiv(x, y).mul(BigNumber.from('100'))
  if (upperBound && result.gt(upperBound)) {
    result = upperBound
  }
  return utils.formatEther(result)
}

/**
 *
 * @param {string} x number in string
 * @param {string} y number in string
 * @returns {BigNumber} the minimum value in WAD
 *
 */
export const getMinValue = (x: string, y: string): BigNumber => {
  const xWAD = strToWad(x)
  const yWAD = strToWad(y)
  if (xWAD.gt(yWAD)) return yWAD
  return xWAD
}
