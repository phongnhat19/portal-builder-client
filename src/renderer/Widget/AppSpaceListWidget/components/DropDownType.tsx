import React from 'react';
import {Menu, Dropdown} from 'antd';
import {DownOutlined} from '@ant-design/icons';

const DropDownType = ({value, onChange}: {value: string; onChange: (value: string) => void}) => {
  const handleClick = (e: any) => {
    onChange(e.item.node.textContent.toLowerCase());
  };
  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="0">
        <span>App</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span>Space</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {value.charAt(0).toUpperCase() + value.substring(1)} <DownOutlined />
      </a>
    </Dropdown>
  );
};
export default DropDownType;
