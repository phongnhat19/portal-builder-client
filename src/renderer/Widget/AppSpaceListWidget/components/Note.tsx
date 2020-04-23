import React from 'react';
import {Alert} from 'antd';
import {NOTE} from '../constant';
const Note = () => {
  return (
    <div className="widget-app-space-note">
      <Alert message="Warning" description={NOTE} type="warning" showIcon />
    </div>
  );
};
export default Note;
