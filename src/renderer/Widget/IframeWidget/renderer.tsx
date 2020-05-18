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
    <div className="iframe-container">
      <IFRAMEHeader setShowSetting={setShowSetting} defaultTitle={defaultTitle} onRemove={onRemove} />
      <iframe className="iframe" title="iframe" src={url} style={{width, height}} />
    </div>
  );
};

export default Iframe;
