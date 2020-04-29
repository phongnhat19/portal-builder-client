import React, {useState} from 'react';
import {Modal, Input, Row, Col, Select, InputNumber} from 'antd';
import './style.css';
import {Option} from 'rc-select';

const IframeModal = ({
  defaultUrl = '',
  defaultWidthValue = 0,
  defaultWidthUnit = 'px',
  defaultHeightValue = 0,
  defaultHeightUnit = 'px',
  isVisible = false,
  defaultTitle,
  onClose,
  onSave,
}: {
  defaultUrl?: string;
  defaultWidthValue?: number;
  defaultWidthUnit?: string;
  defaultHeightValue?: number;
  defaultHeightUnit?: string;
  defaultTitle: string;
  isVisible: boolean;
  onSave: (item: {url: string; width: string; height: string; title: string}) => void;
  onClose?: () => void;
}) => {
  const [url, setUrl] = useState(defaultUrl);
  const [widthValue, setWidthValue] = useState(defaultWidthValue);
  const [widthUnit, setWidthUnit] = useState(defaultWidthUnit);
  const [heightValue, setHeightValue] = useState(defaultHeightValue);
  const [heightUnit, setHeightUnit] = useState(defaultHeightUnit);
  const [iframeTitle, setIframeTitle] = useState(defaultTitle);

  return (
    <Modal
      title="Iframe setting"
      visible={isVisible}
      okText="Save"
      onCancel={() => {
        setUrl(defaultUrl);
        onClose && onClose();
      }}
      onOk={() => {
        onSave({
          url: url,
          width: `${widthValue}${widthUnit}`,
          height: `${heightValue}${heightUnit}`,
          title: iframeTitle,
        });
      }}
    >
      <Row>
        <Col span={4}>
          <strong>Title</strong>
        </Col>
        <Col span={20}>
          <Input
            value={iframeTitle}
            onChange={(e) => {
              setIframeTitle(e.target.value);
            }}
            placeholder="Input Title"
          />
        </Col>
      </Row>
      <Row className="widget-iframe-row">
        <Col span={4}>
          <strong>URL</strong>
        </Col>
        <Col span={20}>
          <Input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            placeholder="Input URL"
          />
        </Col>
      </Row>
      <Row className="widget-iframe-row">
        <Col span={4}>
          <strong>Width</strong>
        </Col>
        <Col span={20}>
          <Input.Group compact>
            <InputNumber value={widthValue} onChange={(value: any) => setWidthValue(value)} />
            <Select style={{width: '60px'}} defaultValue={widthUnit} onChange={(e) => setWidthUnit(e)}>
              <Option value="px">px</Option>
              <Option value="vw">vw</Option>
              <Option value="%">%</Option>
            </Select>
          </Input.Group>
        </Col>
      </Row>

      <Row className="widget-iframe-row">
        <Col span={4}>
          <strong>Height</strong>
        </Col>
        <Col span={20}>
          <Input.Group compact>
            <InputNumber value={heightValue} onChange={(value: any) => setHeightValue(value)} />
            <Select style={{width: '60px'}} defaultValue={heightUnit} onChange={(e) => setHeightUnit(e)}>
              <Option value="px">px</Option>
              <Option value="vh">vh</Option>
              <Option value="%">%</Option>
            </Select>
          </Input.Group>
        </Col>
      </Row>
    </Modal>
  );
};

export default IframeModal;
