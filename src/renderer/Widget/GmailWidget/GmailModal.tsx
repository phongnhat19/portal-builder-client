import React, {useState} from 'react';
import {Modal, Input, Row, Col, Alert} from 'antd';
import {ERROR_MESSAGE} from './constant';
import './style.css';

const GmailModal = ({
  isVisible = false,
  apiKey = '',
  clientID = '',
  onClose, onSave
}: {
  apiKey: string;
  clientID: string;
  isVisible: boolean;
  onSave?: (setting: GmailSettings) => void;
  onClose?: () => void;
}) => {

  const [apiKeyInput, setApiKeyInput] = useState(apiKey);
  const [clientIDInput, setClientIDInput] = useState(clientID);
  const [error, setError] = useState({apiKey: '', clientID: ''});

  return (
    <Modal
      title="Gmail setting"
      visible={isVisible}
      okText="Save"
      onCancel={() => {
        setApiKeyInput(apiKey);
        setClientIDInput(clientID);
        setError({apiKey: '', clientID: ''});
        onClose && onClose();
      }}
      onOk={() => {
        let errorMsg = {
          apiKey: '',
          clientID: ''
        };
        if (apiKeyInput.trim() === '' || clientIDInput.trim() === '') {
          const msg = ERROR_MESSAGE.REQUIRED_FIELD;
          errorMsg = {
            apiKey: apiKeyInput.trim() === '' ? msg : '',
            clientID: clientIDInput.trim() === '' ? msg : ''
          };
        } else {
          onSave && onSave({
            apiKey: apiKeyInput,
            clientID: clientIDInput
          });
          onClose && onClose();
        }
        setError(errorMsg);
      }}
    >
      <Row>
        <Col span={4}>
          <strong>API Key</strong>
        </Col>
        <Col span={20}>
          <Input
            value={apiKeyInput}
            onChange={(e) => {
              setApiKeyInput(e.target.value);
            }}
            placeholder="Input API Key"
          />
          {error.apiKey && <Alert style={{marginTop: '5px'}} message={error.apiKey} type="error" />}
        </Col>
      </Row>
      <Row className="widget-iframe-row">
        <Col span={4}>
          <strong>Client ID</strong>
        </Col>
        <Col span={20}>
          <Input
            value={clientIDInput}
            onChange={(e) => {
              setClientIDInput(e.target.value);
            }}
            placeholder="Input Client ID"
          />
          {error.clientID && <Alert message={error.clientID} type="error" />}
        </Col>
      </Row>

    </Modal>
  );
};

export default GmailModal;