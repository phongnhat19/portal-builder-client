import React from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { SettingOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';

const SettingsIframeWidget = ({ onClickMenuWidgetSettings = () => { } }: {
  onClickMenuWidgetSettings?: (event: any) => void;
}) => {
  
  const menu = (
    <Menu onClick={onClickMenuWidgetSettings}>
      <Menu.Item key="remove-widget">
        <DeleteOutlined />
        Remove widget
      </Menu.Item>
      <Menu.Item key="config-widget">
        <FormOutlined />
        Config widget
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='portal-tabs-btn portal-tabs-btn-settings'>
      <Dropdown overlay={menu}>
        <Button>
          <SettingOutlined />
        </Button>
      </Dropdown>
    </div>
  )
}

export default SettingsIframeWidget;