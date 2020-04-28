import React from 'react';
import SettingsWidget from '../../components/Settings';
import {BorderOutlined} from '@ant-design/icons';
const IFRAMEHeader = ({
  defaultTitle,
  onRemove,
  setShowSetting,
}: {
  defaultTitle: string;
  onRemove?: () => void;
  setShowSetting?: (status: boolean) => void;
}) => {

  return (
    <div className="iframe-header">
      {!window.kintone &&
      <SettingsWidget
        onRemove={onRemove}
        showSetting={() => setShowSetting && setShowSetting(true)}
        className="center-setting"
      />}
      <div className="icon size">
        <BorderOutlined />
      </div>
      <div className="title size">{defaultTitle}</div>
    </div>
  );
};

export default IFRAMEHeader;
