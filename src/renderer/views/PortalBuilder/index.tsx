import React, { useState } from 'react'
import WidgetList from './DefaultWidgetList'
import './style.css'
import PortalPreview from './PortalPreview'
import SideBar from './SideBar'

const PortalBuilder = () => {

  const settingDomain1 = [
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

  const settingDomain2 = [
    {
      key: '4',
      profile: 'Profile 1',
      domain: 'kimcuc-1.cybozu.com',
      status: 'done'
    },
    {
      key: '5',
      profile: 'Profile 2',
      domain: 'kimcuc-2.cybozu.com',
      status: 'processing'
    },
    {
      key: '6',
      profile: 'Profile 3',
      domain: 'kimcuc-3.cybozu.com',
      status: 'unfulfilled'
    }
  ];

  const settingDomain3 = [
    {
      key: '7',
      profile: 'Profile 1',
      domain: 'kimcuc-1.cybozu.com',
      status: 'done'
    },
    {
      key: '8',
      profile: 'Profile 2',
      domain: 'kimcuc-2.cybozu.com',
      status: 'processing'
    },
    {
      key: '9',
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
      settingDomain: settingDomain1
    },
    {
      portal: {
        name: 'Portal 2',
        value: '2'
      },
      settingDomain: settingDomain2
    }
  ])


  const [portalActive, setPortalActive] = useState(data[0].portal.value)
  return (
    <div className="portal-container">
      <div className="portal-list-container">
        <SideBar
          value={portalActive}
          data={data}
          onChange={(item) => { setPortalActive(item.value) }}
          onDeploy={(dataDeploy) => {
            const newData = [...data];
            newData.map(item => {
              if (item.portal.value === dataDeploy.portal.value) {
                return item.settingDomain.map((domain) => {
                  if (domain.key === dataDeploy.settingDomain.key) {
                    domain.status = 'processing'
                  }
                  return domain
                })

              }
            })
            setData(newData)
          }}
          onCreate={() => {
            const newList = [...data, {
              portal: {
                name: `Portal ${data.length + 1}`,
                value: `${data.length + 1}`
              }, settingDomain: settingDomain3
            }];
            setData(newList);
          }}
          settingDomain={settingDomain3}
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