import React, {CSSProperties, useState, useEffect} from 'react';
import {Modal, Input, Button, Alert} from 'antd';
import {TableOutlined, FileOutlined} from '@ant-design/icons';
import './style.css';
import {LAYOUT_TYPE} from '../../../Layout/constant';
import {CONTENT_TYPE} from '../../../Widget/constant';

const CreateModal = ({isVisible = false, onClose, onCreate}: {
  isVisible: boolean;
  onClose?: () => void;
  onCreate: (item: Portal) => void;
}) => {
  const [portalType, setPortalType] = useState('');
  const [portalName, setPortalName] = useState('');

  useEffect(() => {
    setPortalName('');
  }, [isVisible]);
  const normalIconStyle: CSSProperties = {
    fontSize: '40px'
  };
  const clickIconStyle: CSSProperties = {
    fontSize: '40px',
    color: '#1890ff'
  };
  const [tabIconStyle, setTabIconStyle] = useState(normalIconStyle);
  const [gridIconStyle, setGridIconStyle] = useState(normalIconStyle);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyLayout, setEmptyLayout] = useState(false);

  const onBtnTabClick = () => {
    setTabIconStyle(clickIconStyle);
    setGridIconStyle(normalIconStyle);
    setPortalType(LAYOUT_TYPE.TAB);
  };
  const onBtnGridClick = () => {
    setTabIconStyle(normalIconStyle);
    setGridIconStyle(clickIconStyle);
    setPortalType(LAYOUT_TYPE.GRID);
  };
  return (
    <Modal
      title="New Portal"
      visible={isVisible}
      okText="Create"
      onCancel={onClose}
      onOk={() => {
        let defaultProps = {};

        if (!portalName.trim()) {
          setEmptyName(true);
          return;
        }

        if (!portalType) {
          setEmptyLayout(true);
          return;
        }

        setEmptyLayout(false);
        setEmptyName(false);

        if (portalType === LAYOUT_TYPE.TAB) {
          defaultProps = {
            tabList: [
              {
                tabName: 'Default Portal',
                tabContent: {
                  type: CONTENT_TYPE.DEFAULT,
                  name: 'DefaultPortal'
                }
              }
            ]
          };
        } else if (portalType === LAYOUT_TYPE.GRID) {
          defaultProps = {
            rows: [
              {
                blocks: [{
                  type: CONTENT_TYPE.EMPTY,
                  width: 20
                }],
                align: 'top',
                justify: 'start'
              }
            ]
          };
        }

        onCreate({
          name: portalName,
          layout: {
            type: portalType,
            props: defaultProps
          } as Layout
        });
      }}
    >
      <div className="input-name">
        <span>Name</span>
        <Input
          style={{marginLeft: '50px'}}
          value={portalName}
          onChange={(e) => {
            setPortalName(e.target.value);
          }}
          placeholder="Input portal name"
        />
        {emptyName && <Alert message="Required Field" type="error" />}
      </div>

      <div className="btn-type">
        <div>Choose Portal layout</div>
        <Button key="2" className="btn-tab-type" icon={<FileOutlined style={tabIconStyle} />} type="dashed" onClick={onBtnTabClick} />
        <Button key="3" className="btn-grid-type" icon={<TableOutlined style={gridIconStyle} />} type="dashed" onClick={onBtnGridClick} />
        {emptyLayout && <Alert message="Required Field" type="error" />}
      </div>
    </Modal>
  );
};

export default CreateModal;