import React, {useState} from 'react'
import {RocketFilled, PlusCircleOutlined } from '@ant-design/icons'
import {Button, Typography, Menu} from 'antd'
import DeployModal from './DeployModal/DeployModal';
import CreateModal from './CreateModel';
import {SideBarProps} from './Type'
import './style.css'

const {Text} = Typography

const SideBar = ({value, data = [], onChange = () => {}, onDeploy = () => {}, onCreate = () => {}, selectedPortal = 0 }: SideBarProps) => {
  const [deployModalVisible, setDeployModalVisible] = useState(false)
  const [createModalVisible, setCreateModalVisible] = useState(false)
  return(
      <div>
         <Menu selectedKeys={[`portal-item-${value}`]}>
          {
            data.map((portal, index) => {
              return(
                <Menu.Item style={{display: 'flex', padding: 0}} key={`portal-item-${portal.value}`} onClick={(e) => {
                    if (e.domEvent.target instanceof HTMLButtonElement) {
                        setDeployModalVisible(true)
                    }
                    onChange(portal, index)
                }}>
                  <span className="portal-list-item">
                    <Text strong={value === portal.value}>{portal.name}</Text>
                    <Button type="primary" icon={<RocketFilled style={{marginRight: 0}} rotate={45}/>} />
                  </span>
                </Menu.Item>
              );
            })
          }
          {
            <Menu.Item style={{display: 'flex', padding: 0}} key={`portal-item-create`} onClick={() => {
              setCreateModalVisible(true)
            }}>
              <span className="sidebar-add-btn" >
                <PlusCircleOutlined />
                <Text>New Portal</Text>
              </span>
            </Menu.Item>
          }
        </Menu>

        <DeployModal 
          isVisible={deployModalVisible} 
          onClose={() => setDeployModalVisible(false)}
          onDeploy = {onDeploy}
          portal = {data[selectedPortal]}
        />

        <CreateModal 
          isVisible={createModalVisible} 
          onClose={() => setCreateModalVisible(false)}
          onCreate = {(data) => {
            setCreateModalVisible(false)
            onCreate(data)
          }}
        />
       </div>
  )
}

export default SideBar