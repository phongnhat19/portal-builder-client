import React from 'react';
import {BorderOutlined} from '@ant-design/icons';
const IFRAMEHeader = ({
  defaultTitle,
}: {
  defaultTitle: string;
}) => {

  return (
    <div className="iframe-header">
      <div className="icon size">
        <BorderOutlined />
      </div>
      <div className="title size">{defaultTitle}</div>
    </div>
  );
};

export default IFRAMEHeader;
