import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { SCHEDULE_VIEW } from './constant';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import SettingsIframeWidget from '../IframeWidget/Settings';
import ScheduleModal from './ScheduleModal';

const ScheduleWidget = ({ onSaveSetting, defaultView = SCHEDULE_VIEW.FULL_CALENDAR_DAY_TIME, onRemove, showSettingInit = false }: {
  defaultView?: string
  onRemove?: () => void
  showSettingInit?: boolean
  onSaveSetting?: ({ defaultView }: { defaultView: string }) => void
}) => {

  const [showSetting, setShowSetting] = useState(showSettingInit)
  const [typeView, setTypeView] = useState(defaultView)
  
  return (
    <React.Fragment>
      <SettingsIframeWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} />
      <FullCalendar
        header={{
          left: `prev,next ${SCHEDULE_VIEW.FULL_CALENDAR_DAY_TIME}, ${SCHEDULE_VIEW.FULL_CALENDAR_WEEK_TIME}`,
          center: 'title',
          right: ''
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        defaultView={typeView}
        events={
          [{
            title: 'event3',
            start: new Date('2020-03-24T09:00:00'),
            end: new Date('2020-03-24T11:00:00'),
            url: 'https://github.com/fullcalendar/fullcalendar',
          }]
        }
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

    </React.Fragment>
  )
}

export default ScheduleWidget