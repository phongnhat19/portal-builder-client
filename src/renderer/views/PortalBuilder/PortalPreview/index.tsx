import React from 'react'
import TabsLayout from './layout/TabsLayout'
import {Layout} from '../Type'

const PortalPreview = ({ 
  layout,
  onAddTabs = (item: any) => {},
  onRemoveTabs = (layout: Layout) => {} 
}: {
  layout: Layout,
  onAddTabs: (item: any) => void,
  onRemoveTabs: (layout: Layout) => void
}) => {

  return(
    <div style={{display: 'flex', justifyContent:'center', paddingTop: '30px'}}>
      <TabsLayout 
        // selectedTab={selectedTab}
        onAddItem={onAddTabs}
        onRemoveItem={(index) => {
          const newLayout = JSON.parse(JSON.stringify(layout))
          newLayout.props.tabList.splice(index, 1)
          onRemoveTabs(newLayout)
        }}
        items={layout.props.tabList}
        // onSelectedTabItem = {(index: number) => {setTabIndexPreview(index)}}
      />
    </div>
  )
}

export default PortalPreview