import React, { useState, useEffect } from 'react'
import './style.css'
import PortalPreview from './PortalPreview'
import SideBar from './SideBar'
import WidgetList, { Widget } from './Widget/WidgetList';
import { Portal } from './Type'
import { ItemTable } from '../PortalBuilder/DeployModal/Type'
import { BorderOutlined, CalendarOutlined, MailOutlined, Html5Outlined } from '@ant-design/icons';

const PortalBuilder = () => {

  const settingDomain: ItemTable[] = [
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
      name: 'Portal 2',
      value: '2',
      type: 'Tabs',
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
  const [tabIndexPreview, setTabIndexPreview] = useState(0)

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

  const dragStart = (event: any) => {
    // const widgetName = (event.target as HTMLDivElement).getElementsByClassName('ant-card-grid ant-card-grid-hoverable')[0]
    // event.dataTransfer.setData("text", widgetName.textContent || '');
    // console.log(event);

  }

  const dragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const dropWidget = (event: React.DragEvent<HTMLDivElement>) => {
    var keyWidget = event.dataTransfer.getData("text");
    const portalActiveCopy = portalActive;
    const activeLayout = portalActiveCopy.layout.props.tabList[tabIndexPreview];
    const propsLayout = activeLayout.tabContent.props;
    if (!propsLayout) return;
    propsLayout.url = "https://icons8.com/icons/set/grid"
    console.log(portalActiveCopy);
    setPortalActive(portalActiveCopy)
  }

  return (
    <div className="portal-container">
      <div className="portal-list-container">
        <SideBar
          value={portalActive.value}
          data={data}
          onChange={(item) => {
            setPortalActive(item)
          }}
          onDeploy={(dataDeploy) => {
            let newData = [...data];
            newData = newData.map(item => {
              if (item.value === dataDeploy.value) {
                item.settingDomain = item.settingDomain.map((domain) => {
                  const copyDomain = { ...domain };
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
          onCreate={(item: Portal) => {
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
            const newList = [...data, {
              name: item.name,
              value: item.name,
              settingDomain,
              layout
            }];
            setData(newList);
          }}
        />
      </div>
      <div className="portal-preview" onDragOver={dragOver} onDrop={dropWidget}>
        <PortalPreview
          onAddItemTabs={(item: any) => {
            const valueOfPortalAction: string = portalActive.value
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
          onSubItemTabs={(listItems: any) => {
            const valueOfPortalAction: string = portalActive.value
            const tmpData = [...data]
            const newList: any = tmpData.map(tab => {
              const tmpTab = { ...tab }
              if (tmpTab.value === valueOfPortalAction) {
                tmpTab.layout.props.tabList = []
                tmpTab.layout.props.tabList = listItems
              }

              return tmpTab;
            })
            setData(newList);
          }}
          layout={portalActive.layout}
          onTabPreview={(index: number) => {
            // console.log(index);
            setTabIndexPreview(index)
          }} />
      </div>
      <div className="widget-list-container">
        <WidgetList containers={widgetList} onDragStart={dragStart} />
      </div>
    </div>
  )
}

export default PortalBuilder