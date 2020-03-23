import React from 'react'
import TabsLayout from './layout/TabsLayout'

const PortalPreview = ({ 
  layout,
  onAddTabs = (item: any) => {},
  onRemoveTabs = (layout: Layout) => {} 
}: {
  layout?: Layout,
  onAddTabs: (item: any) => void,
  onRemoveTabs: (layout: Layout) => void
}) => {

  return(
    <div style={{display: 'flex', justifyContent:'center', paddingTop: '30px'}}>
      {
        layout &&
        <TabsLayout
          onAddItem={onAddTabs}
          onRemoveItem={(index: number) => {
            const newLayout = JSON.parse(JSON.stringify(layout))
            newLayout.props.tabList.splice(index, 1)
            onRemoveTabs(newLayout)
          }}
          items={layout.props.tabList}
        />
      }
      
    </div>
  )
}

export default PortalPreview