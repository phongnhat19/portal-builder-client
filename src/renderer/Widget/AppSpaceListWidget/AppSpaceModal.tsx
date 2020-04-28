import React, {useState} from 'react';
import {Modal} from 'antd';
import {PlusCircleFilled, MinusCircleFilled} from '@ant-design/icons';
import {InputWithLabel} from './components/InputWithLabel';
import './style.css';
import CategoryDetail from './components/CategoryList';

import {INPUT_TEXT, MODAL, LABEL} from './constant';

const CategoryBlock = ({
  content,
  onChange,
  index,
}: {
  content: ModalAppSpaceContent;
  onChange: (content: ModalAppSpaceContent, status: string) => void;
  index: number;
}) => {
  const newData = {...content};
  const categoryList = newData.categoryList as CategorytAppSpace[];
  return (
    <div className="infor-category" key={index}>
      <div className="input-action">
        <InputWithLabel
          label={LABEL.CATEGORY}
          width="100%"
          value={content.category}
          placeholder={INPUT_TEXT.CATEGORY}
          type="text"
          className=""
          onChange={(value) => {
            const valueString = value as string;
            newData.category = valueString;
            onChange(newData, '');
          }}
        />
        <ActionAddCategory
          onRemove={(status) => {
            onChange(newData, status);
          }}
          index={index}
          onClick={onChange}
        />
      </div>

      <CategoryDetail
        categoryList={categoryList}
        onChangeRow={(newcategoryList) => {
          newData.categoryList = newcategoryList;
          onChange(newData, '');
        }}
      />
    </div>
  );
};

const Category = ({
  contentList,
  setListContent,
}: {
  contentList: ModalAppSpaceContent[];
  setListContent: (contentList: ModalAppSpaceContent[]) => void;
}) => {
  const newContentList = contentList.slice();
  return (
    <div className="category">
      {newContentList.map((content, i) => {
        return (
          <CategoryBlock
            key={i}
            content={content}
            onChange={(newData, status) => {
              const cloneData = JSON.parse(JSON.stringify(newData));
              if (status === 'add') {
                newContentList.splice(i + 1, 0, cloneData);
              } else if (status === 'remove') {
                newContentList.splice(i, 1);
              } else {
                newContentList[i] = cloneData;
              }
              setListContent(newContentList);
            }}
            index={i}
          />
        );
      })}
    </div>
  );
};

const ActionAddCategory = ({
  onClick,
  onRemove,
  index,
}: {
  onClick: (value: ModalAppSpaceContent, status: string) => void;
  onRemove: (status: string) => void;
  index: number;
}) => {
  const handleAddCategory = () => {
    const category: ModalAppSpaceContent = {categoryList: [{type: 'app', id: '', name: '', icon: ''}], category: ''};
    onClick(category, 'add');
  };
  const handleRemoveCategory = () => {
    onRemove('remove');
  };
  return (
    <div className="add-category">
      <PlusCircleFilled onClick={() => handleAddCategory()} />
      {index > 0 && <MinusCircleFilled onClick={() => handleRemoveCategory()} /> }
    </div>
  );
};

const AppSpaceModel = ({
  showSettingInit = false,
  getContent,
  onCancel,
  titleWidget,
  contentList = [{categoryList: [{type: 'app', id: '', name: '', icon: ''}], category: ''}],
}: {
  showSettingInit?: boolean;
  onCancel: () => void;
  contentList: ModalAppSpaceContent[];
  titleWidget: string;
  getContent: ({contentList, titleWidget}: {contentList: ModalAppSpaceContent[]; titleWidget: string}) => void;
}) => {
  const [newContentList, setListContent] = useState<ModalAppSpaceContent[]>(contentList);
  const [newTitleWidget, setTitleWidget] = useState(titleWidget);

  return (
    <Modal
      bodyStyle={{maxHeight: '500px', overflow: 'auto'}}
      onOk={() => {
        getContent({contentList: newContentList, titleWidget: newTitleWidget});
        onCancel();
        console.log('contentList', contentList);

      }}
      title={MODAL.TITLE}
      visible={showSettingInit}
      onCancel={onCancel}
    >
      <InputWithLabel
        label={LABEL.TITLE}
        width="calc(94% - 5px)"
        placeholder={`${INPUT_TEXT.TITLE}`}
        type="text"
        value={newTitleWidget}
        className="item-margin-bottom-10 title"
        onChange={(value) => setTitleWidget(value as string)}
      />
      <Category
        contentList={newContentList}
        setListContent={(categoryList) => {
          const newCategoryList = categoryList.slice();
          setListContent(newCategoryList);
        }}
      />
    </Modal>
  );
};

export default AppSpaceModel;
