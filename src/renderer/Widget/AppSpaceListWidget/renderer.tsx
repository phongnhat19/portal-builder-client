import React, {useState, useEffect} from 'react';
import {getAppInfo} from './service';
import './style.css';
import PreviewTitle from './components/PreviewTitle';
import PreviewContent from './components/PreviewContent';
import Note from './components/Note';

const AppSpace = ({contentList = [], widgetTitle = ''}: {contentList: ModalAppSpaceContent[]; widgetTitle: string}) => {
  const [listAppSpace, setListAppSpace] = useState(contentList);

  if (contentList.length && contentList !== listAppSpace) {
    if (window.kintone) {
      getAppInfo({listAppSpace}).then((newContentList) => setListAppSpace(newContentList));
    } else {
      setListAppSpace(contentList);
    }
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
