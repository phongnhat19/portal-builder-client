import React from 'react'
import {Modal, Button} from 'antd'
import TableCustom from './TableCustom'
import {ItemTable} from './Type'

type DeployModal = {
  isVisible: boolean
  onClose?: () => void
  onDeploy: (data: ItemTable) => void
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