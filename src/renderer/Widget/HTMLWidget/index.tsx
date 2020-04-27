import React, {useState} from 'react';
import SettingsWidget from '../components/Settings';
import HTMLModal from './HTMLModal';
import HTML from './renderer';
import {Html5Outlined} from '@ant-design/icons';

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
    <div className="html-wrapper">
      <div className="html-header">
        <SettingsWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} className="align-vertical right-5" />
        <div className="icon align-vertical">
          <Html5Outlined />
        </div>
        <div className="title align-vertical">{htmlTitle}</div>
      </div>

      <div onDrop={(event) => event.stopPropagation()} className="padding-5">
        <HTML htmlString={htmlString} width={width} height={height} />
      </div>

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
