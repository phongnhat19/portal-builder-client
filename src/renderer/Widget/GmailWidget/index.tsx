import React, {useState} from 'react';
import SettingsWidget from '../components/Settings';
import GmailModel from './GmailModal';

import Gmail from './renderer';

const GmailWidget = ({apiKey = '', clientID = '', onRemove, onSaveSetting, showSettingInit = false}: GmailWidgetProps) => {

  const [showSetting, setShowSetting] = useState(showSettingInit);
  return (
    <React.Fragment>
      <SettingsWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} />
      <div role="presentation" className="widget-gmail" onDrop={(event)=>event.stopPropagation()} >
        <Gmail
          apiKey={apiKey}
          clientID={clientID}
          data={[
            {
              threadId: '1',
              from: 'test@gmail.com',
              subject: '10 Downing Street',
              time: '2020-10-24',
              link: 'htpps://test.com'
            },
            {
              threadId: '1',
              from: 'alex@gmail.com',
              subject: '10 Downing Street',
              time: '2020-10-25',
              link: 'htpps://alex.com'
            }
          ]}
        />
      </div>
      <GmailModel
        isVisible={showSetting}
        apiKey={apiKey}
        clientID={clientID}
        onClose={() => {
          setShowSetting(false);
        }}
        onSave={onSaveSetting}
      />
    </React.Fragment>
  );
};

export default GmailWidget;