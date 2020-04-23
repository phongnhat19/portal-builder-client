import React, {useState, useEffect} from 'react';
import SettingsWidget from '../components/Settings';

import Gmail from './renderer';

const GmailWidget = ({htmlString, width, height, showSettingInit = false, onRemove, onSaveSetting}: {
  htmlString?: string;
  width?: string | number;
  height?: string | number;
  showSettingInit?: boolean;
  onRemove?: () => void;
  onSaveSetting?: ({htmlString}: { htmlString: string }) => void;
}) => {

  const [showSetting, setShowSetting] = useState(showSettingInit);

  return (
    <React.Fragment>
      <SettingsWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} />
      <div role="presentation" className="widget-gmail" onDrop={(event)=>event.stopPropagation()} >
        <Gmail
          htmlString={htmlString}
          width={width}
          height={height}
        />
      </div>
    </React.Fragment>
  );
};

export default GmailWidget;