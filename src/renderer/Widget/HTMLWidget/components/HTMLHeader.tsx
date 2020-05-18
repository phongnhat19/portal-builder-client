import React from 'react';
import {Html5Outlined} from '@ant-design/icons';

import './HTMLHeader.css';

const HTMLHeader = ({
  htmlTitle
}: {
  htmlTitle: string;
}) => {
  return (
    <div className="html-header" >
      <div className="icon">
        <Html5Outlined />
      </div>
      <div className="title">{htmlTitle}</div>
    </div>
  );
};

export default HTMLHeader;
