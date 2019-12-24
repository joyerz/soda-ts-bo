// import * as React from 'react'

// import { object2labelValue } from '@utils/objectHelper'
// import { ACCOUNT_TYPE } from '@conf/enum'

export default (): any[] => [
  {
    span: 8,
    gutter: 16,
    fields: [
      {
        key: 'name',
        label: '职务名称',
        type: 'input',
        props: {
          rules: ['required'],
          // onChange: (name: string, value: any) => console.log('// onChange', name, value),
        },
      },
      {
        key: 'mobile',
        label: '手机号',
        type: 'input',
        props: {
          rules: ['required', 'mobile'],
          placeholder: '查看',
          maxLength: 11,
          className: 'danger',
          // onChange: (name: string, value: any) => console.log('// onChange', name, value),
        },
      },
      {
        key: 'mobile1',
        label: '手机号',
        type: 'input',
        props: {
          rules: ['required', 'mobile'],
          placeholder: '查看',
          maxLength: 11,
          className: 'danger',
          // onChange: (name: string, value: any) => console.log('// onChange', name, value),
        },
      },
    ],
  },
  {
    type: 'FormButtons',
    align: 'right',
    fields: [
      {
        key: 'reset',
        label: '重置',
        props: {
          type: 'default',
        },
      },
      {
        key: 'submit',
        label: '搜索',
        props: {
          type: 'primary',
          icon: 'search',
        },
      },
    ],
  },
]

//
// export default () => [
//   {
//     gutter: 16,
//     fields: [
//       {
//         key: 'name',
//         label: '职务名称',
//         type: 'input',
//         props: {
//           rules: ['required'],
//           // onChange: (name: string, value: any) => console.log('// onChange', name, value),
//         },
//       },
//       {
//         key: 'mobile',
//         label: '手机号',
//         type: 'input',
//         props: {
//           rules: ['required', 'mobile'],
//           placeholder: '查看',
//           maxLength: 11,
//           className: 'danger',
//           // onChange: (name: string, value: any) => console.log('// onChange', name, value),
//         },
//       },
//       {
//         label: '类型',
//         key: 'cc',
//         type: 'select',
//         display: true,
//         props: {
//           options: object2labelValue(ACCOUNT_TYPE),
//           rules: [],
//         },
//       },
//     ],
//   },
//   {
//     type: 'FormButtons',
//     align: 'right',
//     fields: [
//       {
//         label: '重置',
//         key: 'reset',
//       },
//       {
//         label: '搜索',
//         key: 'submit',
//         type: 'primary',
//       },
//     ],
//   },
// ]
