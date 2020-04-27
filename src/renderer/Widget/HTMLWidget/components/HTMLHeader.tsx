import React from 'react'
import SettingsWidget from '../../components/Settings'
import { Html5Outlined } from '@ant-design/icons'
 const  HTMLHeader =({onRemove,setShowSetting,htmlTitle}:{ onRemove?: () => void;
  setShowSetting: (status:boolean) => void;
  htmlTitle: string;
})=>{
  return (
    <div className="html-header">
    <SettingsWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} className="align-vertical right-5" />
    <div className="icon align-vertical">
      <Html5Outlined />
    </div>
    <div className="title align-vertical">{htmlTitle}</div>
  </div>
  )
}

export default HTMLHeader