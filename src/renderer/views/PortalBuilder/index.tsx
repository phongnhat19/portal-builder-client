import React, { useState } from 'react'
import './style.css'
import PortalPreview from './PortalPreview'
import SideBar from './SideBar'
import WidgetList, {Widget} from './Widget/WidgetList';
import {Portal} from './Type'
import {ItemTable} from '../PortalBuilder/DeployModal/Type'
import IframeModel from './Widget/DragModel/IframeModel'
import {downloadFile, portalJs, portalCss} from './util'
import { BorderOutlined, CalendarOutlined, MailOutlined, Html5Outlined } from '@ant-design/icons';

const PortalBuilder = () => {

  const settingDomain:ItemTable[]= [
    {
      key: '3',
      profile: 'Profile 3',
      domain: 'kimcuc-3.cybozu.com',
      status: 'unfulfilled'
    }
  ];

  const initData = [
    {
      name: 'Portal 1',
      value: '1',
      type: 'Tabs',
      settingDomain: [...settingDomain],
      layout: {
        type: 'Tabs',
        props: {
          tabList: [
            {
              tabName: 'Default Portal',
              tabContent: {
                type: 'DefaultPortal',
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
    }, {
      icon: <Html5Outlined />,
      name: 'HTML',
    }, {
      icon: <CalendarOutlined />,
      name: 'Schedule',
    }, {
      icon: <MailOutlined />,
      name: 'Gmail',
    }
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
        tabContent.props.url = url

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
          onDeploy= {async (dataDeploy) => {
            let newData = [...data];
            newData = newData.map(item => {
              if (item.value === dataDeploy.value) {
                item.settingDomain = item.settingDomain.map((domain) => {
                    const copyDomain = {...domain};
                    if (copyDomain.key === dataDeploy.settingDomain.key) {
                      copyDomain.status = 'processing'
                    }
                    return copyDomain
                })
              }
              return item
            })
            setData(newData)
            
            const template = portalJs.replace('PORTAL_CONFIG', `${JSON.stringify(data[selectedPortal].layout.props.tabList)}`)
            
            downloadFile('customPortalTemplate.min.js', template)
            downloadFile('customPortalTemplate.min.css', portalCss)
          }} 
          onCreate= {(item: Portal) => {
            const layout = {
              type: item.type,
              props: {
                tabList: [
                  {
                    tabName: 'Default Portal',
                    tabContent: {
                      type: 'DefaultPortal',
                      name: 'DefaultPortal'
                    }
                  }
                ]
              }
            }
            const newPortal = {
              name: item.name,
              value: item.name,
              settingDomain,
              layout
            };
            const newList = [...data, newPortal];
            setData(newList);
            
            setselectedPortal(newList.length - 1)
            setTabIndexPreview(0)
          }}
        />
      </div>
      <div className="portal-preview" onDragOver={(event: React.DragEvent<HTMLDivElement>) => {event.preventDefault();}} onDrop={dropWidget}>
        <PortalPreview 
          layout = {data[selectedPortal].layout}
          onTabPreview= {(index: number) => {
            setTabIndexPreview(index)
            console.log(index);
            
          }}
          tabIndexPreview = {tabIndexPreview}
          onAddItemTabs={(item: any) => {
            console.log(data[selectedPortal]);
            
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
          onSubItemTabs = {(layout) => {

          }}
        />
      </div>
      <div className="widget-list-container">
        <WidgetList containers={widgetList}/>
        
        <IframeModel isVisible = {isShowIframeModel} onClose={() => (setShowIframeModel(false) )} onSave={(item) => {
          setDropWidgetData(item.url)
          setShowIframeModel(false)
        }}/>
      </div>
    </div>
  )
}

export default PortalBuilder