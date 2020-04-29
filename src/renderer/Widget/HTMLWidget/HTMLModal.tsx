import React, {useState} from 'react';
import {Modal, Input, Row, Col} from 'antd';
const {TextArea} = Input;

const HTMLModal = ({isVisible = false, onClose, onSave, htmlString, htmlTitle}: {
  isVisible: boolean;
  htmlString: string;
  onSave: (item: { htmlString: string; htmlTitle: string }) => void;
  onClose?: () => void;
  htmlTitle: string;
}) => {
  const [inputHtmlValue, setInputHtmlValue] = useState(htmlString);
  const [inputHtmlTitle, setInputHtmlTitle] = useState(htmlTitle);

  return (
    <Modal
      title="HTML Widget setting"
      visible={isVisible}
      okText="Save"
      onCancel={() => {
        setInputHtmlValue(htmlString);
        setInputHtmlTitle(inputHtmlTitle);
        onClose && onClose();
      }}
      onOk={() => {
        onSave({htmlString: inputHtmlValue, htmlTitle: inputHtmlTitle});
      }}
    >
      <Row className="margin-bottom-20">
        <Col span={4}>
          <strong>Title</strong>
        </Col>
        <Col span={20}>
          <Input placeholder="Widget title" value={inputHtmlTitle} onChange={(e)=> setInputHtmlTitle(e.target.value)} />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <strong>HTML</strong>
        </Col>
        <Col span={20}>
          <TextArea
            rows={6}
            value={inputHtmlValue}
            onChange={(e) => {
              setInputHtmlValue(e.target.value);
            }}
            placeholder="Input HTML"
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default HTMLModal;