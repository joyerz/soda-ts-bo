import * as React from 'react'
import * as moment from 'moment'

import './footer.scss'

const Footer = () => (
  <footer styleName="footer">
    <strong>@Copyright</strong>
    &nbsp;
    {moment().format('YYYY')}
    &nbsp;All Rights Reserved.
  </footer>
)

export default Footer
