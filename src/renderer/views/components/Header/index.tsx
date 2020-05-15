import React, {useState} from 'react';
import {SettingOutlined} from '@ant-design/icons';
import './style.css';
import {Button} from 'antd';
import SettingModal from './SettingModal';

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div className="header-container">
      <SettingModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <Button
        type="link"
        icon={<SettingOutlined style={{fontSize: '1.5rem', color: '#FFFFFF'}} />}
        onClick={() => setModalVisible(true)}
      />
    </div>
  );
};

export default Header;