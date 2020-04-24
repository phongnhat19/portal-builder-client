import React, {useState, useEffect} from 'react';
import {getAppInfo} from './service';
import './style.css';
// import 'antd/dist/antd.css';
import PreviewTitle from './components/PreviewTitle';
import PreviewContent from './components/PreviewContent';
import Note from './components/Note';

const AppSpace = ({listContent = [], titleWidget = ''}: {listContent: ModalAppSpace[]; titleWidget: string}) => {  
  const [listAppSpace, setListAppSpace] = useState(listContent);
  const [titleAppSpace, setTitleAppSpace] = useState(titleWidget); 
  
  useEffect(() => {       

    (async () => {
      if (window.kintone) {
        let newListContent = await getAppInfo({listAppSpace});
        setTitleAppSpace(titleWidget);
        setListAppSpace(newListContent);
      } else {        
        setTitleAppSpace(titleWidget);
        setListAppSpace(listContent);
      }
    })();
  },[listContent.length && listContent != listAppSpace]);

  if (listAppSpace.length === 0) {
    return null;
  }

  
  return (
    <div className="app-space-widget">
      <PreviewTitle titleWidget={titleAppSpace} />
      {window.kintone ? "" :  <Note />}
      <PreviewContent listContent={listAppSpace} />
    </div>
  );
};
export default AppSpace;
