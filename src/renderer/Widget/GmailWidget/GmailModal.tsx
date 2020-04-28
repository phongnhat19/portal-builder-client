import React, {useState} from 'react';
import {Modal, Input, Row, Col, Select, InputNumber} from 'antd';
import './style.css';
import {Option} from 'rc-select';

const GmailModal = ({
  isVisible = false,
  onClose, onSave
}: {
  isVisible: boolean;
  onSave: (item: { url: string; width: string; height: string }) => void;
  onClose?: () => void;
}) => {

  // const [url, setUrl] = useState(defaultUrl);
  // const [widthValue, setWidthValue] = useState(defaultWidthValue);
  // const [widthUnit, setWidthUnit] = useState(defaultWidthUnit);
  // const [heightValue, setHeightValue] = useState(defaultHeightValue);
  // const [heightUnit, setHeightUnit] = useState(defaultHeightUnit);

  return (
    <Modal
      title="Gmail setting"
      visible={isVisible}
      okText="Save"
      onCancel={() => {
        // setUrl(defaultUrl);
        onClose && onClose();
      }}
      onOk={() => {
        onSave({
          // url: url,
          // width: `${widthValue}${widthUnit}`,
          // height: `${heightValue}${heightUnit}`,
        });
      }}
    >
      <Row>
        <Col span={4}>
          <strong>Client ID</strong>
        </Col>
        <Col span={20}>
          <Input
            // value={url}
            onChange={(e) => {
              // setUrl(e.target.value);
            }}
            placeholder="Input URL"
          />
        </Col>
      </Row>
      <Row className="widget-iframe-row">
        <Col span={4}>
          <strong>API key</strong>
        </Col>
        <Col span={20}>
        <Input
            // value={url}
            onChange={(e) => {
              // setUrl(e.target.value);
            }}
            placeholder="Input URL"
          />
        </Col>
      </Row>

    </Modal>
  );
};

export default GmailModal;