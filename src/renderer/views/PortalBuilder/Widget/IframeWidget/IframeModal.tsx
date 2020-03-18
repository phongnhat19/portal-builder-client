import React, { useState } from 'react'
import { Modal, Input, Row, Col } from 'antd'
import './style.css'

type IframeModal = {
  isVisible: boolean
  onSave: (item: { url: string }) => void
  onClose?: () => void
}

const IframeModal = ({ isVisible = false, onClose, onSave }: IframeModal) => {
  const [url, setUrl] = useState('')

  return (
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
      <Row>
        <Col span={4}>
          <strong>URL</strong>
        </Col>
        <Col span={20}>
          <Input
            value={url}
            onChange={(e) => { setUrl(e.target.value) }}
            placeholder="Input URL"
          />
        </Col>
      </Row>
      
    </Modal>
  )
}

export default IframeModal