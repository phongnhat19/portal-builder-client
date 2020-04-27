import React, {useState} from 'react';
import SettingsWidget from '../components/Settings';
import HTMLModal from './HTMLModal';
import HTML from './renderer';
import {Html5Outlined} from '@ant-design/icons';
import HTMLHeader from './components/HTMLHeader';
import './style.css'

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
  console.log("htmlTitle",htmlTitle);
  
  return (
    <div className="html-wrapper">
      <HTMLHeader htmlTitle={htmlTitle} onRemove={onRemove} setShowSetting={setShowSetting} />
      <div onDrop={(event) => event.stopPropagation()} className="padding-5">
        <HTML htmlTitle={htmlTitle} htmlString={htmlString} width={width} height={height} />
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
