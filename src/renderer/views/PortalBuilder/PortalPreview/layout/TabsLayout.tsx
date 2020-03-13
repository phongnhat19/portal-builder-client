import React, { useState, useEffect } from 'react'
import {Tabs} from '@kintone/kintone-ui-component';
import { Button } from 'antd';
import { PlusCircleOutlined , MinusCircleOutlined} from '@ant-design/icons';
import './style.css'

type Tabs = {
  tabName: string,
  tabContent: {
    type: 'Widget' | 'HTML' | 'string',
    name?: string,
    props?: Props,
    value?: string
  }
}

type Props = {
  url: string,
  width: string,
  height: string
}

const TabsLayout = ({tabIndexPreview = 0, items = [], onSelectedTabItem = (tabIndex: number) => {},
onAddItem = (data: any) => { },
onSubItem = (data: any) => { },}: {
  tabIndexPreview: any,
  items?: Tabs[],
  onSelectedTabItem: (tabIndex: number) => void,
  onAddItem?: (data: any) => void
  onSubItem?: (data: any) => void
}) => {

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
          if (!tabContent.props) return;
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
    console.log(items, tabIndexPreview);
    
  },[items])

  return(
    <div className='portal-tabs-layout'>
      <Button
        type="default"
        icon={<PlusCircleOutlined />}
        className='portal-tabs-btn portal-tabs-btn-add'
        onClick={() => {
          const item = {
            tabName: 'New Tab',
            tabContent: 'Please select widget'
          }
          const d = {
            tabName: 'New Tab',
            tabContent: {
              type: "IframeWidget",
              name: "Iframe",
              props: { url: "", width: "100%", height: "600px" }
            }
          }
          onAddItem(d)
          const newItems: any = [...tabItems, item];
          setTabItems(newItems)
          }} />
          <Button
        type="default"
        icon={<MinusCircleOutlined />}
        className='portal-tabs-btn portal-tabs-btn-sub'
        onClick={() => {
          const newItems: any = [...tabItems]
          newItems.splice(selectedTab, 1);
          const tmpData: any = newItems.map((item: any) => {
            if (item.tabName === 'New Tab') {
              item = {
                tabName: 'New Tab',
                tabContent: {
                  type: "Widget",
                  name: "Iframe",
                  props: { url: "", width: "100%", height: "600px" }
                }
              }
            }
            return item
          })
          onSubItem(tmpData)
        }} />
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