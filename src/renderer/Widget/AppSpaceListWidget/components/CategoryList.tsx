import React from 'react';
import {InputText} from './InputWidget';
import DropDownType from './DropDownType';
import {PlusCircleFilled, MinusCircleFilled} from '@ant-design/icons';
import {INPUT_TEXT} from '../constant';

const RenderCategoryDetail = ({
  listCategory,
  onChangeRow,
}: {
  listCategory: any;
  onChangeRow?: (listCategory: {id: string; type: string}[]) => void;
}) => {
  let newListCategory = listCategory.slice();
  const addRow = (i: number) => {
    newListCategory.splice(i + 1, 0, {type: 'app', id: ''});
    if (onChangeRow) onChangeRow(newListCategory);
  };
  const removeRow = (index: number) => {
    newListCategory.splice(index, 1);
    if (onChangeRow) onChangeRow(newListCategory);
  };
  return newListCategory.map((category: CategorytAppSpace, i: number) => {
    const newCategory = {...category};
    return (
      <div className={'category-detail'} key={i}>
        <div className="item-block flex-end">
          <DropDownType
            value={newCategory.type}
            onChange={(value: string) => {
              newListCategory[i].type = value;
              if (onChangeRow) onChangeRow(newListCategory);
            }}
          />
        </div>
        <InputText
          label={''}
          width={'67%'}
          value={newCategory.id}
          placeholder={`${INPUT_TEXT.ID}`}
          type={'number'}
          className="input-text-custome"
          onChange={(value) => {
            newListCategory[i].id = value as string;
            if (onChangeRow) onChangeRow(newListCategory);
          }}
        />
        <div className="item-block width">
          <PlusCircleFilled onClick={() => addRow(i)} style={{color:"#1890ff"}} />
          {i > 0 ? <MinusCircleFilled style={{color:"#1890ff"}} onClick={() => removeRow(i)} /> : ''}
        </div>
      </div>
    );
  });
};

export default RenderCategoryDetail;
