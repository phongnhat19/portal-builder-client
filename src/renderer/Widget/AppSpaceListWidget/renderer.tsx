import React, {useState, useEffect} from 'react';
import {getAppInfo} from './service';
import './style.css';
import PreviewTitle from './components/PreviewTitle';
import PreviewContent from './components/PreviewContent';
import Note from './components/Note';

const AppSpace = ({contentList = [], widgetTitle = ''}: {contentList: ModalAppSpaceContent[]; widgetTitle: string}) => {
  const [listAppSpace, setListAppSpace] = useState(contentList);
  if (window.kintone) {
    getAppInfo({listAppSpace}).then((newContentList) => {
      if (contentList.length && contentList !== listAppSpace) {
        setListAppSpace(newContentList);
      }
    });
  } else if (contentList.length && contentList !== listAppSpace) {
    setListAppSpace(contentList);
  }

  if (listAppSpace.length === 0) {
    return null;
  }

  return (
    <div className="app-space-widget">
      <PreviewTitle widgetTitle={widgetTitle} />
      {window.kintone ? '' : <Note />}
      <PreviewContent contentList={listAppSpace} />
    </div>
  );
};
export default AppSpace;
