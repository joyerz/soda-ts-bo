import * as React from 'react'

type Props = {
  value: any,
  unit?: string
}

const priceFormat = (price: any) => {
  const p = Number(price)
  return isNaN(p) ? '' : p.toFixed(2)
}

const PriceLabel = (props: Props): any => {
  const { value, unit } = props
  const Price = priceFormat(value)
  const Unit = Price !== '' ? unit : ''
  return (
    <span>
      {Price}
      {Unit}
    </span>
  )
}

PriceLabel.defaultProps = {
  unit: '元'
}

export default PriceLabel
