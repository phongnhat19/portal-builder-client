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

  const [data, setData] = useState([
    {
      portal: {
          name: 'Portal 1',
          value: '1'
        },
      settingDomain: settingDomain
    },
    {
      portal: {
          name: 'Portal 2',
          value: '2'
        },
      settingDomain: settingDomain
    }
  ])


  const [portalActive, setPortalActive] = useState(data[0].portal.value)
  return(
    <div className="portal-container">
      <div className="portal-list-container">
        <SideBar 
          value = {portalActive}
          data = {data}
          onChange= {(item) => {setPortalActive(item.value)}} 
          onDeploy= {(dataDeploy) => {
            const newData = [...data];
            newData.map(item => {
              if (item.portal.value === dataDeploy.portal.value) {
                return  item.settingDomain.map((domain) => {
                  if (domain.key === dataDeploy.settingDomain.key) {
                    domain.status = 'processing'
                  }
                  return domain
              })
              
              }
            })
            setData(newData)
          }} 
          onCreate= {() => {
            const newList = [...data, {portal: {
              name: `Portal ${data.length + 1}`,
              value: `${data.length + 1}`
            }, settingDomain}];
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