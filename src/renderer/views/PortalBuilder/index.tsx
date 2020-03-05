import React, { useState } from 'react'
import {RocketFilled} from '@ant-design/icons'
import {Button, Typography, Menu} from 'antd'
import WidgetList from './DefaultWidgetList'
import './style.css'
import PortalPreview from './PortalPreview'

const {Text} = Typography

const PortalBuilder = () => {
  const [portalList, setPortalList] = useState([
    {
      name: 'Portal 1',
      layout: {
        type: 'Tab',
        data: {}
      }
    },
    {
      name: 'Portal 2',
      layout: {
        type: 'Tab',
        data: {}
      }
    }
  ])

  const [selectedPortalIndex, setSelectedPortalIndex] = useState(0)

  return(
    <div className="portal-container">
      <div className="portal-list-container">
        <Menu selectedKeys={[`portal-item-${selectedPortalIndex}`]}>
          {
            portalList.map((portal, index) => {
              return(
                <Menu.Item style={{display: 'flex', padding: 0}} key={`portal-item-${index}`} onClick={() => {
                  setSelectedPortalIndex(index)
                }}>
                  <span className="portal-list-item">
                    <Text strong={selectedPortalIndex === index}>{portal.name}</Text>
                    <Button type="primary" icon={<RocketFilled style={{marginRight: 0}} rotate={45}/>} />
                  </span>
                </Menu.Item>
              );
            })
          }
        </Menu>
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