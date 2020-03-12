import React, {useState} from 'react'
import {Modal, Input} from 'antd'
import './style.css'

type IframeModel = {
  isVisible: boolean
  onClose?: () => void
  onSave: (item: {url: string}) => void
}

const IframeModel = ({isVisible= false, onClose, onSave}: IframeModel) => {
    const [url, setUrl] = useState('')

  return(
    <Modal
      title="Iframe setting"
      visible={isVisible}
      okText="Save"
      onCancel={onClose}
      onOk={() => {
        onSave({
              url: url
          })
      }}
    >
        <div className="input-url">
        <span>URL</span>
        <Input
          style={{marginLeft: '50px'}}
          value = {url}
          onChange={(e) => {setUrl(e.target.value)}}
          placeholder="Input URL"
        />
        </div>
    </Modal>
  )
}

export default IframeModel