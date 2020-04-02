import React, { useState, useContext } from 'react';
import SettingsIframeWidget from './Settings';
import IframeModal from './IframeModal';

const IframeWidget = ({ url, width, height, showSettingInit = false, onRemove, onSaveSetting }: {
  url?: string,
  width?: string | number,
  height?: string | number,
  showSettingInit?: boolean
  onRemove?: () => void;
  onSaveSetting?: ({url}: {url: string}) => void
}) => {

  const [showSetting, setShowSetting] = useState(showSettingInit)

  return (
    <React.Fragment>
      <SettingsIframeWidget onRemove={onRemove} showSetting={()=>setShowSetting(true)} />
      <iframe src={url} style={{width, height}} />
      <IframeModal 
        defaultUrl={url}
        isVisible = {showSetting} 
        onClose={() => (setShowSetting(false) )}
        onSave={(item) => {
          onSaveSetting && onSaveSetting({url: item.url})
          setShowSetting(false)
        }}
      />
    </React.Fragment>
  )
}

export default IframeWidget;