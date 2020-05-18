import React from 'react';
import IFRAMEHeader from './components/IFRAMEHeader';
import './style.css';
const Iframe = ({
  url,
  width,
  height,
  defaultTitle,
}: {
  url?: string;
  width?: string | number;
  height?: string | number;
  defaultTitle: string;
}) => {
  return (
    <div className="iframe-container">
      <IFRAMEHeader defaultTitle={defaultTitle} />
      <iframe className="iframe" title="iframe" src={url} style={{width, height}} />
    </div>
  );
};

export default Iframe;
