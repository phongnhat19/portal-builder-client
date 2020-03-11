import React, { useState } from 'react'
import WidgetList from './DefaultWidgetList'
import './style.css'
import PortalPreview from './PortalPreview'
import SideBar from './SideBar'
import {Portal} from './Type'
import {ItemTable} from '../PortalBuilder/DeployModal/Type'

const PortalBuilder = () => {

  const settingDomain:ItemTable[]= [
    {
      key: '1',
      profile: 'Profile 1',
      domain: 'kimcuc-1.cybozu.com',
      status: 'done'
    },
    {
      key: '2',
      profile: 'Profile 2',
      domain: 'kimcuc-2.cybozu.com',
      status: 'processing'
    },
    {
      key: '3',
      profile: 'Profile 3',
      domain: 'kimcuc-3.cybozu.com',
      status: 'unfulfilled'
    }
  ];

  const initData = [
    {
      portal: {
          name: 'Portal 1',
          value: '1',
          type: 'Tabs'
        },
      settingDomain: [...settingDomain],
      layout: {
        type: 'Tabs',
        props: {
          tabList: [
            {
              tabName: 'Default Portal',
              tabContent: {
                type: 'Widget',
                name: 'DefaultPortal'
              }
            },
            {
              tabName: 'Company Location',
              tabContent: {
                type: 'Widget',
                name: 'Iframe',
                props: {
                  url: 'https://kenh14.vn/',
                  width: '100%',
                  height: '600px'
                }
              }
            }
          ]
        }
      }
    },
    {
      portal: {
          name: 'Portal 2',
          value: '2',
          type: 'Tabs'
        },
      settingDomain: [...settingDomain],
      layout: {
        type: 'Tabs',
        props: {
          tabList: [
            {
              tabName: 'Default Portal',
              tabContent: {
                type: 'Widget',
                name: 'DefaultPortal'
              }
            },
            {
              tabName: 'Company Location',
              tabContent: {
                type: 'Widget',
                name: 'Iframe',
                props: {
                  url: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyC6NGlXCyiz7CbeJAb1RA6bUsWN6YWaK8Q&q=Centre+Point+Tower',
                  width: '100%',
                  height: '600px'
                }
              }
            }
          ]
        }
      }
    }
  ]
  const [data, setData] = useState(initData)
  const [portalActive, setPortalActive] = useState(data[0])
  return(
    <div className="portal-container">
      <div className="portal-list-container">
        <SideBar 
          value = {portalActive.portal.value}
          data = {data}
          onChange= {(item) => {setPortalActive(item)}} 
          onDeploy= {(dataDeploy) => {
            let newData = [...data];
            newData = newData.map(item => {
              if (item.portal.value === dataDeploy.portal.value) {
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
          }} 
          onCreate= {(item: Portal) => {
            const layout = {
              type: item.type,
              props: {
                tabList: [
                  {
                    tabName: 'Default Portal',
                    tabContent: {
                      type: 'Widget',
                      name: 'DefaultPortal'
                    }
                  }
                ]
              }
            }
            const newList = [...data, {portal: item, settingDomain, layout}];
            setData(newList);
          }}
        />
      </div>
      <div className="portal-preview">
        <PortalPreview layout = {portalActive.layout}/>
      </div>
      <div className="widget-list-container">
        <WidgetList />
      </div>
    </div>
  )
}

export default PortalBuilder