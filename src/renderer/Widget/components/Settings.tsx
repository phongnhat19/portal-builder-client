import React from 'react';
import {Dropdown, Button, Menu} from 'antd';
import {SettingOutlined, DeleteOutlined, FormOutlined} from '@ant-design/icons';

const SettingsWidget = ({onRemove, showSetting}: {
  onRemove?: () => void;
  showSetting?: () => void;
}) => {

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
    <div className="portal-tabs-btn portal-tabs-btn-settings">
      <Dropdown overlay={menu}>
        <Button>
          <SettingOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default SettingsWidget;