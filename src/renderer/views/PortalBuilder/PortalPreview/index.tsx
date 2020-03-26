import React from 'react'
import TabsLayout from './layout/TabsLayout'
import {LAYOUT_TYPE} from '../index'
import GridLayout from './layout/GridLayout'

const PortalPreview = ({ 
  layout
}: {
  layout?: Layout
}) => {

  const renderLayout = () => {
    if (layout!.type === LAYOUT_TYPE.TAB) {
      const props = layout!.props as TabLayout
      return (
        <TabsLayout
          items={props.tabList}
        />
      )
    } else if (layout!.type === LAYOUT_TYPE.GRID) {
      const props = layout!.props as GridLayout
      return (
        <GridLayout items={props.rows} />
      )
    }
  }

  return(
    <div style={{display: 'flex', justifyContent:'center', paddingTop: '30px'}}>
      {
        layout && renderLayout()
      }
      
    </div>
  )
}

export default PortalPreview