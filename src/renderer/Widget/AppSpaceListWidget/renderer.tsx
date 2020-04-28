import React, {useState, useEffect} from 'react';
import {getAppInfo} from './service';
import './style.css';
import PreviewTitle from './components/PreviewTitle';
import PreviewContent from './components/PreviewContent';
import Note from './components/Note';

const AppSpace = ({contentList = [], widgetTitle = ''}: {contentList: ModalAppSpaceContent[]; widgetTitle: string}) => {
  const [listAppSpace, setListAppSpace] = useState(contentList);
  const [titleAppSpace, setTitleAppSpace] = useState(widgetTitle);

  useEffect(() => {
    (async () => {
      if (window.kintone) {
        const newContentList = await getAppInfo({listAppSpace});
        setTitleAppSpace(widgetTitle);
        setListAppSpace(newContentList);
      } else {
        setTitleAppSpace(widgetTitle);
        setListAppSpace(contentList);
      }
    })();
  }, [contentList.length && contentList !== listAppSpace]);

  if (listAppSpace.length === 0) {
    return null;
  }


  return (
    <div className="app-space-widget">
      <PreviewTitle widgetTitle={titleAppSpace} />
      {window.kintone ? '' : <Note />}
      <PreviewContent contentList={listAppSpace} />
    </div>
  );
};
export default AppSpace;
