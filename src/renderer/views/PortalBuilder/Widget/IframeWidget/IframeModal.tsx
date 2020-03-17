import React, { useState } from 'react'
import { Modal, Input } from 'antd'
import './style.css'

type IframeModal = {
  isVisible: boolean
  onSave: (item: { url: string }) => void
}

const IframeModal = ({ isVisible = false, onSave }: IframeModal) => {
  const [url, setUrl] = useState('')
  const [isVisibleModal, setVisibleModal] = useState(isVisible)
  return (
    <Modal
      title="Iframe setting"
      visible={isVisibleModal}
      okText="Save"
      onCancel={() => setVisibleModal(false)}
      onOk={() => {
        onSave({
          url: url
        })
        setVisibleModal(false)
      }}
    >
      <div className="input-url">
        <span>URL</span>
        <Input
          style={{ marginLeft: '50px' }}
          value={url}
          onChange={(e) => { setUrl(e.target.value) }}
          placeholder="Input URL"
        />
      </div>
    </Modal>
  )
}

export default IframeModal