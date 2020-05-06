import React, {useState, useEffect, useCallback} from 'react';
import {getAppInfo} from './service';
import './style.css';
import PreviewTitle from './components/PreviewTitle';
import PreviewContent from './components/PreviewContent';
import Note from './components/Note';

const AppSpace = ({contentList = [], widgetTitle = ''}: {contentList: ModalAppSpaceContent[]; widgetTitle: string}) => {
  const [listAppSpace, setListAppSpace] = useState(contentList);
  useEffect(() => {
    const isSameCategoryObject = (currentObject: ModalAppSpaceContent, updateObject: ModalAppSpaceContent) => {
      if (currentObject.category !== updateObject.category) {
        return false;
      }
      const categoryListCurrent = currentObject.categoryList;
      const categoryListUpdate = updateObject.categoryList;
      if (categoryListCurrent.length !== categoryListUpdate.length) {
        return false;
      }
      for (let i = 0; i < categoryListCurrent.length; i++) {
        const category = categoryListCurrent[i];
        const isSameCategory = categoryListUpdate.some(
          (categoryUpdate) =>
            categoryUpdate.type === category.type
            && categoryUpdate.name === category.name
            && categoryUpdate.id === category.id
            && categoryUpdate.icon === category.icon
        );
        if (!isSameCategory) {
          return false;
        }
      }
      return true;
    };
    const isSameCategoryValue = (currentObjectList: ModalAppSpaceContent[], updateObjectList: ModalAppSpaceContent[]) => {
      if (currentObjectList.length !== updateObjectList.length) {
        return false;
      }
      for (let i = 0; i < currentObjectList.length; i++) {
        for (let j = 0; j < updateObjectList.length; j++) {
          const isSameObject = isSameCategoryObject(currentObjectList[i], updateObjectList[i]);
          if (!isSameObject) {
            return false;
          }
        }
      }
      return true;
    };
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
    <div className="app-space-widget">
      <PreviewTitle widgetTitle={widgetTitle} />
      {window.kintone ? '' : <Note />}
      <PreviewContent contentList={listAppSpace} />
    </div>
  );
};
export default AppSpace;
