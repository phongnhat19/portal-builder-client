import React, { useState } from 'react'
import SettingsIframeWidget from '../IframeWidget/Settings';
import Notify from './renderer'

const NotifyWidget = ({onRemove }: {
  onRemove?: () => void
}) => {

  const [showSetting, setShowSetting] = useState(false)
  return (
    <div>
      <SettingsIframeWidget onRemove={onRemove} showSetting={() => setShowSetting(false)} />
      <Notify isPreview = {true}/>
    </div>
  )
}

export default NotifyWidget