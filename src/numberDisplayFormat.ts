import { BigNumber, constants, ethers, utils } from 'ethers'
import millify from 'millify'
import { lessThanZeroPointZeroOne, strToWad } from './DSMath'
import { isParsableString } from './isParsableString'
import { WAD_DECIMALS } from '../constants'
/**
Get a string with all zeros. Example: getZerosStr(4) -> '0000'
@param {number} numOfZeros
@returns {string} zeros string

*/
export const getZerosStr = (num: number): string => {
  return Array(num).fill('0').join('')
}

/**
 * Padding zero on numStr
 * @param {string} numStr
 * @param {number} decimalPlace
 * @returns {string} numStr with padding zero
 */
export const fillZeros = (numStr: string, decimalPlace: number): string => {
  const decimalPart = numStr.split('.')[1]
  if (decimalPart) {
    if (decimalPart.length > decimalPlace) {
      return numStr
    }
    const numStrWithFilledZeros =
      numStr + getZerosStr(decimalPlace - decimalPart.length)
    return numStrWithFilledZeros
  }
  return numStr + (decimalPlace > 0 ? `.${getZerosStr(decimalPlace)}` : '')
}

/**
 * If a value is in WAD, it will format the value.
 * @param {string | BigNumber} value a value in string or in WAD
 * @returns {string} a formatted string value
 */
const getStringInput = (value: string | BigNumber): string => {
  if (ethers.BigNumber.isBigNumber(value)) {
    return utils.formatEther(value)
  }
  return isParsableString(value, WAD_DECIMALS, false) ? value : '0'
}

/**
 *
 * @param {string | BigNumber} value require a wad or wad string
 * @returns
 */
const getWad = (value: string | BigNumber): BigNumber => {
  if (ethers.BigNumber.isBigNumber(value)) {
    return value
  }
  return strToWad(value)
}
/**
 * trim off trailing zeros after the decimal point
 * @param {string} x
 * @returns {string}
 */
function trimTrailingZeros(x: string): string {
  let ans = ''
  const array = x.split('.')
  // handle integer
  array[0].split('').map((num) => (ans += num))
  if (array.length === 1) {
    return ans
  }

  // handle decimal
  if (array.length === 2) {
    let decimal = ''
    const reverseDecimal = array[1].split('').reverse()
    for (let i = 0; i < reverseDecimal.length; i++) {
      if (reverseDecimal[i] != '0') {
        decimal = reverseDecimal
          .slice(i, reverseDecimal.length)
          .reverse()
          .join('')
        break
      }
    }
    if (decimal !== '') {
      ans += '.'
    }
    ans += decimal
  }
  return ans
}

/**
 * get significant figures format with trim Trailing Zeros
 * return to exact value to avoid displaying scientific notation
 * @param {string | BigNumber} value a value in string or in WAD
 * @param {number} sf
 * @returns {string} significant figures
 */
function getSfFormat(value: string | BigNumber, sf: number): string {
  const valueStr = getStringInput(value)
  const sfFormat = parseFloat(
    Number.parseFloat(valueStr).toPrecision(sf),
  ).toString()
  // check if sfFormat contain scientific notation (e)
  if (sfFormat.includes('e')) {
    return trimTrailingZeros(valueStr)
  } else {
    return trimTrailingZeros(sfFormat)
  }
}
/**
 * To avoid fractional component exceeds decimals
 * Trim extra decimals if 1.1234567 and decimal is 6 then 1.123456
 * @param {string | BigNumber} value a value in string or in WAD
 * @param {number} decimalPlace number of decimal in integer, the default is 2
 * @param {'down'|'off'} rounding the default is rounding down
 * @returns {string}
 */
