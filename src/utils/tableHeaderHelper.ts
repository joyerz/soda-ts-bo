import * as localStore from './localStore'

export function getTableHeader(key: string, tableConfig: any[], alwayRefresh: boolean = false) {
  let tableHeaderConfig = localStore.get(key)
  let tableHeader = tableConfig
  if (
    (tableHeaderConfig && tableHeaderConfig.length === 0) ||
    !tableHeaderConfig ||
    alwayRefresh ||
    localStore.isNewVersion()
  ) {
    saveTableHeader(key, tableHeader)
  }

  // 检查列表不显示问题 暂时打印
  // if ((key === "vehicleTableHeader")) {
  //   console.log(
  //     "监测车辆列表数据未显示：（添加index、display前）",tableHeader
  //   );
  // }

  // 若本地有存储数据，就将tableConfig按照存储数据的顺序排列并修改display和index值
  if (tableHeaderConfig && tableHeaderConfig.length !== 0) {
    let newTableHeader: any[] = []
    tableHeaderConfig.map((item: any, index: number) => {
      tableHeader.map((ele: any, currIndex: number) => {
        if (currIndex === item.index) {
          ele.display = item.display
          ele.index = item.index
          newTableHeader[index] = ele
          // tableHeader[index].display = item.display;
          // tableHeader[index].index = item.index;
        }
      })
    })
    tableHeader = newTableHeader
  }

  // 检查列表不显示问题 暂时打印
  // if ((key === "vehicleTableHeader")) {
  //   console.log(
  //     "监测车辆列表数据未显示：（添加index、display后）", tableHeader
  //   );
  // }

  return tableHeader
}

export function saveTableHeader(key: string, tableHeader: any) {
  if (!tableHeader) return
  let tableHeaderConfig: any[] = []
  tableHeader.map((item: any, index: number) => {
    if (item.index || item.index === 0) {
      tableHeaderConfig.push({ display: item.display, index: item.index })
    }
    else {
      tableHeaderConfig.push({ display: item.display, index })
    }
  })
  // console.log('save ' + key, tableHeaderConfig)
  localStore.save(key, tableHeaderConfig)
}

let tableStyleWidth = 0

/**
 * 计算表格的宽度并且判断是否发生变化来修改CSS
 * @param tableHeader
 * @return {tableWidth: number}
 */
export function calTableWidth(tableHeader: any[]) {
  let tableWidth = 0
  tableHeader.map(item => {
    if (item.display) {
      tableWidth += item.width
    }
  })

  if (tableWidth !== tableStyleWidth) {
    tableStyleWidth = tableWidth
    // addListStyle(tableWidth)
  }
  return tableWidth
}

/**
 * 列表表头拖拽事件 重新排列列表顺序
 * @param {String} key                // tableHeader存储的key
 * @param {Array}  tableHeaderConfig  // 菜单配置
 * @param {number} currIndex          // 当前拖拽对象索引
 * @param {number} targetIndex        // 拖拽对象将要投放目标索引
 * @return {Array} tableHeader
 */
export function dragTableHeader(
  key: string,
  tableHeaderConfig: any[],
  currIndex = -1,
  targetIndex = -1
) {
  let tableHeader = getTableHeader(key, tableHeaderConfig)
  const diff = currIndex - targetIndex // 选中索引与投放索引差值 判断向前、向后移动

  if (currIndex >= 0 && targetIndex >= 0) {
    if (diff >= 0) {
      tableHeader.splice(targetIndex, 0, tableHeader[currIndex])
      tableHeader.splice(currIndex + 1, 1)
    }
    else {
      tableHeader.splice(targetIndex + 1, 0, tableHeader[currIndex])
      tableHeader.splice(currIndex, 1)
    }
    saveTableHeader(key, tableHeader)
    return tableHeader
  }
}

/**
 * 重置菜单顺序
 * @param {String} key              // tableHeader存储的key
 * @param {Array} tableHeaderConfig // 菜单配置
 * @return {Array} tableConfig      // 排序后的菜单
 */
export function resetTableHeader(key: string, tableHeaderConfig: any[]) {
  let tableHeaderConfig_ = localStore.get(key)
  let tableHeader = getTableHeader(key, tableHeaderConfig) // 获取当前菜单配置 display和index值
  // 菜单排序
  tableHeader.sort((a, b) => {
    return a.index - b.index
  })

  saveTableHeader(key, tableHeader)
  return tableHeader
}
