import React, {useState} from 'react';
import {Modal, Input, Menu, Dropdown} from 'antd';
import {PlusCircleFilled, DownOutlined, MinusCircleFilled} from '@ant-design/icons';
import './style.css';

const InputWidget = ({
  label,
  width,
  value,
  placeholder,
  type,
  onChange,
}: {
  label: string;
  width: string;
  value: string;
  placeholder: string;
  type: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="item-block" style={{width}}>
      <strong>{label}</strong>
      <Input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

const DropDown = ({value, onChange}: {value: string; onChange: (value: string) => void}) => {
  const handleClick = (e: any) => {
    onChange(e.item.node.textContent.toLowerCase());
  };
  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="0">
        <span>App</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span>Space</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {value.charAt(0).toUpperCase() + value.substring(1)} <DownOutlined />
      </a>
    </Dropdown>
  );
};

const RenderBlockCategory = ({data, onChange, i}: {data: any; onChange: (data: any) => void; i: number}) => {
  let newData = {...data};
  const renderCategoryDetail = (listWidget: any, callBack: (newListWidget: any) => void) => {
    let newListListWidget = listWidget.slice();
    const addRow = (i: number) => {
      newListListWidget.splice(i + 1, 0, {type: 'app', id: ''});
      callBack(newListListWidget);
    };
    const removeRow = (index: number) => {
      newListListWidget.splice(index, 1);
      callBack(newListListWidget);
    };
    return newListListWidget.map((category: any, i: number) => {
      const newCategory = {...category};
      return (
        <div className="category-detail" key={i}>
          <InputWidget
            label={''}
            width={'65%'}
            value={newCategory.id}
            placeholder={'Please input id'}
            type={'number'}
            onChange={(value: any) => {
              newListListWidget[i].id = value;
              callBack(newListListWidget);
            }}
          />
          <div className="item-block" style={{justifyContent: 'center', width: '20%'}}>
            <DropDown
              value={newCategory.type}
              onChange={(value: string) => {
                newListListWidget[i].type = value;
                callBack(newListListWidget);
              }}
            />
          </div>

          <div className="item-block" style={{justifyContent: 'initial', width: '10%'}}>
            <PlusCircleFilled onClick={() => addRow(i)} />
            {i > 0 ? <MinusCircleFilled onClick={() => removeRow(i)} /> : ''}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="infor-category" key={i}>
      <InputWidget
        label={'Category'}
        width={'100%'}
        value={data.category}
        placeholder={'Please input category'}
        type={'text'}
        onChange={(value: any) => {
          newData.category = value;
          onChange(newData);
        }}
      />
      {renderCategoryDetail(newData.listWidget, (newListListWidget) => {
        newData.listWidget = newListListWidget;
        onChange(newData);
      })}
    </div>
  );
};

const RenderCategory = ({listContent, setListContent}: {listContent: any; setListContent: (listContent: void) => any}) => {
  let newListContent = listContent.slice();
  return (
    <div className="category">
      {newListContent.map((content: any, i: number) => {
        return (
          <RenderBlockCategory
            data={content}
            onChange={(newData) => {
              let cloneData = JSON.parse(JSON.stringify(newData));
              newListContent[i] = cloneData;
              setListContent(newListContent);
            }}
            i={i}
          />
        );
      })}
    </div>
  );
};

const AppSpaceModel = ({showSettingInit}: {showSettingInit?: boolean}) => {
  const [isShow, setShow] = useState(showSettingInit);
  const [listContent, setListContent] = useState([{listWidget: [{type: 'app', id: ''}], category: ''}]);
  const [titleWidget, setTitleWidget] = useState('');

  const renderTitle = () => {
    return (
      <div className="item-block item-margin-bottom-10">
        <strong>Title</strong>
        <Input type="text" placeholder="Please input Title" value={titleWidget} onChange={(e) => setTitleWidget(e.target.value)} />
      </div>
    );
  };

  const renderActionAddCategory = ({onClick}: {onClick: (value: any) => void}) => {
    const handleAddCategory = () => {
      onClick({listWidget: [{type: 'app', id: ''}], category: ''});
    };
    return (
      <div className="add-category">
        <PlusCircleFilled onClick={handleAddCategory} />
      </div>
    );
  };

  return (
    <Modal
      bodyStyle={{maxHeight: '500px', overflow: 'auto'}}
      onOk={() => {}}
      title="Create Space/App List"
      visible={isShow}
      onCancel={() => setShow(false)}
    >
      {renderTitle()}
      <RenderCategory
        listContent={listContent}
        setListContent={(listContent: any) => {
          let newListContent = listContent.slice();
          setListContent(newListContent);
        }}
      />
      {renderActionAddCategory({
        onClick: (value: any) => {
          let newListContent = listContent.slice();
          newListContent.push(value);
          setListContent(newListContent);
        },
      })}
    </Modal>
  );
};

export default AppSpaceModel;
