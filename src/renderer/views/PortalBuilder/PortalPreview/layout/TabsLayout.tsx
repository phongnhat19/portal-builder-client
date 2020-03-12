import React, { useState, useEffect } from 'react'
import {Tabs} from '@kintone/kintone-ui-component';
import QuickReport from './QuickReport'
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

const TabsLayout = ({items = [], onSelectedTabItem = (tabIndex: number) => {}}: {
  items?: Tabs[],
  onSelectedTabItem: (tabIndex: number) => void
}) => {

  const [selectedTab, setSelectedTab] = useState(0)
  const [tabItems, setTabItems] = useState([
    {
      tabName: 'Company Location',
      tabContent: <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC6NGlXCyiz7CbeJAb1RA6bUsWN6YWaK8Q&q=Centre+Point+Tower" style={{ width: '100%', height: '600px' }} />
    },
    {
      tabName: 'Quick Report',
      tabContent: <QuickReport />
    },
    {
      tabName: 'Gmail',
      tabContent: 'Gmail'
    }
  ])

  useEffect(() => {
    let dataItems:any = [];
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
  },[items])

  return(
    <div className='portal-tabs-layout'>
      <Button
        type="default"
        icon={<PlusCircleOutlined />}
        className='portal-tabs-add'
        onClick={() => {
          const item = {
            tabName: 'New Tab',
            tabContent: 'New Tab'
          }
          const newItems = [...tabItems, item];
          setTabItems(newItems)
          setSelectedTab(newItems.length - 1)
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