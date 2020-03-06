import React, { useState } from 'react'
import {Tabs} from '@kintone/kintone-ui-component';
import QuickReport from './QuickReport'

type Tabs = {
  tabName: string,
  tabContent: {
    type: 'Widget' | 'HTML' | 'string',
    name?: string,
    props?: object,
    value?: string
  }
}

const TabsLayout = ({items = []}: {
  items?: Tabs[]
}) => {

  const [selectedTab, setSelectedTab] = useState(0)
  const [tabItems, setTabItems] = useState([
    {
      tabName: 'Company Location',
      tabContent: <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC6NGlXCyiz7CbeJAb1RA6bUsWN6YWaK8Q&q=Centre+Point+Tower" style={{width: '100%', height: '600px'}} />
    },
    {
      tabName: 'Quick Report',
      tabContent: <QuickReport />
    },
    {
      tabName: 'Gmail',
      tabContent: 'Gmail'
    }
  ])

  return(
    <Tabs
      items={tabItems}
      value={selectedTab}
      onClickTabItem={setSelectedTab}
    />
  )
}

export default TabsLayout