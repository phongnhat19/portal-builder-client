import React from 'react'
import TabsLayout from './layout/TabsLayout'
const PortalPreview = ({layout = {}, onTabPreview = () => {}}: any) => {
  return(
    <div style={{display: 'flex', justifyContent:'center', paddingTop: '30px'}}>
      <TabsLayout 
        items={layout.props.tabList}
        onSelectedTabItem = {onTabPreview}
      />
    </div>
  )
}

export default PortalPreview