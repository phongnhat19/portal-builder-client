import React from 'react';
import IFRAMEHeader from './components/IFRAMEHeader';
import './style.css';
const Iframe = ({
  url,
  width,
  height,
  defaultTitle,
  onRemove,
  setShowSetting,
}: {
  url?: string;
  width?: string | number;
  height?: string | number;
  defaultTitle: string;
  onRemove?: () => void;
  setShowSetting?: (status: boolean) => void;
}) => {
  return (
    <div>
      <IFRAMEHeader setShowSetting={setShowSetting} defaultTitle={defaultTitle} onRemove={onRemove} />
      <iframe className={window.kintone ? "iframe iframe-deploy": "iframe"} title="iframe" src={url} style={{width, height}} />
    </div>
  );
};

export default Iframe;
