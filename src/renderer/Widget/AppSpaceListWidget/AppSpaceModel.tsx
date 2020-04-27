import React, {useState} from 'react';
import {Modal} from 'antd';
import {PlusCircleFilled, MinusCircleFilled} from '@ant-design/icons';
import {InputText} from './components/InputWidget';
import './style.css';
import RenderCategoryDetail from './components/CategoryList';

import {INPUT_TEXT, MODAL, LABEL} from './constant';

const RenderBlockCategory = ({
  content,
  onChange,
  i,
}: {
  content: ModalAppSpace;
  onChange: (content: ModalAppSpace, status: string) => void;
  i: number;
}) => {
  let newData = {...content};
  let listCategory = newData.listCategory as CategorytAppSpace[];
  return (
    <div className="infor-category" key={i}>
      <div className="input-action">
        <InputText
          label={LABEL.CATEGORY}
          width={'100%'}
          value={content.category}
          placeholder={INPUT_TEXT.CATEGORY}
          type={'text'}
          className={''}
          onChange={(value) => {
            let valueString = value as string;
            newData.category = valueString;
            onChange(newData, '');
          }}
        />
        <RenderActionAddCategory
          onRemove={(status) => {
            onChange(newData, status);
          }}
          i={i}
          onClick={(value, status) => {
            onChange(value, status);
          }}
        />
      </div>

      <RenderCategoryDetail
        listCategory={listCategory}
        onChangeRow={(newListCategory) => {
          newData.listCategory = newListCategory;
          onChange(newData, '');
        }}
      />
    </div>
  );
};

const RenderCategory = ({
  listContent,
  setListContent,
}: {
  listContent: ModalAppSpace[];
  setListContent: (listContent: ModalAppSpace[]) => void;
}) => {
  let newListContent = listContent.slice();
  return (
    <div className="category">
      {newListContent.map((content, i) => {
        return (
          <React.Fragment key={i}>
            <RenderBlockCategory
              content={content}
              onChange={(newData, status) => {
                let cloneData = JSON.parse(JSON.stringify(newData));
                if (status === 'add') {
                  newListContent.splice(i + 1, 0, cloneData);
                } else if (status === 'remove') {
                  newListContent.splice(i, 1);
                } else {
                  newListContent[i] = cloneData;
                }
                setListContent(newListContent);
              }}
              i={i}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

const RenderActionAddCategory = ({
  onClick,
  onRemove,
  i,
}: {
  onClick: (value: ModalAppSpace, status: string) => void;
  onRemove: (status: string) => void;
  i: number;
}) => {
  const handleAddCategory = () => {
    let category: ModalAppSpace = {listCategory: [{type: 'app', id: '', name: '', icon: ''}], category: ''};
    onClick(category, 'add');
  };
  const handleRemoveCategory = () => {
    onRemove('remove');
  };
  return (
    <div className="add-category">
      <PlusCircleFilled onClick={() => handleAddCategory()} />
      {i > 0 ? <MinusCircleFilled onClick={() => handleRemoveCategory()} /> : ''}
    </div>
  );
};

const AppSpaceModel = ({
  showSettingInit = false,
  getContent,
  onCancel,
  titleWidget,
  listContent = [{listCategory: [{type: 'app', id: '', name: '', icon: ''}], category: ''}],
}: {
  showSettingInit?: boolean;
  onCancel: () => void;
  listContent: ModalAppSpace[];
  titleWidget: string;
  getContent: ({listContent, titleWidget}: {listContent: ModalAppSpace[]; titleWidget: string;}) => void;
}) => {
  const [newListContent, setListContent] = useState<ModalAppSpace[]>(listContent);
  const [newTitleWidget, setTitleWidget] = useState(titleWidget);

  return (
    <Modal
      bodyStyle={{maxHeight: '500px', overflow: 'auto'}}
      onOk={() => {
        getContent({listContent: newListContent, titleWidget: newTitleWidget});
        onCancel();
      }}
      title={MODAL.TITLE}
      visible={showSettingInit}
      onCancel={() => {
        onCancel()
      }}
    >
      <InputText
        label={LABEL.TITLE}
        width={'calc(94% - 5px)'}
        placeholder={`${INPUT_TEXT.TITLE}`}
        type={'text'}
        value={newTitleWidget}
        className="item-margin-bottom-10 title"
        onChange={(value) => setTitleWidget(value as string)}
      />
      <RenderCategory
        listContent={newListContent}
        setListContent={(listContent) => {
          let newListContent = listContent.slice();
          setListContent(newListContent);
        }}
      />
    </Modal>
  );
};

export default AppSpaceModel;
