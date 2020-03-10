import React, {useState} from 'react'
import {RocketFilled, PlusCircleOutlined } from '@ant-design/icons'
import {Button, Typography, Menu} from 'antd'
import DeployModal from './DeployModal/DeployModal';
import {ItemTable} from './DeployModal/Type'
import './style.css'

const {Text} = Typography

type item = {
    name?: string;
    value: string
  }

  type DeployData = {
    portal: item ;
    settingDomain: ItemTable[]
  } 
  type DeploySetting = {
    portal: item ;
    settingDomain: ItemTable
  }

type SideBarProps = {
    value?: string;
    items?: item[];
    onChange?: (item: item) => void;
    onDeploy?: (data: DeploySetting) => void;
    onCreate?: () => void;
    dataTable?: ItemTable[], 
    data?: DeployData[]
  }

const SideBar = ({value, data = [], onChange = () => {}, onDeploy = () => {}, onCreate = () => {}, }: SideBarProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [dataSetting, setDataSetting] = useState (data[0])
  return(
      <div>
         <Menu selectedKeys={[`portal-item-${value}`]}>
          {
            data.map((item) => {
            const portal = item.portal
              return(
                <Menu.Item style={{display: 'flex', padding: 0}} key={`portal-item-${portal.value}`} onClick={(e) => {
                    if (e.domEvent.target instanceof HTMLButtonElement) {
                        setModalVisible(true)
                        setDataSetting(item)
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
            <Menu.Item style={{display: 'flex', padding: 0}} key={`portal-item-create`} onClick={onCreate}>
              <span className="sidebar-add-btn" >
                <PlusCircleOutlined />
                <Text>New Portal</Text>
              </span>
            </Menu.Item>
          }
        </Menu>

        <DeployModal 
        isVisible={modalVisible} 
        onClose={() => setModalVisible(false)}
        dataTable= {dataSetting.settingDomain}
        onDeploy = {(setting) => {
          console.log({
            portal: dataSetting.portal,
            settingDomain: setting
        });
          
            onDeploy({
                portal: dataSetting.portal,
                settingDomain: setting
            })
        }}
      />
       </div>
  )
}

export default SideBar