import React, {useState} from 'react';
import AppSpaceModel from './AppSpaceModel';
import AppSpace from './rerender';
import SettingsWidget from '../components/Settings';
const AppSpaceWidget = ({
  showSettingInit,
  onSaveSetting,
  titleWidget,
  listContent,
  onRemove,
}: {
  titleWidget: string;
  listContent: ModalAppSpace[];
  showSettingInit?: boolean;
  onRemove?: () => void;
  onSaveSetting?: ({listContent, titleWidget}: {listContent: any; titleWidget: string;}) => void;
}) => {  
  const [showSetting, setShowSetting] = useState(showSettingInit);
  return (
    <React.Fragment>
      <SettingsWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} />
      <AppSpaceModel
      titleWidget={titleWidget}
        listContent={listContent}
        showSettingInit={showSetting}
        getContent={({listContent, titleWidget}) => {
          let newListContent = listContent.slice()
          onSaveSetting && onSaveSetting({listContent:newListContent, titleWidget});
        }}
        onCancel={() => {
          setShowSetting(false);
        }}
      />
      <AppSpace listContent={listContent} titleWidget={titleWidget} />
    </React.Fragment>
  );
};

export default AppSpaceWidget;
