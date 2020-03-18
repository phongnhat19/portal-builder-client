import React, { useState } from 'react'
import { Modal, Input, Row, Col } from 'antd'

type TabConfigModal = {
  isVisible: boolean
  onSave: (name: string) => void
  onClose?: () => void
}

const TabConfigModal = ({ isVisible = false, onClose, onSave }: TabConfigModal) => {
  const [name, setName] = useState('')

  return (
    <Modal
      title="Tab setting"
      visible={isVisible}
      okText="Save"
      onCancel={onClose}
      onOk={() => {
        onSave(name)
        setName('')
      }}
    >
      <Row>
        <Col span={4}>
          <strong>Tab Name</strong>
        </Col>
        <Col span={20}>
          <Input
            value={name}
            onChange={(e) => { setName(e.target.value) }}
            placeholder="Input Tab Name"
          />
        </Col>
      </Row>

    </Modal>
  )
}

export default TabConfigModal