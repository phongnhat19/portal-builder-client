import React, {useState, useContext} from 'react'
import {RocketFilled, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import {Button, Typography, Menu, Popconfirm} from 'antd'
import DeployModal from './DeployModal/DeployModal';
import CreateModal from './CreateModel';
import {SideBarProps} from './Type'
import './style.css'
import {PortalContext} from './index'
import PortalConfigNameModal from './PortalConfigModal/PortalConfigNameModal';

const {Text} = Typography

const CONFIRM_DELETE_PORTAL = "Are you sure to delete this portal ? This action CAN NOT be reverted."

const SideBar = ({items = [], onChange = () => {}, onDeploy = () => {}, onCreate = () => {}, selectedPortal = 0, onSaveRename = ()=> {} }: SideBarProps) => {
  const [deployModalVisible, setDeployModalVisible] = useState(false)
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [editNameModalVisible, setNameModalVisible] = useState(false)

  const {removePortal} = useContext(PortalContext)

  return(
      <div>
         <Menu selectedKeys={[`portal-item-${selectedPortal}`]}>
          {
            items.map((portal, index) => {
              return(
                <Menu.Item style={{display: 'flex', padding: 0}} key={`portal-item-${index}`} onClick={(_) => {
                    onChange(portal, index)
                }}>
                  <span 
                    className="portal-list-item" 
                    onDoubleClick={() => {
                      if (selectedPortal === index) {
                        setNameModalVisible(true)
                      }
                    }}
                  >
                    <Text strong={selectedPortal === index}>{portal.name}</Text>
                    {
                      selectedPortal === index &&
                      <React.Fragment>
                        <PortalConfigNameModal 
                          portalName={portal.name}
                          isVisible={editNameModalVisible}
                          onClose={() => setNameModalVisible(false)}
                          onSave = {(item) => {
                            setNameModalVisible(false)
                            onSaveRename(item)
                          }}
                        />
                      <span>
                        <Button 
                          type="primary" 
                          icon={<RocketFilled style={{marginRight: 0}} rotate={45}/>} 
                          onClick={() => {
                            setDeployModalVisible(true)
                          }}
                        />
                        <Popconfirm
                          placement="bottomLeft"
                          title={CONFIRM_DELETE_PORTAL}
                          onConfirm={() => removePortal(index)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button 
                            type="danger" 
                            icon={<DeleteOutlined style={{marginRight: 0}} />} 
                            // onClick={() => removePortal(index)}
                          />
                        </Popconfirm>
                      </span>
                      </React.Fragment>
                    }
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
          portal = {items[selectedPortal]}
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