/**
 * Print a number with commas as the thousands separator.
 *
 * @example 1000 => "1,000"
 * @param {number} x The numnber to print
 * @return {string} The number with commas as the thousands separator
 *
 * @link https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
 */
export function commify(x: string) {
  return x.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}
