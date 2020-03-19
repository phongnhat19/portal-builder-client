import React, { useState } from 'react';
import SettingsIframeWidget from '../IframeWidget/Settings';
import HTMLModal from './HTMLModal';


const HTMLWidget = ({ htmlString, width, height, showSettingInit = false, onRemove, onSaveSetting }: {
  htmlString: string,
  width?: string | number,
  height?: string | number,
  showSettingInit?: boolean
  onRemove?: () => void;
  onSaveSetting?: ({ htmlString }: { htmlString: string }) => void

}) => {

  const [showSetting, setShowSetting] = useState(showSettingInit)

  const createMarkupHTMLWidget = (htmlString: string) => {
    return {__html: htmlString};
  }

  return (
    <React.Fragment>
      <SettingsIframeWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} />
      <div style={{width, height}} dangerouslySetInnerHTML={createMarkupHTMLWidget(htmlString)} />;
      <HTMLModal
        isVisible={showSetting}
        onClose={() => (setShowSetting(false))}
        onSave={(item) => {
          onSaveSetting && onSaveSetting({ htmlString: item.htmlString })
          setShowSetting(false)
        }}
      />
    </React.Fragment>
  )
}

export default HTMLWidget;