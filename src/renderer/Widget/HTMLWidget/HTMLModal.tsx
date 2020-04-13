import React, { useState } from 'react'
import { Modal, Input, Row, Col } from 'antd'

const { TextArea } = Input;

const HTMLModal = ({isVisible = false, onClose, onSave, htmlString}: {
  isVisible: boolean;
  htmlString: string;
  onSave: (item: { htmlString: string }) => void;
  onClose?: () => void;
}) => {
  const [inputHtmlValue, setInputHtmlValue] = useState(htmlString);

  return (
    <Modal
      title="HTML Widget setting"
      visible={isVisible}
      okText="Save"
      onCancel={onClose}
      onOk={() => {
        onSave({htmlString: inputHtmlValue});
      }}
    >
      <Row>
        <Col span={4}>
          <strong>HTML</strong>
        </Col>
        <Col span={20}>
          <TextArea
            rows={6}
            value={inputHtmlValue}
            onChange={(e) => {setInputHtmlValue(e.target.value);}}
            placeholder="Input HTML"
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default HTMLModal