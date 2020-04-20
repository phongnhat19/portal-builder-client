import React, {useState} from 'react';
import AppSpaceModel from './AppSpaceModel';
import AppSpace from './rerender';
const AppSpaceWidget = ({
  showSettingInit,
  onSaveSetting,
}: {
  showSettingInit?: boolean;
  onSaveSetting: ({listContent, titleWidget}: {listContent: any; titleWidget: string}) => void;
}) => {
  const [showSetting, setShowSetting] = useState(showSettingInit);
  const [listContent, setListContent] = useState<ModalAppSpace[]>([]);

  return (
    <React.Fragment>
      <AppSpaceModel
        showSettingInit={showSettingInit}
        getContent={({listContent, titleWidget}) => { 
          setListContent(listContent)         
          onSaveSetting({listContent, titleWidget})
        }}
      />
      <AppSpace listContent={listContent}/>
    </React.Fragment>
  );
};

export default AppSpaceWidget;
