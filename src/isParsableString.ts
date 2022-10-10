import { utils } from 'ethers'

/**
 * @param {string} bnString
 * @param {number} dp the decimals
 * @param {boolean} isNonNegativeOnly
 * @returns {boolean} if bnString can be parsed as a BigNumber, has decimals not exceeding dp, and is a non negative value (if isNonNegativeOnly is true).
 */
export const isParsableString = (
  bnString: string,
  dp: number,
  isNonNegativeOnly: boolean,
): boolean => {
  try {
    // check parsable
    const bn = utils.parseUnits(bnString, dp)
    // check if it is negative
    if (isNonNegativeOnly && bn.isNegative()) return false
    // check if bnString dp is less than dp
    const nums = bnString.split('.')
    if (nums.length > 1) {
      const decimalsStr = nums[1]
      return decimalsStr.length <= dp
    }

    return true
  } catch (err) {
    return false
  }
}

export const getParsableString = (
  bnString: string,
  dp: number,
  isNonNegativeOnly: boolean,
): string => {
  const isParsableStringBol = isParsableString(bnString, dp, isNonNegativeOnly)
  let parsableString = '0'
  if (isParsableStringBol) {
    parsableString = bnString
  }
  return parsableString
}

