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
 * @param { string } url 要打开的目标地址
 * @param { string } target 打开方式，默认为新建标签页打开
 */
export const openUrl = (url, target = "_blank") => {
  window.open(url, target)
}

/**
 * 将Date转换为yyyy-MM-DD格式的字符串
 * @returns { string }
 */
export const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}