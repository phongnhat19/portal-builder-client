import React, {useState} from 'react';
import SettingsWidget from '../components/Settings';
import GmailModal from './GmailModal';
import {SAMPLE_DATA} from './constant';

import Gmail from './renderer';

const GmailWidget = ({apiKey = '', clientID = '', onRemove, onSaveSetting, showSettingInit = false}: GmailWidgetProps) => {

  const [showSetting, setShowSetting] = useState(showSettingInit);
  return (
    <div style={{position: 'relative'}}>
      <SettingsWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} className="gmail-setting-button" />
      <div role="presentation" className="widget-gmail" onDrop={(event)=>event.stopPropagation()} >
        <Gmail
          apiKey={apiKey}
          clientID={clientID}
          data={SAMPLE_DATA}
        />
      </div>
      <GmailModal
        isVisible={showSetting}
        apiKey={apiKey}
        clientID={clientID}
        onClose={() => {
          setShowSetting(false);
        }}
        onSave={onSaveSetting}
      />
    </div>
  );
};

export default GmailWidget;