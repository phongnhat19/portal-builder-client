import React, {useState} from 'react';
import SettingsWidget from '../components/Settings';
import GNotify from './renderer';

const GNotifyWidget = ({onRemove}: {
  onRemove?: () => void;
}) => {
  return (
    <div style={{width: '100%', position: 'relative'}}>
      <SettingsWidget onRemove={onRemove} className="g-noti-setting-button" />
      <GNotify
        data={[
          {
            url: '',
            title: 'Sample Notification',
            body: 'This is body',
            isRead: false,
            createdAt: '2017-09-26T06:25:18Z',
            creator: {
              name: 'Admin',
              code: 'Admin'
            }
          }
        ]}
      />
    </div>
  );
};

export default GNotifyWidget;