import React, {useState} from 'react';
import HTMLModal from './HTMLModal';
import HTML from './renderer';
import SettingsWidget from '../components/Settings';
import './style.css';

const HTMLWidget = ({
  htmlString,
  width,
  height,
  showSettingInit = false,
  onRemove,
  onSaveSetting,
  htmlTitle,
}: {
  htmlString: string;
  width?: string | number;
  height?: string | number;
  showSettingInit?: boolean;
  onRemove?: () => void;
  onSaveSetting?: ({htmlString}: {htmlString: string; htmlTitle: string}) => void;
  htmlTitle: string;
}) => {
  const [showSetting, setShowSetting] = useState(showSettingInit);
  return (
    <div className="html-widget-index-wrapper">
      <div role="button" tabIndex={0} onDrop={(event) => event.stopPropagation()}>
        <HTML htmlTitle={htmlTitle} htmlString={htmlString} width={width} height={height} />
      </div>
      <SettingsWidget
        className="html-settings-button"
        onRemove={onRemove}
        showSetting={() => {
          setShowSetting && setShowSetting(true);
        }}
      />
      <HTMLModal
        htmlString={htmlString}
        isVisible={showSetting}
        onClose={() => setShowSetting(false)}
        htmlTitle={htmlTitle}
        onSave={(item) => {
          onSaveSetting && onSaveSetting({htmlString: item.htmlString, htmlTitle: item.htmlTitle});
          setShowSetting(false);
        }}
      />
    </div>
  );
};

export default HTMLWidget;
