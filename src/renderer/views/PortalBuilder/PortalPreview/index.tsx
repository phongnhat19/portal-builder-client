import React from 'react'
import TabsLayout from './layout/TabsLayout'
const PortalPreview = ({ layout = {},
  onTabPreview = () => { },
  onAddItemTabs = (data: any) => { },
  onSubItemTabs = (data: any) => { } }: any) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
      <TabsLayout
        onAddItem={onAddItemTabs}
        onSubItem={onSubItemTabs}
        items={layout.props.tabList}
        onSelectedTabItem={onTabPreview}
      />
    </div>
  )
}

export default PortalPreview