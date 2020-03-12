import React, { useState, useEffect } from 'react'
import { Tabs } from '@kintone/kintone-ui-component';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

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

const TabsLayout = ({ items = [], onSelectedTabItem = (tabIndex: number) => { }, onAddItem = (data: any) => { } }: {
  items?: Tabs[],
  onSelectedTabItem: (tabIndex: number) => void
  onAddItem?: (data: any) => void
}) => {

  const [selectedTab, setSelectedTab] = useState(0)
  const [tabItems, setTabItems] = useState([])

  useEffect(() => {
    let dataItems: any = [];
    
    items.forEach(item => {
      let newItem = {
        tabName: item.tabName,
        tabContent: '' as any
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
    setSelectedTab(dataItems.length - 1)
  }, [items])

  return (
    <div className='portal-tabs-layout'>
      <Button
        type="default"
        icon={<PlusCircleOutlined />}
        className='portal-tabs-add'
        onClick={() => {
          const item = {
            tabName: 'New Tab',
            tabContent: ''
          }

          const d = {
            tabName: 'New Tab',
            tabContent: {
              type: "Widget",
              name: "Iframe",
              props: { url: "https://kenh14.vn/", width: "100%", height: "600px" }
            }
          }
          onAddItem(d)
          const newItems: any = [...tabItems, item];
          setTabItems(newItems)
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