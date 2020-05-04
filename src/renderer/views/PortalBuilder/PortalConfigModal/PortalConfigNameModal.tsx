import React, { useState } from 'react'
import { Modal, Input, Row, Col } from 'antd'

const PortalConfigNameModal = ({ portalName, isVisible = false, onClose, onSave }: {
  portalName: string
  isVisible: boolean
  onSave: (item: { name: string }) => void
  onClose?: () => void
}) => {
  
  const [name, setName] = useState(portalName)

  return (
    <Modal
      title="Portal Setting"
      visible={isVisible}
      okText="Save"
      onCancel={()=>{
        onClose && onClose();
        setName(portalName);
      }}
      onOk={() => {
        onSave({
          name: name
        })
        setName('');
      }}
    >
      <Row>
        <Col span={4}>
          <strong>Name</strong>
        </Col>
        <Col span={20}>
          <Input
            value={name}
            onChange={(e) => { setName(e.target.value) }}
            placeholder="Input Portal Name"
          />
        </Col>
      </Row>

    </Modal>
  )
}

export default PortalConfigNameModal