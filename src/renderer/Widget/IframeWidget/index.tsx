import React, { useState, useContext } from 'react';
import SettingsIframeWidget from './Settings';
import IframeModal from './IframeModal';
import Iframe from './renderer';

const getCSSUnit = (value: any) => {
  return value.replace(/^[\-\d\.]+/, '')
}
const getCSSValue = (value: any) => {
  return parseFloat(value)
}

const IframeWidget = ({ url, width = '100%', height = '100%', showSettingInit = false, onRemove, onSaveSetting }: {
  url?: string,
  width?: string | number,
  height?: string | number,
  showSettingInit?: boolean
  onRemove?: () => void;
  onSaveSetting?: ({url, width, height}: {url: string, width: string | number, height: string | number}) => void
}) => {

  const [showSetting, setShowSetting] = useState(showSettingInit)

  return (
    <React.Fragment>
      <SettingsIframeWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} />
      <Iframe url={url} width={width} height={height} />
      <IframeModal
        defaultHeightValue={getCSSValue(height)}
        defaultHeightUnit={getCSSUnit(height)}
        defaultWidthValue={getCSSValue(width)}
        defaultWidthUnit={getCSSUnit(width)}
        defaultUrl={url}
        isVisible={showSetting}
        onClose={() => (setShowSetting(false))}
        onSave={(item) => {
          onSaveSetting && onSaveSetting({url: item.url, width: item.width, height: item.height})
          setShowSetting(false)
        }}
      />
    </React.Fragment>
  )
}

export default IframeWidget;