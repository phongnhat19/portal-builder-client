import React, {useState} from 'react';
import SettingsWidget from '../components/Settings';
import HTMLModal from './HTMLModal';
import HTML from './renderer';

const HTMLWidget = ({htmlString, width, height, showSettingInit = false, onRemove, onSaveSetting}: {
  htmlString: string;
  width?: string | number;
  height?: string | number;
  showSettingInit?: boolean;
  onRemove?: () => void;
  onSaveSetting?: ({htmlString}: { htmlString: string }) => void;
}) => {

  const [showSetting, setShowSetting] = useState(showSettingInit)

  return (
    <React.Fragment>
      <SettingsWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} />
      <div
        onDrop={(event)=>event.stopPropagation()}
      >
        <HTML
          htmlString={htmlString}
          width={width}
          height={height}
        />
      </div>
      <HTMLModal
        htmlString={htmlString}
        isVisible={showSetting}
        onClose={() => (setShowSetting(false))}
        onSave={(item) => {
          onSaveSetting && onSaveSetting({htmlString: item.htmlString});
          setShowSetting(false);
        }}
      />
    </React.Fragment>
  );
};

export default HTMLWidget;