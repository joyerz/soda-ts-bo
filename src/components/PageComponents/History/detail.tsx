import * as React from 'react'
import { Modal } from 'antd'
import { isEqual } from 'lodash'

import { VoidFuncT } from '@src/@types/actions.d'
import TableList from '@com/TableList'
import './detail.scss'

type Props = {
  onCancel: VoidFuncT,
  lineData: any,
  original: any[]
}

export default class Detail extends React.PureComponent<Props> {
  render() {
    const { onCancel, lineData, original } = this.props
    // console.log('before:', JSON.parse(lineData.change_before))
    // console.log('after:', JSON.parse(lineData.change_after))
    const change_before = JSON.parse(lineData.change_before)
    const change_after = JSON.parse(lineData.change_after)
    let tableData = []
    original.forEach((item, index) => {
      let before = getChildValue(change_before, item.key)
      let after = getChildValue(change_after, item.key)
      // console.log('^^^^^^^^before:', before)
      // console.log('^^^^^^^^after:', after)
      tableData.push({
        id: index,
        name: item.label,
        before: (!item.type || item.type === 'input') ? before : item.render(before),
        after: (!item.type || item.type === 'input') ? after : item.render(after),
        // isModify: !compare(before, after)
        isModify: !isEqual(before, after),
      })
    })

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
      },
      {
        title: '修改后',
        dataIndex: 'after',
        width: 'xl',
        render: (text: any, item: any) => (
          item.isModify
            ? <span styleName="highlight">{text}</span>
            : text
        ),
      },
    ])
  }

}

function getChildValue(obj: Object, queryString: string) {
  if (!queryString || typeof queryString !== 'string') return ''

  if (queryString.indexOf('.') === -1) {
    let result = obj[queryString]
    if (result === undefined || result === null) {
      result = ''
    }
    return result
  }
  const arr = queryString.split('.')
  // let obj = this
  for (let i = 0, j = arr.length; i < j; i++) {
    if (arr[i] === '') return ''
    obj = obj[arr[i]]
    if (obj === undefined || obj === null) {
      return ''
    }
  }
  return obj
}

function compare(dataA: any, dataB: any) {
  let temp
  if (Array.isArray(dataA)) {
    temp = isArrayEqual(dataA, dataB)
  } else {
    if (typeof dataA === 'object') {
      temp = isObjectEqual(dataA, dataB)
    } else {
      temp = dataA === dataB
    }
  }
  return temp
}

/** 数组是否相等 */
function isArrayEqual(arryaA: Array<any>, arryaB: Array<any>) {
  if (!arryaA || !arryaB) return false
  if (arryaA.length !== arryaB.length) return false // 比较长度
  for (let i = 0, l = arryaA.length; i < l; i++) {
    // 检查是否是嵌套数组
    if (arryaA[i] instanceof Array && arryaB[i] instanceof Array) {
      // 这里递归判断嵌套数组

      if (!isArrayEqual.call(this, arryaA[i], arryaB[i])) return false
    } else if (arryaA[i] !== arryaB[i]) {
      return false
    }
  }
  return true
}

/** 对象是否相等 */
function isObjectEqual(objectA: Object, objectB: Object) {
  //首先检查对象的类型
  for (let propName in objectA) {
    //是否拥有相同的属性
    if (
      objectA.hasOwnProperty(propName) !== objectB.hasOwnProperty(propName)
    ) {
      return false
    }
    //检查实例的类型
    else if (typeof objectA[propName] !== typeof objectB[propName]) {
      return false
    }
  }
  //检车对象是否有更深的属性
  for (let propName in objectB) {
    //检查对象的原型链属性
    if (
      objectA.hasOwnProperty(propName) !== objectB.hasOwnProperty(propName)
    ) {
      return false
    } else if (typeof objectA[propName] !== typeof objectB[propName]) {
      return false
    }
    //如果属性是从原型链继承的
    if (!objectA.hasOwnProperty(propName)) continue

    if (
      //如果是数组
      objectA[propName] instanceof Array &&
      objectB[propName] instanceof Array
    ) {
      // 使用比较数组的方法
      if (!isArrayEqual.call(this, objectA[propName], objectB[propName]))
        return false
    } else if (
      objectA[propName] instanceof Object &&
      objectB[propName] instanceof Object
    ) {
      if (
        !isObjectEqual.call(this, objectA[propName], objectB[propName])
      )
        return false
    } else if (objectA[propName] !== objectB[propName]) {
      //正常比较两个值
      return false
    }
  }
  return true
}
