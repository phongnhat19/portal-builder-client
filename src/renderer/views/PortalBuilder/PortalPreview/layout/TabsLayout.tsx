import React, { useState, useEffect } from 'react'
import {Tabs} from '@kintone/kintone-ui-component';
import { Button } from 'antd';
import { PlusCircleOutlined , MinusCircleOutlined} from '@ant-design/icons';
import {TabsLayoutProps, TabContentType} from '../Type'
import './style.css'

const TabsLayout = ({
      tabIndexPreview = 0, items = [],
      onSelectedTabItem = () => {},
      onAddItem = () => {},
      onSubItem = () => { }
} : TabsLayoutProps) => {

  const [selectedTab, setSelectedTab] = useState(tabIndexPreview)
  const [tabItems, setTabItems] = useState([])

  useEffect(() => {
    let dataItems:any = [];
    items.forEach(item => {
      let newItem = {
        tabName: item.tabName,
        tabContent: 'This is kintone default Portal' as any
      }
      const tabContent = item.tabContent;
      if (!tabContent) return;
      switch (tabContent.name) {
        case 'Iframe':
          if (!tabContent.props) {
            newItem.tabContent = 'Please drag Iframe to create new widget'
            break;
          };
          const style = {
            width: tabContent.props.width,
            height: tabContent.props.height
          }
          newItem.tabContent = <iframe src={tabContent.props.url} style={style} />
          break
        default:
          break;
      }
      dataItems = [...dataItems, newItem]
    })
    setTabItems(dataItems)
    setSelectedTab(tabIndexPreview)
  },[items, tabIndexPreview])

  return(
    <div className='portal-tabs-layout'>
      <Button
        type="default"
        icon={<PlusCircleOutlined />}
        className='portal-tabs-btn portal-tabs-btn-add'
        onClick={() => {
          const tab = {
            tabName: 'New Tab',
            tabContent: {
              type: TabContentType.IFRAME,
              name: "Iframe"
            }
          }
          onAddItem(tab)
          onSelectedTabItem(tabItems.length)
        }} 
      />
        {tabItems.length > 1 &&
          <Button
            type="default"
            icon={<MinusCircleOutlined />}
            className='portal-tabs-btn portal-tabs-btn-sub'
            onClick={() => {
              if (selectedTab === 0) return;

              const newSelectedTab = selectedTab - 1;
              onSelectedTabItem(newSelectedTab)
              const newItems = [...items];
              newItems.splice(selectedTab, 1)
              onSubItem(newItems)
            }} 
          />
        }
      <Tabs
        items={tabItems}
        value={selectedTab}
        onClickTabItem={(i) => {
          setSelectedTab(i)
          onSelectedTabItem(i)
        }}
      />
    </div>
  )
}

export default TabsLayout