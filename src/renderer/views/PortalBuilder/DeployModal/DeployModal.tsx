import React, {useContext, useState, useEffect} from 'react'
import {ProfileContext} from '../../../App'
import {Modal, Button} from 'antd'
import TableCustom from './TableCustom'
import {ipcRenderer} from 'electron'
import { LAYOUT_TYPE } from '..';

const DeployModal = ({isVisible = false, onClose = () => {}, onDeploy, portal}: {
  isVisible: boolean
  onClose?: () => void
  onDeploy: (data: Profile, index: number) => void
  portal: Portal
}) => {
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
        data={newProfiles}
        onDeploy={(profile: Profile, index: number) => {
          onDeploy(profile, index)
          const dataDeploy = { 
            profile,
            portal: portal, 
            index: index 
          }
          
          let profilesCopy = [...newProfiles]
          ipcRenderer.send('request-to-kintone', dataDeploy)

          const listener = (event: Electron.IpcRendererEvent, response: any) => {
            profilesCopy[response.index].status = response.status
            setNewProfiles(profilesCopy);
            ipcRenderer.removeListener('kintone-reply', listener)
          }

          ipcRenderer.on('kintone-reply', listener)
        }}
      />
    </Modal>
  )
}

export default DeployModal