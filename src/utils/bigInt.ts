/**
 * Calculates the absolute value of a given bigint.
 *
 * @param {bigint} x - The number to calculate the absolute value of.
 * @returns {bigint} The absolute value of the input number.
 */
export function abs(x: bigint) {
  return x < 0 ? -x : x
}
