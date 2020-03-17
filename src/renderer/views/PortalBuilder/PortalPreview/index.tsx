import React from 'react'
import TabsLayout from './layout/TabsLayout'
const PortalPreview = ({ 
  tabIndexPreview = 0,
  layout = {},
  onTabPreview = () => {},
  onAddItemTabs = () => {},
  onRemoveItemTabs = () => {} }: any) => {

  return(
    <div style={{display: 'flex', justifyContent:'center', paddingTop: '30px'}}>
      <TabsLayout 
        tabIndexPreview = {tabIndexPreview}
        onAddItem={onAddItemTabs}
        onRemoveItem={(index) => {
          const newLayout = JSON.parse(JSON.stringify(layout))
          newLayout.props.tabList.splice(index, 1)
          onRemoveItemTabs(newLayout)
        }}
        items={layout.props.tabList}
        onSelectedTabItem = {onTabPreview}
      />
    </div>
  )
}

export default PortalPreview