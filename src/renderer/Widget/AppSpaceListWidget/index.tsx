import React, {useState} from 'react';
import AppSpaceModal from './AppSpaceModal';
import AppSpace from './renderer';
import SettingsWidget from '../components/Settings';
const AppSpaceWidget = ({
  showSettingInit,
  onSaveSetting,
  widgetTitle,
  contentList,
  onRemove,
}: {
  widgetTitle: string;
  contentList: ModalAppSpaceContent[];
  showSettingInit?: boolean;
  onRemove?: () => void;
  onSaveSetting?: ({contentList, widgetTitle}: {contentList: any; widgetTitle: string}) => void;
}) => {
  const [showSetting, setShowSetting] = useState(showSettingInit);
  return (
    <div style={{position: 'relative'}}>
      <SettingsWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} className="app-space-setting-button" />
      <AppSpaceModal
        widgetTitle={widgetTitle}
        contentList={contentList}
        showSettingInit={showSetting}
        getContent={({contentList: newContentList, widgetTitle: newTitleWidget}) => {
          const newContentListProps = newContentList.slice();
          onSaveSetting && onSaveSetting({contentList: newContentListProps, widgetTitle: newTitleWidget});
        }}
        onCancel={() => {
          setShowSetting(false);
        }}
      />
      <AppSpace contentList={contentList} widgetTitle={widgetTitle} />
    </div>
  );
};

export default AppSpaceWidget;
