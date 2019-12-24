import * as React from 'react'
import { Modal } from 'antd'
import { isEqual } from 'lodash'

import { VoidFuncT } from '@src/@types/actions'
import TableList from '@com/TableList'
import { goc } from '@utils/objectHelper'
import './index.scss'

type Props = {
  onCancel?: VoidFuncT,
  data: any,
  displayItems: Array<any>
}

export default class Detail extends React.PureComponent<Props> {
  render() {
    const { onCancel, data, displayItems } = this.props
    const change_before = JSON.parse(data.change_before)
    const change_after = JSON.parse(data.change_after)
    // console.log('before:', change_before)
    // console.log('after:', change_after)
    let tableData = []
    displayItems.forEach((item, index) => {
      let before = goc(change_before, item.key)
      let after = goc(change_after, item.key)
      tableData.push({
        id: index,
        name: item.label,
        before: (!item.render) ? before : (before ? item.render(before, change_before) : '-'),
        after: (!item.render) ? after : (after ? item.render(after, change_after) : '-'),
        isModify: !isEqual(before, after),
      })
      // console.log(item.key, isEqual(before, after), before, after)
    })
    // console.log('^^^^^^^^^tableData:', tableData)

    return (
      <Modal
        title='修改详情'
        visible={true}
        footer={null}
        onCancel={onCancel}
        width={800}
      >
        <TableList
          columns={this.columns()}
          dataSource={tableData}
          showSerialNumber={false}
          pagination={false}
        />
      </Modal>
    )
  }

  columns = () => {
    return ([
      {
        title: '修改项名称',
        dataIndex: 'name',
        width: 'l',
        // render: (text:string) => <strong>{text}</strong>
      },
      {
        title: '修改前',
        dataIndex: 'before',
        width: 'xl',
        render: (text: any) => text || '-',
      },
      {
        title: '修改后',
        dataIndex: 'after',
        width: 'xl',
        render: (text: any, item: any) => {
          text = text || '-'
          return item.isModify
            ? <span styleName="highlight">{text}</span>
            : text
        },
      },
    ])
  }

}

//
//
// function compare(dataA:any, dataB:any) {
//   let temp
//   if (Array.isArray(dataA)) {
//     temp = isArrayEqual(dataA, dataB)
//   } else {
//     if (typeof dataA === 'object') {
//       temp = isObjectEqual(dataA, dataB)
//     } else {
//       temp = dataA === dataB
//     }
//   }
//   return temp
// }
//
// /** 数组是否相等 */
// function isArrayEqual(arryaA:Array<any>, arryaB:Array<any>) {
//   if (!arryaA || !arryaB) return false
//   if (arryaA.length !== arryaB.length) return false // 比较长度
//   for (let i = 0, l = arryaA.length; i < l; i++) {
//     // 检查是否是嵌套数组
//     if (arryaA[i] instanceof Array && arryaB[i] instanceof Array) {
//       // 这里递归判断嵌套数组
//
//       if (!isArrayEqual.call(this, arryaA[i], arryaB[i])) return false
//     } else if (arryaA[i] !== arryaB[i]) {
//       return false
//     }
//   }
//   return true
// }
// /** 对象是否相等 */
// function isObjectEqual(objectA:Object, objectB:Object) {
//   //首先检查对象的类型
//   for (let propName in objectA) {
//     //是否拥有相同的属性
//     if (
//       objectA.hasOwnProperty(propName) !== objectB.hasOwnProperty(propName)
//     ) {
//       return false
//     }
//     //检查实例的类型
//     else if (typeof objectA[propName] !== typeof objectB[propName]) {
//       return false
//     }
//   }
//   //检车对象是否有更深的属性
//   for (let propName in objectB) {
//     //检查对象的原型链属性
//     if (
//       objectA.hasOwnProperty(propName) !== objectB.hasOwnProperty(propName)
//     ) {
//       return false
//     } else if (typeof objectA[propName] !== typeof objectB[propName]) {
//       return false
//     }
//     //如果属性是从原型链继承的
//     if (!objectA.hasOwnProperty(propName)) continue
//
//     if (
//       //如果是数组
//       objectA[propName] instanceof Array &&
//       objectB[propName] instanceof Array
//     ) {
//       // 使用比较数组的方法
//       if (!isArrayEqual.call(this, objectA[propName], objectB[propName]))
//         return false
//     } else if (
//       objectA[propName] instanceof Object &&
//       objectB[propName] instanceof Object
//     ) {
//       if (
//         !isObjectEqual.call(this, objectA[propName], objectB[propName])
//       )
//         return false
//     } else if (objectA[propName] !== objectB[propName]) {
//       //正常比较两个值
//       return false
//     }
//   }
//   return true
// }
