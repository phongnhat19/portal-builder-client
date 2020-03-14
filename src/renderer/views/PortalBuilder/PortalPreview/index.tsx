import React, {useEffect} from 'react'
import TabsLayout from './layout/TabsLayout'
const PortalPreview = ({ 
  tabIndexPreview = 0,
  layout = {},
  onTabPreview = () => { },
  onAddItemTabs = (data: any) => { },
  onSubItemTabs = (data: any) => { } }: any) => {

  return(
    <div style={{display: 'flex', justifyContent:'center', paddingTop: '30px'}}>
      <TabsLayout 
        tabIndexPreview = {tabIndexPreview}
        onAddItem={onAddItemTabs}
        onSubItem={(items) => {
          const newLayout = {
            ...layout,
            props: {
              tabList : [...items]
            }
          }
          onSubItemTabs(newLayout)
        }}
        items={layout.props.tabList}
        onSelectedTabItem = {onTabPreview}
      />
    </div>
  )
}

export default PortalPreview