import * as XLSX from 'xlsx'

/**
 * 读取excel文件中的内容返回json数据
 * @param { string } filePath excel文件路径
 * @returns { Promise<Record<string, unknown[]>> } 一个包含所有工作表数据的对象，键为工作表名，值为对应的json化数据
 */
export async function loadExcelData(filePath) {
  try {
    // 使用 fetch 从 public 目录中加载 Excel 文件
    const response = await fetch(filePath + `?t=${ new Date().toString() }`);
    if (!response.ok) {
      throw new Error('文件加载失败');
    }

    // 获取文件的 ArrayBuffer
    const data = await response.arrayBuffer();

    // 使用 xlsx 库解析 Excel 数据
    const workbook = XLSX.read(data, { type: 'array' });

    // 初始化一个空对象来存储每个工作表的数据
    const sheetsData = {};

    // 遍历所有工作表并将其转换为 JSON
    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      sheetsData[sheetName] = XLSX.utils.sheet_to_json(sheet);
    });

    return sheetsData;

  } catch (error) {
    console.error('读取文件时发生错误:', error);
  }
}