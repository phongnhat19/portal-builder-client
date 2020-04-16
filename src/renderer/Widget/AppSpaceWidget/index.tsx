import React, { useState } from 'react'
import AppSpaceModel from './AppSpaceModel'
const AppSpaceWidget = ({showSettingInit}:{showSettingInit?:boolean}) => {
  const [showSetting, setShowSetting] = useState(showSettingInit)

  return (
    <React.Fragment>
      <AppSpaceModel showSettingInit={showSettingInit}/>
    </React.Fragment>
  )
}

export default AppSpaceWidget