import React, {useState} from 'react';
import {Modal, Input, Row, Col, Alert} from 'antd';

const PortalConfigNameModal = ({portalName, isVisible = false, onClose, onSave}: {
  portalName: string;
  isVisible: boolean;
  onSave: (item: { name: string }) => void;
  onClose?: () => void;
}) => {

  const [name, setName] = useState(portalName);
  const [emptyName, setEmptyName] = useState(false);

  return (
    <Modal
      title="Portal Setting"
      visible={isVisible}
      okText="Save"
      onCancel={()=>{
        onClose && onClose();
        setEmptyName(false);
        setName(portalName);
      }}
      onOk={() => {
        setEmptyName(false);
        if (!name) {
          setEmptyName(true);
        } else {
          onSave({
            name: name
          });
        }
      }}
    >
      <Row>
        <Col span={4}>
          <strong>Name</strong>
        </Col>
        <Col span={20}>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Input Portal Name"
          />
          {emptyName && <Alert message="Required Field" type="error" />}
        </Col>
      </Row>

    </Modal>
  );
};

export default PortalConfigNameModal;