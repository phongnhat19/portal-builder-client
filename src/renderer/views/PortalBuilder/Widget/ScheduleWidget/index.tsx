import React from 'react'

const SCHEDULE_VIEW = {
  WEEK_VIEW: 'week',
  DAY_VIEW: 'day'
}

const ScheduleWidget = ({defaultView = SCHEDULE_VIEW.WEEK_VIEW}: {
  defaultView?: string
}) => {
  return(
    <div>
      ScheduleWidget
    </div>
  )
}

export default ScheduleWidget