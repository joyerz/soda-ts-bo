import * as React from 'react'
import './index.scss'

type Props = {
  title: string,
  children: any,
}

class Cell extends React.PureComponent<Props> {
  static defaultProps = {
    title: '',
    children: null,
  }

  render() {
    const { title, children } = this.props

    return (
      <div styleName="mobile-fields">
        {title && <div styleName="mobile-fields-label">{title}</div>}
        <div styleName="mobile-fields-content">{children}</div>
      </div>
    )
  }
}

export default Cell
