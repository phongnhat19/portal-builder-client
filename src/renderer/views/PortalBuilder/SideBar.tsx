import React, {useState} from 'react'
import {RocketFilled, PlusCircleOutlined } from '@ant-design/icons'
import {Button, Typography, Menu} from 'antd'
import DeployModal from './DeployModal/DeployModal';
import CreateModal from './CreateModel';
import {SideBarProps} from './Type'
import './style.css'

const {Text} = Typography

const SideBar = ({value, data = [], onChange = () => {}, onDeploy = () => {}, onCreate = () => {}, }: SideBarProps) => {
  const [deployModalVisible, setDeployModalVisible] = useState(false)
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [dataSetting, setDataSetting] = useState (data[0])
  return(
      <div>
         <Menu selectedKeys={[`portal-item-${value}`]}>
          {
            data.map((portal) => {
              return(
                <Menu.Item style={{display: 'flex', padding: 0}} key={`portal-item-${portal.value}`} onClick={(e) => {
                    if (e.domEvent.target instanceof HTMLButtonElement) {
                        setDeployModalVisible(true)
                        setDataSetting(portal)
                    }
                    onChange(portal)
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
          dataTable= {dataSetting.settingDomain}
          onDeploy = {(setting) => {
            onDeploy({
                name: dataSetting.name,
                type: dataSetting.type,
                value: dataSetting.value,
                settingDomain: setting
            })
          }}
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