import React, {useState, useEffect} from 'react';
import SettingsWidget from '../components/Settings';
import GmailModel from './GmailModal';

import Gmail from './renderer';

const GmailWidget = ({apiKey, clientID, onRemove, onSaveSetting, showSettingInit = false}: GmailWidgetProps) => {

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
              key: '1',
              from: 'kimcuc0202@gmail.com',
              subject: '10 Downing Street',
              time: '24/10/2020',
            }
          ]}
        />
      </div>
      <GmailModel
        isVisible={showSetting}
        onClose={() => {
          setShowSetting(false);
        }}
        onSave={()=> {
          console.log(11);
        }}
      />
    </React.Fragment>
  );
};

export default GmailWidget;