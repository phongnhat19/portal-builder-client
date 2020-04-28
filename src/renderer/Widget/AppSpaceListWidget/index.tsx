import React, {useState} from 'react';
import AppSpaceModal from './AppSpaceModal';
import AppSpace from './rerender';
import SettingsWidget from '../components/Settings';
const AppSpaceWidget = ({
  showSettingInit,
  onSaveSetting,
  titleWidget,
  contentList,
  onRemove,
}: {
  titleWidget: string;
  contentList: ModalAppSpaceContent[];
  showSettingInit?: boolean;
  onRemove?: () => void;
  onSaveSetting?: ({contentList, titleWidget}: {contentList: any; titleWidget: string}) => void;
}) => {
  const [showSetting, setShowSetting] = useState(showSettingInit);
  return (
    <React.Fragment>
      <SettingsWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} />
      <AppSpaceModal
        titleWidget={titleWidget}
        contentList={contentList}
        showSettingInit={showSetting}
        getContent={({contentList: newContentList, titleWidget: newTitleWidget}) => {
          const newContentListProps = newContentList.slice();
          onSaveSetting && onSaveSetting({contentList: newContentListProps, titleWidget: newTitleWidget});
        }}
        onCancel={() => {
          setShowSetting(false);
        }}
      />
      <AppSpace contentList={contentList} titleWidget={titleWidget} />
    </React.Fragment>
  );
};

export default AppSpaceWidget;
