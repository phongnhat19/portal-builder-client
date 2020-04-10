import React, {useState} from 'react';
import SettingsWidget from '../components/Settings';
import Notify from './renderer';

const GNotifyWidget = ({onRemove}: {
  onRemove?: () => void;
}) => {

  const [showSetting, setShowSetting] = useState(false);
  return (
    <div>
      <SettingsWidget onRemove={onRemove} />
      <Notify
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