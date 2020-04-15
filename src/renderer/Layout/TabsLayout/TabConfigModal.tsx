import React, {useState, useEffect} from 'react';
import {Modal, Input, Row, Col, Alert} from 'antd';


const TabConfigModal = ({tabName = '', isVisible = false, onClose, onSave}: {
  tabName?: string;
  isVisible: boolean;
  onSave: (name: string) => void;
  onClose?: () => void;
}) => {
  const [name, setName] = useState(tabName);
  const [emptyName, setEmptyName] = useState(false);

  useEffect(() => {
    setName(tabName);
  }, [tabName]);

  return (
    <Modal
      title="Tab setting"
      visible={isVisible}
      okText="Save"
      onCancel={onClose}
      onOk={() => {
        if (!name) {
          setEmptyName(true);
          return;
        }
        setEmptyName(false);
        onSave(name);
      }}
    >
      <Row>
        <Col span={4}>
          <strong>Tab Name</strong>
        </Col>
        <Col span={20}>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value) {
                setEmptyName(false);
                return;
              }
              setEmptyName(true);
            }}
            placeholder="Input Tab Name"
          />
          {emptyName && <Alert message="Required Field" type="error" />}
        </Col>
      </Row>

    </Modal>
  );
};

export default TabConfigModal;