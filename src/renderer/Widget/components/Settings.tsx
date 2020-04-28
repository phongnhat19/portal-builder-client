import React from 'react';
import {Dropdown, Button, Menu} from 'antd';
import {SettingOutlined, DeleteOutlined, FormOutlined} from '@ant-design/icons';

const SettingsWidget = ({onRemove, showSetting, className}: {onRemove?: () => void; 
  showSetting?: () => void; className?: string}) => {
  let _className = '';
  if (className) {
    _className = className;
  }
  const menu = (
    <Menu>
      <Menu.Item key="remove-widget" onClick={onRemove}>
        <DeleteOutlined />
        Remove widget
      </Menu.Item>
      <Menu.Item key="config-widget" onClick={showSetting}>
        <FormOutlined />
        Config widget
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={`portal-tabs-btn portal-tabs-btn-settings ${_className}`}>
      <Dropdown overlay={menu}>
        <Button>
          <SettingOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default SettingsWidget;
