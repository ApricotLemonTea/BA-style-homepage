/**
 * 数字增加千位分隔符
 * @param num
 * @returns {string}
 */
export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

/**
 * 打开url
 * @param {String} url 要打开的目标地址
 */
export const openUrl = (url) => {
  window.open(url, "_blank")
}