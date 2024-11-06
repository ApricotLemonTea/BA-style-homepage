/**
 * 数字增加千位分隔符
 * @param num
 * @returns {string}
 */
export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
