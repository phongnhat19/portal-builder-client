import React from 'react'
import TabsLayout from './layout/TabsLayout'
const PortalPreview = ({layout = {}}: any) => {
  return(
    <div style={{display: 'flex', justifyContent:'center', paddingTop: '30px'}}>
      <TabsLayout 
        items={layout.props.tabList}
      />
    </div>
  )
}

export default PortalPreview