import React from 'react';
import {InputWithLabel} from './InputWithLabel';
import TypeDropdown from './TypeDropdown';
import {PlusCircleFilled, MinusCircleFilled} from '@ant-design/icons';
import {INPUT_TEXT} from '../constant';

const CategoryDetail = ({
  categoryList,
  onChangeRow,
}: {
  categoryList: any;
  onChangeRow?: (categoryList: Array<{id: string; type: string; name: string; icon: string}>) => void;
}) => {
  const newCategoryList = categoryList.slice();
  const addRow = (i: number) => {
    newCategoryList.splice(i + 1, 0, {type: 'app', id: '', name: '', icon: ''});
    if (onChangeRow) onChangeRow(newCategoryList);
  };
  const removeRow = (index: number) => {
    newCategoryList.splice(index, 1);
    if (onChangeRow) onChangeRow(newCategoryList);
  };
  return newCategoryList.map((category: CategorytAppSpace, i: number) => {
    const newCategory = {...category};
    return (
      <div className="category-detail" key={i}>
        <div className="item-block flex-end">
          <TypeDropdown
            value={newCategory.type}
            onChange={(value: string) => {
              newCategoryList[i].type = value;
              if (onChangeRow) onChangeRow(newCategoryList);
            }}
          />
        </div>
        <InputWithLabel
          label=""
          width="67%"
          value={newCategory.id}
          placeholder={`${INPUT_TEXT.ID}`}
          type="number"
          className="input-text-custome"
          onChange={(value) => {
            newCategoryList[i].id = value as string;
            if (onChangeRow) onChangeRow(newCategoryList);
          }}
        />
        <div className="item-block width">
          <PlusCircleFilled onClick={() => addRow(i)} style={{color: '#1890ff'}} />
          {i > 0 && <MinusCircleFilled style={{color: '#1890ff'}} onClick={() => removeRow(i)} />}
        </div>
      </div>
    );
  });
};

export default CategoryDetail;
