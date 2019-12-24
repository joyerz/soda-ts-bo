import * as React from 'react'
import Form from 'react-conf-form'
import FilterBox from '@com/FilterBox/index'
import FilterBase from '@com/PageComponents/FilterBase'
import { ActionModifyT } from '@src/@types/actions.d'
import fieldsConf from './filterConf'

type Props = {
  params: {},
  actionList: ActionModifyT,
}

export default class Filter extends FilterBase<Props, {}> {
  static defaultProps = {
    params: {},
  }

  prefix = 'device-detection'

  render() {
    return (
      <FilterBox title="过滤" open>
        <Form
          fields={fieldsConf()}
          dataSource={this.props.params}
          onSubmit={this.onSubmit}
          onReset={this.onReset}
        />
      </FilterBox>
    )
  }
}
