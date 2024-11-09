/**
 * 数字增加千位分隔符
 * @param num
 * @returns { string }
 */
export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

/**
 * 打开url
 * @param { String } url 要打开的目标地址
 * @param { string } target 打开方式，默认为新建标签页打开
 */
export const openUrl = (url, target = "_blank") => {
  window.open(url, target)
}