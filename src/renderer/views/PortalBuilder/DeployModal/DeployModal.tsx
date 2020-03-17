import React, {useContext, useState, useEffect} from 'react'
import {ProfileContext} from '../../../App'
import {Modal, Button} from 'antd'
import TableCustom from './TableCustom'
import {Profile} from '../../../App'
import {Portal} from '../../PortalBuilder/Type'
import {ipcRenderer} from 'electron'

type DeployModal = {
  isVisible: boolean
  onClose?: () => void
  onDeploy: (data: Profile, index: number) => void
  portal: Portal
}

const DeployModal = ({isVisible = false, onClose = () => {}, onDeploy, portal}: DeployModal) => {
  const {profiles} = useContext(ProfileContext);
  const [newProfiles, setNewProfiles] = useState([] as any)
  useEffect(() => {
    let profilesCopy = [...profiles];
    profilesCopy = profilesCopy.map((profile, i) => {
      let newProfile = {...profile, key: i};
      return newProfile;
    })
    setNewProfiles(profilesCopy)
    
  },[profiles])

  const handleCloseModel = () => {
    let profilesCopy = [...newProfiles]
    profilesCopy.map(profile => {
      profile.status = 'unfulfilled'
      return profile
    })
    setNewProfiles(profilesCopy);
    onClose()
  }

  return(
    <Modal
      title="Setting"
      visible={isVisible}
      onCancel={handleCloseModel}
      footer={[
        <Button key="1" type="danger" onClick={handleCloseModel}>Close</Button>
      ]}
    >
     <TableCustom 
      data = {newProfiles}
      onDeploy = {(profile: Profile, index: number) => {
        onDeploy(profile, index)
        const dataDeploy = {profile, portal: portal.layout.props.tabList}
        let profilesCopy = [...newProfiles]
        profilesCopy[index].status = 'unfulfilled'
        setNewProfiles(profilesCopy);
        
         ipcRenderer.sendSync('request-to-kintone', dataDeploy);
         profilesCopy[index].status = 'done'
         setNewProfiles(profilesCopy);
      }}
      />
    </Modal>
  )
}

export default DeployModal