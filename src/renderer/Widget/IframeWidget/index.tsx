import React, {useState, useContext} from 'react';
import SettingsWidget from '../components/Settings';
import IframeModal from './IframeModal';
import Iframe from './renderer';

const getCSSUnit = (value: any) => {
  return value.replace(/^[\d]+/, '');
};
const getCSSValue = (value: any) => {
  return parseFloat(value);
};

const IframeWidget = ({url, width = '100%', height = '100%', showSettingInit = false, defaultTitle = '', onRemove, onSaveSetting}: {
  url?: string;
  width?: string | number;
  height?: string | number;
  showSettingInit?: boolean;
  onRemove?: () => void;
  defaultTitle: string;
  onSaveSetting?: ({url, width, height, title}: {url: string; width: string | number; height: string | number; title: string}) => void;
}) => {

  const [showSetting, setShowSetting] = useState(showSettingInit);

  return (
    <div style={{width: '100%', overflow: 'hidden'}}>
      <Iframe url={url} width={width} height={height} defaultTitle={defaultTitle} onRemove={onRemove} setShowSetting={setShowSetting} />
      <IframeModal
        defaultTitle={defaultTitle}
        defaultHeightValue={getCSSValue(height)}
        defaultHeightUnit={getCSSUnit(height)}
        defaultWidthValue={getCSSValue(width)}
        defaultWidthUnit={getCSSUnit(width)}
        defaultUrl={url}
        isVisible={showSetting}
        onClose={() => (setShowSetting(false))}
        onSave={(item) => {
          onSaveSetting && onSaveSetting({url: item.url, width: item.width, height: item.height, title: item.title});
          setShowSetting(false);
        }}
      />
    </div>
  );
};

export default IframeWidget;