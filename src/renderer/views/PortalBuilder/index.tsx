import React, { useState } from 'react'
import './style.css'
import PortalPreview from './PortalPreview'
import SideBar from './SideBar'
import WidgetList, {Widget} from './Widget/WidgetList';
import { BorderOutlined, CalendarOutlined, MailOutlined, Html5Outlined } from '@ant-design/icons';

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

  const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const widgetName = (event.target as HTMLDivElement).getElementsByClassName('ant-card-grid ant-card-grid-hoverable')[0]
    event.dataTransfer.setData("text", widgetName.textContent || '');
  }

  const dragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const dropWidget = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log('Target', event.target);
    var keyWidget = event.dataTransfer.getData("text");
    console.log('Result', keyWidget);
  }

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
      <div className="portal-preview" onDragOver={dragOver} onDrop={dropWidget}>
        <PortalPreview />
      </div>
      <div className="widget-list-container">
        <WidgetList containers={widgetList} dragStart={dragStart} />
      </div>
    </div>
  )
}

export default PortalBuilder