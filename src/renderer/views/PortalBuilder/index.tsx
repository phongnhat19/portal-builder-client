import React, { useState } from 'react'
import './style.css'
import PortalPreview from './PortalPreview'
import SideBar from './SideBar'
import WidgetList, {Widget} from './Widget/WidgetList';
import {Portal, Layout, TabContentType} from './Type'
import IframeModel from './Widget/DragModel/IframeModel'
import { BorderOutlined, CalendarOutlined, MailOutlined, Html5Outlined } from '@ant-design/icons';

const PortalBuilder = () => {

  const initData:Portal[] = [
    {
      name: 'Portal 1',
      value: '1',
      layout: {
        type: 'Tabs',
        props: {
          tabList: [
            {
              tabName: 'Default Portal',
              tabContent: {
                type: TabContentType.DEFAULT,
                name: 'DefaultPortal'
              }
            }
          ]
        }
      }
    }
  ]
  
  const [data, setData] = useState(initData)
  const [selectedPortal, setselectedPortal] = useState(0)
  const [tabIndexPreview, setTabIndexPreview] = useState(0)
  const [isShowIframeModel, setShowIframeModel] = useState(false);
  const widgetList: Widget[] = [
    {
      icon: <BorderOutlined />,
      name: 'Iframe',
    }, 
    {
      icon: <Html5Outlined />,
      name: 'HTML',
    }, 
    {
      icon: <CalendarOutlined />,
      name: 'Schedule',
    }, 
    // {
    //   icon: <MailOutlined />,
    //   name: 'Gmail',
    // }
  ]

  const dropWidget = () => {
    setShowIframeModel(true)
  }

  const setDropWidgetData = (url: string) => {
        let portal =  Object.assign({},data[selectedPortal])
        const tabList = [...portal.layout.props.tabList]
        
        const activeLayout = {...tabList[tabIndexPreview]};
        let tabContent = {...activeLayout.tabContent}
        tabContent.props = Object.assign({},tabContent.props);
        if (!tabContent.props) return;
        tabContent.props.url = url;
        tabContent.props.width = '100%'
        tabContent.props.height = "600px"

        activeLayout.tabContent = tabContent
        tabList[tabIndexPreview] = activeLayout
        portal.layout.props.tabList = tabList
  }

  return(
    <div className="portal-container">
      <div className="portal-list-container">
        <SideBar 
          value = {data[selectedPortal].value}
          data = {data}
          onChange= {(item, index) => {
           setselectedPortal(index)
           setTabIndexPreview(0)
          }} 
          onDeploy= { (profile, index) => {}} 
          onCreate= {(item: Portal) => {
            const newList = [...data, item];
            setData(newList);
            
            setselectedPortal(newList.length - 1)
            setTabIndexPreview(0)
          }}
          selectedPortal = {selectedPortal}
        />
      </div>
      <div className="portal-preview" onDragOver={(event: React.DragEvent<HTMLDivElement>) => {event.preventDefault();}} onDrop={dropWidget}>
        <PortalPreview 
          layout = {data[selectedPortal].layout}
          onTabPreview= {(index: number) => {setTabIndexPreview(index)}}
          tabIndexPreview = {tabIndexPreview}
          onAddItemTabs={(item: any) => {
            const valueOfPortalAction: string = data[selectedPortal].value
            const tmpData = [...data]
            const newList: any = tmpData.map(tab => {
              const tmpTab = { ...tab }
              if (tmpTab.value === valueOfPortalAction) {
                tmpTab.layout.props.tabList.push(item)
              }
              return tmpTab;
            })
            setData(newList);
          }}
          onRemoveItemTabs = {(layout: Layout) => {
            const newData = JSON.parse(JSON.stringify(data))
            newData[selectedPortal].layout = layout
            setData(newData);
          }}
        />
      </div>
      <div className="widget-list-container">
        <WidgetList containers={widgetList}/>
        
        <IframeModel 
          isVisible = {isShowIframeModel} 
          onClose={() => (setShowIframeModel(false) )}
          onSave={(item) => {
            setDropWidgetData(item.url)
            setShowIframeModel(false)
          }}
        />
      </div>
    </div>
  )
}

export default PortalBuilder