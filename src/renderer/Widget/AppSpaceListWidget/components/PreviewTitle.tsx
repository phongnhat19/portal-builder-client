import React from 'react'
import { AppstoreFilled } from '@ant-design/icons';
const PreviewTitle = ({titleWidget}: {titleWidget: string}) => {
  return (
    <div className="widget-header-preview">
      <div className="widget-header-preview-icon">
        <AppstoreFilled />
      </div>
      <div className="widget-header-preview-title">{titleWidget}</div>
    </div>
  );
};
export default PreviewTitle