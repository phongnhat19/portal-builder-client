import React, {useEffect} from 'react'
import TabsLayout from './layout/TabsLayout'
const PortalPreview = ({ 
  tabIndexPreview = 0,
  layout = {},
  onTabPreview = () => { },
  onAddItemTabs = (data: any) => { },
  onSubItemTabs = (data: any) => { } }: any) => {

  useEffect(() => {
    console.log(layout);
    
  }, [layout])
  return(
    <div style={{display: 'flex', justifyContent:'center', paddingTop: '30px'}}>
      <TabsLayout 
        tabIndexPreview = {tabIndexPreview}
        onAddItem={onAddItemTabs}
        onSubItem={onSubItemTabs}
        items={layout.props.tabList}
        onSelectedTabItem = {onTabPreview}
      />
    </div>
  )
}

export default PortalPreview