import * as XLSX from 'xlsx'

/**
 * 读取excel文件中的内容返回json数据
 * @param { string } filePath excel文件路径
 * @param { number } sheetIndex 要读取的工作表的index
 * @returns { Promise<string> } json化的excel数据
 */
export async function loadExcelData(filePath, sheetIndex) {
  try {
    // 使用 fetch 从 public 目录中加载 Excel 文件
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('文件加载失败');
    }

    // 获取文件的 ArrayBuffer
    const data = await response.arrayBuffer();

    // 使用 xlsx 库解析 Excel 数据
    const workbook = XLSX.read(data, { type: 'array' });

    // 获取指定index的工作表的内容
    const sheetName = workbook.SheetNames[sheetIndex];
    const sheet = workbook.Sheets[sheetName];

    // 将工作表内容转换为 JSON
    return XLSX.utils.sheet_to_json(sheet);

  } catch (error) {
    console.error('读取文件时发生错误:', error);
  }
}