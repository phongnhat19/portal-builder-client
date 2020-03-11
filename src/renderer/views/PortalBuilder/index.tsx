import React, { useState } from 'react'
import WidgetList from './DefaultWidgetList'
import './style.css'
import PortalPreview from './PortalPreview'
import SideBar from './SideBar'

const PortalBuilder = () => {

  const settingDomain = [
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
          type: 'tab'
        },
      settingDomain: [...settingDomain]
    },
    {
      portal: {
          name: 'Portal 2',
          value: '2',
          type: 'tab'
        },
      settingDomain: [...settingDomain]
    }
  ]
  const [data, setData] = useState(initData)
  const [portalActive, setPortalActive] = useState(data[0].portal.value)
  return(
    <div className="portal-container">
      <div className="portal-list-container">
        <SideBar 
          value = {portalActive}
          data = {data}
          onChange= {(item) => {setPortalActive(item.value)}} 
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
          onCreate= {(item) => {
            const newList = [...data, {portal: item, settingDomain}];
            setData(newList);
          }}
          settingDomain= {settingDomain}
        />
      </div>
      <div className="portal-preview">
        <PortalPreview />
      </div>
      <div className="widget-list-container">
        <WidgetList />
      </div>
    </div>
  )
}

export default PortalBuilder