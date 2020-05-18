import React, {useState, useEffect, useCallback} from 'react';
import {getAppInfo} from './service';
import './style.css';
import PreviewTitle from './components/PreviewTitle';
import PreviewContent from './components/PreviewContent';
import Note from './components/Note';
import {isSameCategoryValue} from './utils';

const AppSpace = ({contentList = [], widgetTitle = ''}: {contentList: ModalAppSpaceContent[]; widgetTitle: string}) => {
  const [listAppSpace, setListAppSpace] = useState(contentList);
  useEffect(() => {
    if (window.kintone) {
      getAppInfo({listAppSpace: contentList}).then(newListAppSpace => {
        const isArraySame = isSameCategoryValue(listAppSpace, newListAppSpace);
        if (!isArraySame) {
          setListAppSpace(newListAppSpace);
        }
      });
    } else {
      const isArraySame = isSameCategoryValue(listAppSpace, contentList);
      if (!isArraySame) {
        setListAppSpace(contentList);
      }
    }
  }, [listAppSpace, contentList]);

  if (listAppSpace.length === 0) {
    return null;
  }

  return (
    <div className="app-space-widget-container">
      <div className="app-space-widget">
        <PreviewTitle widgetTitle={widgetTitle} />
        {window.kintone ? '' : <Note />}
        <PreviewContent contentList={listAppSpace} />
      </div>
    </div>
  );
};
export default AppSpace;
