import React, { useState } from 'react'
import { Modal, Row, Col, Radio } from 'antd'
import './style.css'
import { SCHEDULE_VIEW } from './constant';

const ScheduleModal = ({ isVisible = false, onClose, onSave, defaultView }: {
  defaultView: string
  isVisible: boolean
  onSave: (item: { defaultView: string }) => void
  onClose?: () => void
}) => {

  const [typeView, setTypeView] = useState(defaultView)

  return (
    <Modal
      title="Schedule setting"
      visible={isVisible}
      okText="Save"
      onCancel={onClose}
      onOk={() => {
        onSave({
          defaultView: typeView
        })
      }}
    >
      <Row>
        <Col span={4}>
          <strong>View of calendar</strong>
        </Col>
        <Col span={20}>
          <Radio.Group onChange={(e) => { setTypeView(e.target.value) }} defaultValue={typeView}>
            <Radio.Button value={SCHEDULE_VIEW.FULL_CALENDAR_DAY_TIME}>{SCHEDULE_VIEW.DAY_VIEW}</Radio.Button>
            <Radio.Button value={SCHEDULE_VIEW.FULL_CALENDAR_WEEK_TIME}>{SCHEDULE_VIEW.WEEK_VIEW}</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
    </Modal>
  )
}

export default ScheduleModal