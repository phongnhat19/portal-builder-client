import React, { useState } from 'react'
import { SCHEDULE_VIEW } from './constant';
import SettingsIframeWidget from '../IframeWidget/Settings';
import ScheduleModal from './ScheduleModal';
import Schedule from './renderer'

const ScheduleWidget = ({ onSaveSetting, width, height, defaultView = SCHEDULE_VIEW.FULL_CALENDAR_DAY_TIME, onRemove, showSettingInit = false }: {
  defaultView?: string
  onRemove?: () => void
  showSettingInit?: boolean
  width?: string | number
  height?: string | number
  onSaveSetting?: ({ defaultView }: { defaultView: string }) => void
}) => {

  const [showSetting, setShowSetting] = useState(showSettingInit)
  const [typeView, setTypeView] = useState(defaultView)
  
  return (
    <div style={{width, height}}>
      <SettingsIframeWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} />
      <Schedule
        defaultView={typeView}
      />
      <ScheduleModal
        defaultView={typeView}
        isVisible={showSetting}
        onClose={() => (setShowSetting(false))}
        onSave={(item) => {
          setTypeView(item.defaultView)
          onSaveSetting && onSaveSetting({ defaultView: item.defaultView })
          setShowSetting(false)
        }} />
    </div>
  )
}

export default ScheduleWidget