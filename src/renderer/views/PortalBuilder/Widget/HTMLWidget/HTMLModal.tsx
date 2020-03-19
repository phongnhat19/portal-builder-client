import React, { useState } from 'react'
import { Modal, Input, Row, Col } from 'antd'

const { TextArea } = Input;

type HTMLModal = {
  isVisible: boolean
  onSave: (item: { htmlString: string }) => void
  onClose?: () => void
}

const HTMLModal = ({ isVisible = false, onClose, onSave }: HTMLModal) => {
  const [htmlString, setHTMLString] = useState('')

  return (
    <Modal
      title="HTML Widget setting"
      visible={isVisible}
      okText="Save"
      onCancel={onClose}
      onOk={() => {
        onSave({htmlString: htmlString})
      }}
    >
      <Row>
        <Col span={4}>
          <strong>HTML</strong>
        </Col>
        <Col span={20}>
          <TextArea
            rows={6}
            value={htmlString}
            onChange={(e) => { setHTMLString(e.target.value) }}
            placeholder="Input HTML"
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default HTMLModal