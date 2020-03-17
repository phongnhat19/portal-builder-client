import React from 'react'
import {Modal, Button} from 'antd'
import TableCustom from './TableCustom'
import {Profile} from '../../../App'

type DeployModal = {
  isVisible: boolean
  onClose?: () => void
  onDeploy: (data: Profile) => void
}

const DeployModal = ({isVisible = false, onClose, onDeploy}: DeployModal) => {
  return(
    <Modal
      title="Setting"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="1" type="danger" onClick={onClose}>Close</Button>
      ]}
    >
     <TableCustom onDeploy = {onDeploy}/>
    </Modal>
  )
}

export default DeployModal