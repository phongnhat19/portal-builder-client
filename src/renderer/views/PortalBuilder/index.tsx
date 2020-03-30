import React, { useState, createContext } from 'react'
import './style.css'
import PortalPreview from './PortalPreview'
import SideBar from './SideBar'
import WidgetList from './Widget/WidgetList';
import { BorderOutlined, CalendarOutlined, Html5Outlined } from '@ant-design/icons';
import { CONTENT_TYPE } from './Widget/constant';

const PortalContext = createContext({
  portalList: [] as Portal[],
  selectedPortal: 0,
  setPortalList: (newPortalList: Portal[]) => {},
  updatePortal: (newPortal: Portal, portalIndex: number) => {},
  removePortal: (portalIndex: number) => {}
});

const LAYOUT_TYPE = {
  TAB: 'Tabs',
  GRID: 'Grid'
}

const PortalBuilder = () => {

  let initData:Portal[] = [
    {
      name: 'Portal 1',
      layout: {
        type: LAYOUT_TYPE.TAB as LayoutType,
        props: {
          tabList: [
            {
              tabName: 'Default Portal',
              tabContent: {
                type: CONTENT_TYPE.DEFAULT as ContentType,
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

  const widgetList: Widget[] = [
    {
      icon: <BorderOutlined />,
      name: CONTENT_TYPE.IFRAME,
    }, 
    {
      icon: <Html5Outlined />,
      name: CONTENT_TYPE.HTML,
    }, 
    {
      icon: <CalendarOutlined />,
      name: CONTENT_TYPE.SCHEDULE
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

  const removePortal = (portalIndex: number) => {
    data.splice(portalIndex, 1)
    setSelectedPortal(data.length - 1)
    setData(JSON.parse(JSON.stringify(data)))
    window.localStorage.setItem("portal", JSON.stringify(data))
  }
  let selectedIndex = selectedPortal > data.length - 1 ? data.length - 1 : selectedPortal

  return(
    <PortalContext.Provider value = {{
      portalList: data, 
      setPortalList, 
      selectedPortal,
      updatePortal,
      removePortal
    }} >
      <div className="portal-container">
        <div className="portal-list-container">
          <SideBar 
            selectedPortal = {selectedIndex}
            items = {data}
            onChange= {(item, index) => {
              setSelectedPortal(index)
            }} 
            onDeploy= {async (dataDeploy) => {}} 
            onCreate= {(item: Portal) => {
              data.push(item)
              setPortalList(data);
              
              setSelectedPortal(data.length - 1)
            }}
            onSaveRename={(item) => {
              data[selectedPortal].name = item.name;
              setPortalList(data);
            }}
          />
        </div>
        <div className="portal-preview">
          <PortalPreview 
            layout = {data.length > 0 ? data[selectedIndex].layout : undefined}
          />
        </div>
        <div className="widget-list-container">
          <WidgetList containers={widgetList}/>
        </div>
      </div>
    </PortalContext.Provider>
  )
}

export {PortalContext, LAYOUT_TYPE}
export default PortalBuilder