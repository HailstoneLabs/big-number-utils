/** typescript implementation of DSMath https://github.com/dapphub/ds-math */

import { WAD_DECIMALS } from '../constants'
import { isParsableString } from './isParsableString'
import { formatEther, parseEther } from 'viem'
export const WAD = 10n ** 18n
export const RAY = 10n ** 27n
/**
 * sum of two values (bigint or string)
 * @param  {bigint | string} x bigint must be WAD
 * @param  {bigint | string} y bigint must be WAD
 * @returns {string} sum
 */
export function sum(x: bigint | string, y: bigint | string): string {
  const xWad = typeof x === 'string' ? strToWad(x) : x
  const yWad = typeof y === 'string' ? strToWad(y) : y
  return formatEther(xWad + yWad)
}

/**
 * Check is x - y > or === value?
 * @param x
 * @param y
 * @param value
 */
export function differenceComparesValue(
  x: bigint,
  y: bigint,
  value: bigint,
  operator: 'lt' | 'eq' | 'gt',
): boolean {
  switch (operator) {
    case 'lt':
      return x - y < value
    case 'eq':
      return x - y === value
    case 'gt':
      return x - y > value
    default:
      break
  }
  return false
}

/**
 *
 * @param {bigint} x
 * @param {number} decimal
 * @returns {boolean}
 */
export function lessThanZeroPointZeroOne(x: bigint, decimal: bigint): boolean {
  return x < 10n ** decimal / 100n
}
/**
 *
 * @param {Number}fromDecimal
 * @param {Number}toDecimal
 * @param {bigint}fromAmount
 * @returns {bigint} toAmount in bigint
 */
export function changeDecimal(
  fromDecimal: number,
  toDecimal: number,
  fromAmount: bigint,
): bigint {
  const multiplier = 10n ** BigInt(Math.abs(fromDecimal - toDecimal))
  let toAmount = fromAmount
  if (fromDecimal > toDecimal) {
    toAmount = fromAmount / multiplier
  } else if (fromDecimal < toDecimal) {
    toAmount = fromAmount * multiplier
  }
  return toAmount
}
/**
 * @param {bigint} x in bigint
 * @returns convertion to WAD
 */
export function nativeToWAD(x: bigint, decimal: number): bigint {
  const denominator = 10n ** BigInt(decimal)
  const multiplier = WAD
  return (x * multiplier) / denominator
}

/**
 * @param {bigint} x in bigint
 * @returns convertion to Origin
 */
export function wadToNative(x: bigint, decimal: number): bigint {
  const denominator = WAD
  const multiplier = 10n ** BigInt(decimal)
  return (x * multiplier) / denominator
}

/**
 * @param {bigint} x in bigint Int
 * @returns convertion to WAD
 */
export function bnIntToWAD(x: bigint): bigint {
  return x * WAD
}

/**
 * @param {bigint} x in bigint Int
 * @returns convertion to RAY
 */
export function bnIntToRAY(x: bigint): bigint {
  return x * RAY
}

/**
 * @param {bigint} x in WAD
 * @returns convertion to RAY
 */
export function wadToRay(x: bigint): bigint {
  return (x * RAY) / WAD
}

/**
 * @param {bigint} x in RAY
 * @returns convertion to WAD
 */
export function rayToWad(x: bigint): bigint {
  return (x * WAD) / RAY
}

/**
 * @param {bigint} x in WAD
 * @param {bigint} y in WAD
 * @returns the product of x and y, in WAD
 */
export function wmul(x: bigint, y: bigint): bigint {
  return (x * y + WAD / 2n) / WAD
}

/**
 * @param {bigint} x in WAD
 * @param {bigint} y in WAD
 * @returns the quotient of x divided by y, in WAD
 */
export function wdiv(x: bigint, y: bigint): bigint {
  return (x * WAD + y / 2n) / y
}

/**
 * @param {bigint} x in WAD
 * @param {bigint} y in WAD
 * @returns the quotient of x divided by y, in WAD
 */
export function safeWdiv(x: bigint, y: bigint): bigint {
  if (y === 0n) {
    return 0n
  }
  return wdiv(x, y)
}

/**
 * @param {bigint} x in bigint
 * @param {bigint} y in bigint
 * @returns the quotient of x divided by y, in bigint
 */
export function safeDiv(x: bigint, y: bigint): bigint {
  if (y === 0n) {
    return 0n
  }
  return x / y
}

/**
 * @param {bigint} x in RAY
 * @param {bigint} y in RAY
 * @returns the product of x and y, in RAY
 */
export function rmul(x: bigint, y: bigint): bigint {
  return (x * y + RAY / 2n) / RAY
}

/**
 * @param {bigint} x in RAY
 * @param {bigint} n
 * @returns the exponential of x to the power n, in RAY
 */
export function rpow(x: bigint, n: bigint): bigint {
  let z = n % 2n !== 0n ? x : RAY
  for (n = n / 2n; n !== 0n; n = n / 2n) {
    x = rmul(x, x)

    if (n % 2n !== 0n) {
      z = rmul(z, x)
    }
  }
  return z
}

/**
 * @see https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method
 * @param {bigint} value in bigint Int
 * @returns the square root of x, in bigint Int
 */
export function sqrt(value: bigint) {
  if (value < 0n) {
    throw 'square root of negative numbers is not supported'
  }

  if (value < 2n) {
    return value
  }

  function newtonIteration(n: bigint, x0: bigint) {
    const x1 = (n / x0 + x0) >> 1n
    if (x0 === x1 || x0 === x1 - 1n) {
      return x0
    }
    return newtonIteration(n, x1)
  }

  return newtonIteration(value, 1n)
}

/**
 * @param {bigint} x in WAD
 * @returns the square root of x, in WAD
 */
export function wsqrt(x: bigint): bigint {
  return sqrt(x * WAD)
}

/**
 * Change string to WAD if not undefined, else 0n
 * @param {string | undefined} wadString
 * @returns {bigint}
 */
export const strToWad = (wadString: string | undefined): bigint => {
  if (!wadString) {
    return 0n
  } else {
    if (isParsableString(wadString, WAD_DECIMALS, false)) {
      return parseEther(wadString)
    } else {
      return 0n
    }
  }
}

/**
 * @param {bigint} x in WAD
 * @param {bigint} y in WAD
 * @param {bigint} upperBound the upper bound percentage, in WAD
 * @returns {string} the percentage of x in y, in string. return upperBound if the value exceeds upperBound
 */
export const getPercentageFromTwoWAD = (
  x: bigint,
  y: bigint,
  upperBound?: bigint,
): string => {
  const hasZeroValues = x === 0n || y === 0n
  if (hasZeroValues) {
    return '0.0'
  }

  let result = wdiv(x, y) * 100n
  if (upperBound && result > upperBound) {
    result = upperBound
  }
  return formatEther(result)
}

/**
 *
 * @param {string} x number in string
 * @param {string} y number in string
 * @returns {bigint} the minimum value in WAD
 *
 */
export const getMinValue = (x: string, y: string): bigint => {
  const xWAD = strToWad(x)
  const yWAD = strToWad(y)
  if (xWAD > yWAD) return yWAD
  return xWAD
}
