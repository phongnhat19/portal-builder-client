import React from 'react';
import {AppstoreFilled} from '@ant-design/icons';
const PreviewTitle = ({widgetTitle}: {widgetTitle: string}) => {
  return (
    <div className="widget-header-preview">
      <div className="widget-header-preview-icon">
        <AppstoreFilled />
      </div>
      <div className="widget-header-preview-title">{widgetTitle}</div>
    </div>
  );
};
export default PreviewTitle;