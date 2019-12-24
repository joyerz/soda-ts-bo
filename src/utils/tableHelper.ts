/**
 * 计算table的宽度
 * @param columns
 * @return {number}
 */
export const tableWidth = (columns: Array<any>) => {
  let width: number = 0
  columns.forEach(item => {
    width += (item.width || 100)
  })
  return width
}
/**
 * 计算table的columns
 * @param wholeColumns{array}表格配置的默认所有列
 * @param data{array}后端存储的表格列配置
 * @return {array}直接适用于table的columns属性
 */
export const getTableColumns = (wholeColumns: any[], data: any[] = []) => {
  const tableColumns: any[] = []
  let temp: any = {}
  wholeColumns.forEach(item => {
    item.columns.forEach((item2: any) => {
      temp = { ...item2 }
      if (item.columnGroup === 'action' || temp.fixedDisplay) {
        if (item.columnGroup === 'action') {
          // 推入一个空列，防止table 宽度不足而断裂
          tableColumns.push({ title: '', dataIndex: '' })
        }
        tableColumns.push(temp)
      } else {
        const findIndex = data.findIndex(ele => ele.dataIndex === temp.dataIndex)
        if (
          findIndex === -1
          || (findIndex > -1 && data[findIndex].display)
        ) {
          tableColumns.push(temp)
        }
      }
    })
  })
  return tableColumns
}