function getDpFormat(
  value: string | BigNumber,
  decimalPlace = 2,
  rounding: 'down' | 'off' = 'down',
  shownLessThanZeroPointZeroOne = false,
): string {
  const valueStr = getStringInput(value)
  if (strToWad(valueStr).isZero()) return '0.' + getZerosStr(decimalPlace)
  if (
    shownLessThanZeroPointZeroOne &&
    strToWad(valueStr).lt(strToWad('0.01'))
  ) {
    return '< 0.01'
  }
  // check . exist
  if (valueStr.includes('.')) {
    // it is decimal number
    const [integerStr, decimalNum] = valueStr.split('.')
    if (!decimalNum) return fillZeros(valueStr.replace('.', ''), decimalPlace)
    const digitForComparison = decimalNum[decimalPlace]
    const shouldRoundOff =
      digitForComparison &&
      BigNumber.from(digitForComparison).gte(BigNumber.from(5))
    if (decimalPlace === 0) {
      if (rounding === 'off' && shouldRoundOff) {
        return BigNumber.from(integerStr).add(constants.One).toString()
      } else {
        return integerStr
      }
    }
    const expectedDecimalNum = decimalNum.substring(0, decimalPlace)
    if (rounding === 'off' && shouldRoundOff) {
      const isNegative = integerStr.includes('-')
      const ansWad = strToWad(
        integerStr.replace('-', '') + '.' + expectedDecimalNum,
      )
      const valueAddedForRoundOffWad = strToWad(
        '0.' + getZerosStr(decimalPlace - 1) + '1',
      )
      const ans = utils.formatEther(ansWad.add(valueAddedForRoundOffWad))
      return (isNegative ? '-' : '') + fillZeros(ans, decimalPlace)
    } else {
      return fillZeros(integerStr + '.' + expectedDecimalNum, decimalPlace)
    }
  }
  return fillZeros(valueStr, decimalPlace)
}

/**
 * @param {string | BigNumber} value a value in string or in WAD
 * @returns {string} a millified value with 1 d.p. For example, 12.2M, 1.4K
 */
function getMillifiedFormat(
  value: string | BigNumber,
  shownLessThanZeroPointZeroOne = false,
): string {
  const valueStr = getStringInput(value)
  const islessThanZeroPointZeroOne = lessThanZeroPointZeroOne(
    strToWad(valueStr),
    18,
  )
  if (strToWad(valueStr).eq('0')) return '0'
  if (shownLessThanZeroPointZeroOne && islessThanZeroPointZeroOne) {
    return '< 0.01'
  }
  // a value may be too large to directly convert into Number.
  // so trim it first
  return millify(Number(getDpFormat(getStringInput(value), 1)))
}

/**
 * It always checks whether an actualValue is less than 0.01.
 * @param {string | BigNumber} actualValue a value in string or in WAD
 * @param {number} decimalPlace decimal place, the default is 2
 * @returns {string} readable string, rounded to x decimal places or if the actualValue is less than 0.01, it returns "< 0.01".
 */

function getCommifiedFormat(
  actualValue: BigNumber | string,
  decimalPlace: number | 'exact' = 2,
): string {
  let decimalPlaceInput = 0
  if (typeof decimalPlace == 'number') {
    decimalPlaceInput = decimalPlace
  }
  if (actualValue === '') return '0'
  const actualValueWAD = getWad(actualValue)
  if (actualValueWAD.isZero() && decimalPlace === 0) return '0'
  if (actualValueWAD.isZero()) return '0.00'
  const isLessThanZeroPointZeroOne = lessThanZeroPointZeroOne(
    actualValueWAD.abs(),
    18,
  )
  const displayValue = isLessThanZeroPointZeroOne
    ? '< 0.01'
    : decimalPlace === 'exact'
    ? utils.commify(getStringInput(actualValue))
    : fillZeros(
        utils.commify(getDpFormat(actualValue, decimalPlaceInput)),
        decimalPlaceInput,
      )

  return displayValue
}

/**
 * If actualValue is greater than or equal to 100000 return millified format value,
 * else return commified format value.
 * @param {string | BigNumber} actualValue a value in string or in WAD
 * @param {number} decimalPlace decimal place, the default is 2
 * @returns {string} readable string with millified format or commified format
 */
function getDynamicFormat(
  actualValue: BigNumber | string,
  decimalPlace = 2,
): string {
  const actualValueWAD = getWad(actualValue)
  // if num ≥ 100,000 → millify
  if (actualValueWAD.gte(strToWad('100000'))) {
    return getMillifiedFormat(actualValue)
  } else {
    return getCommifiedFormat(actualValue, decimalPlace)
  }
}

export {
  getDynamicFormat,
  getCommifiedFormat,
  getMillifiedFormat,
  getSfFormat,
  getDpFormat,
  getStringInput,
}
