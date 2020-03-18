import React, { useState, useEffect, useContext } from 'react'
import {Tabs} from '@kintone/kintone-ui-component';
import { Button} from 'antd';
import { PlusCircleOutlined , MinusCircleOutlined} from '@ant-design/icons';
import '../style.css'
import { Portal, TabContentType } from '../../../Type';
import { TabsLayoutProps, TabProps } from '../../Type';
import IframeWidget from '../../../Widget/IframeWidget';
import { PortalContext } from '../../..';

const TabsLayout = ({
  items = [],
  onAddItem = () => {},
  onRemoveItem = () => { }
} : TabsLayoutProps) => {

  const [selectedTab, setSelectedTab] = useState(0)
  const [tabItems, setTabItems] = useState([] as any[])
  const {portalList, setPortalList, selectedPortal} = useContext(PortalContext)

  const removeWidget = () => {
    const tabList = portalList[selectedPortal].layout.props.tabList
    delete tabList[selectedTab].tabContent['props']
    setPortalList(portalList)
  }

  const updateWidget = (newProps: TabProps) => {
    const tabList = portalList[selectedPortal].layout.props.tabList
    tabList[selectedTab].tabContent.props = newProps
    setPortalList(portalList)
  }

  useEffect(() => {
    setSelectedTab(items.length - 1)
  }, [items.length])

  useEffect(() => {
    let dataItems = [] as any[];
    items.forEach(item => {
      let newItem = {
        tabName: item.tabName,
        tabContent: 'This is kintone default Portal' as any
      }
      const tabContent = item.tabContent;
      if (!tabContent) return;
      switch (tabContent.type) {
        case TabContentType.IFRAME:
          if (!tabContent.props) {
            newItem.tabContent = 'Please drag Iframe to create new widget'
            break;
          };
          newItem.tabContent = 
            <IframeWidget 
              url={tabContent.props.url}
              width={tabContent.props.width}
              height={tabContent.props.height}
              showSettingInit={tabContent.props.showSettingInit}
              onRemove={removeWidget}
              onSaveSetting={({url}) => {
                let currentProps = JSON.parse(JSON.stringify(tabContent.props))
                currentProps.url = url
                currentProps.showSettingInit = false;
                updateWidget(currentProps)
              }}
            />
          break
        default:
          break;
      }
      dataItems = [...dataItems, newItem]
    })

    setTabItems(dataItems)
  },[items])

  const dropWidget = (tabIndex: number) => {

    const currentTab = portalList[selectedPortal].layout.props.tabList[tabIndex]

    if (currentTab.tabContent.type !== TabContentType.DEFAULT){
      currentTab.tabContent = {
        type: TabContentType.IFRAME,
        name: 'New Tab',
        props: {
          showSettingInit: true,
          url: "",
          width: "100%",
          height: "600px"
        }
      }
      setPortalList(portalList)
    } 
  }

  return(
    <div 
      className='portal-tabs-layout'
      onDragOver={(event: React.DragEvent<HTMLDivElement>) => {event.preventDefault();}} 
      onDrop={() => dropWidget(selectedTab)}
    >
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
              setSelectedTab(newSelectedTab)
              onRemoveItem(selectedTab)
            }} 
          />
        }
      <Tabs
        items={tabItems}
        value={selectedTab}
        onClickTabItem={setSelectedTab}
      />
      
    </div>
  )
}

export default TabsLayout