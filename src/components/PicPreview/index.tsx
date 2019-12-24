import * as React from 'react'
import { Icon, Spin } from 'antd'

import './index.scss'

const { useState } = React

type Props = {
  showList: boolean,
  current: string,
  url: Array<string> | string,
  style?: Object
}

/**
 * 图片预览
 */
export default function PicPreviewer({ showList = true, url = [], style = {}, current = '' }: Props) {
  let images = []
  if (url) {
    images = typeof url === 'string' ? [url] : url
  }
  images = images.filter(item => item)

  let [visible, setVisible] = useState(false)
  let [src, setSrc] = useState(current)
  let [deg, setDeg] = useState(0)
  let [loading, setLoading] = useState(true)
  let [isInit, setIsInit] = useState(false)

  const handleCancel = () => setVisible(false)
  const handleShow = src => {
    setVisible(true)
    setLoading(true)
    setSrc(src)
  }

  const prev = () => {
    setLoading(true)
    let idx = images.indexOf(src)
    idx -= 1
    idx = idx < 0 ? images.length - 1 : idx
    handleShow(images[idx])
    // setDeg(0)
  }
  const next = () => {
    setLoading(true)
    let idx = images.indexOf(src)
    idx += 1
    idx = idx >= images.length ? 0 : idx
    handleShow(images[idx])
    // setDeg(0)
  }

  const rotation = () => {
    deg += 1
    setDeg(deg)
  }

  const rotationBack = () => {
    deg -= 1
    setDeg(deg)
  }

  const onLoad = () => {
    setLoading(false)
  }

  if (!showList && !isInit) {
    handleShow(current)
    setIsInit(true)
  }

  return (
    <>
      {showList &&
      <div styleName="row">
        {images
          .map((item, idx) => (
            <div
              key={item + '' + idx}
              styleName="box"
              onClick={e => handleShow(item)}
              style={style}
            >
              <img src={item} />
            </div>
          ))}
      </div>
      }

      {visible &&
      <div styleName="viewer">
        <div styleName="spin" className="white-spin"><Spin spinning={loading} tip="loading..." size="large" /></div>
        <div styleName="container" onClick={handleCancel} />
        <div styleName="buttons">
          <div styleName="icon" onClick={handleCancel}>
            <Icon type="close" />
          </div>
          {images.length > 1 &&
          <div styleName="icon" onClick={prev}>
            <Icon type="left" />
          </div>
          }

          {images.length > 1 &&
          <div styleName="icon" onClick={next}>
            <Icon type="right" />
          </div>
          }
          <div styleName="icon" onClick={rotation}>
            <Icon type="redo" />
          </div>
          <div styleName="icon" onClick={rotationBack}>
            <Icon type="undo" />
          </div>
        </div>

          <img
            alt="previmg"
            src={src}
            onLoad={onLoad}
            style={{ transform: `translate(-50%, -50%) rotate(${deg * 90}deg)`, opacity: loading ? 0 : 1 }}
            styleName="img-container"
          />
      </div>
      }
    </>
  )
}
