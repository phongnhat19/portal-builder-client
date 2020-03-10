import React from 'react'
import {Modal, Form, Select, Button} from 'antd'
import TableCustom from './TableCustom'
import {ItemTable} from './Type'

type DeployModal = {
  isVisible: boolean
  onClose?: () => void
  dataTable?: ItemTable[],
  onDeploy: (data: ItemTable) => void
}

const DeployModal = ({isVisible = false, onClose, dataTable = [], onDeploy}: DeployModal) => {
  return(
    <Modal
      title="Setting"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="1" type="danger" onClick={onClose}>Close</Button>
      ]}
    >
     <TableCustom items= {dataTable} onDeploy = {onDeploy}/>
    </Modal>
  )
}

export default DeployModal