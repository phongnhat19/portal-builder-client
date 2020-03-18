import React, { useState, createContext } from 'react'
import './style.css'
import PortalPreview from './PortalPreview'
import SideBar from './SideBar'
import WidgetList, {Widget} from './Widget/WidgetList';
import {Portal, Layout, TabContentType} from './Type'
import { BorderOutlined, CalendarOutlined, Html5Outlined } from '@ant-design/icons';

const PortalContext = createContext({
  portalList: [] as Portal[],
  selectedPortal: 0,
  setPortalList: (newPortalList: Portal[]) => {},
  updatePortal: (newPortal: Portal, portalIndex: number) => {}
});

const PortalBuilder = () => {

  let initData:Portal[] = [
    {
      name: 'Portal 1',
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
  
  const storagePortal = window.localStorage.getItem('portal')
  if (storagePortal !== null) {
    initData = JSON.parse(storagePortal);
  }
  
  const [data, setData] = useState(initData)
  const [selectedPortal, setSelectedPortal] = useState(0)
  const [tabIndexPreview, setTabIndexPreview] = useState(0)
  // const [isShowIframeModel, setShowIframeModel] = useState(false);
  const widgetList: Widget[] = [
    {
      icon: <BorderOutlined />,
      name: TabContentType.IFRAME,
    }, 
    {
      icon: <Html5Outlined />,
      name: TabContentType.HTML,
    }, 
    {
      icon: <CalendarOutlined />,
      name: 'Schedule',
    }
  ]

  const setPortalList = (newPortalList: Portal[]) => {
    setData(JSON.parse(JSON.stringify(newPortalList)))
    window.localStorage.setItem("portal", JSON.stringify(newPortalList))
  }

  const updatePortal = (newPortal: Portal, portalIndex: number) => {
    data[portalIndex] = newPortal
    setData(JSON.parse(JSON.stringify(data)))
    window.localStorage.setItem("portal", JSON.stringify(data))
  }

  return(
    <PortalContext.Provider value = {{
      portalList: data, 
      setPortalList, 
      selectedPortal,
      updatePortal
    }} >
      <div className="portal-container">
        <div className="portal-list-container">
          <SideBar 
            selectedPortal = {selectedPortal}
            items = {data}
            onChange= {(item, index) => {
              setSelectedPortal(index)
              setTabIndexPreview(0)
            }} 
            onDeploy= {async (dataDeploy) => {}} 
            onCreate= {(item: Portal) => {
              const newList = [...data, item];
              setData(newList);
              window.localStorage.setItem("portal", JSON.stringify(newList))
              
              setSelectedPortal(newList.length - 1)
              setTabIndexPreview(0)
            }}
          />
        </div>
        <div className="portal-preview">
          <PortalPreview 
            layout = {data[selectedPortal].layout}
            onAddTabs={(item: any) => {
              data[selectedPortal].layout.props.tabList.push(item)
              setPortalList(data);
              // window.localStorage.setItem("portal", JSON.stringify(data))
            }}
            onRemoveTabs = {(layout: Layout) => {
              const newData = JSON.parse(JSON.stringify(data))
              newData[selectedPortal].layout = layout
              setData(newData);
              window.localStorage.setItem("portal", JSON.stringify(newData))
            }}
          />
        </div>
        <div className="widget-list-container">
          <WidgetList containers={widgetList}/>
        </div>
      </div>
    </PortalContext.Provider>
  )
}

export {PortalContext}
export default PortalBuilder