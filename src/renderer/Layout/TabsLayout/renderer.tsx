import React, { useState, useEffect, useLayoutEffect } from 'react'
import {Tabs} from '@kintone/kintone-ui-component';
import './style.css'
import Iframe from '../../Widget/IframeWidget/renderer';
import { EMPTY_WIDGET_CONTENT } from './constant';
import HTML from '../../Widget/HTMLWidget/renderer';
import Schedule from '../../Widget/SchedulerWidget/renderer';
import Notify from '../../Widget/NotifyWidget/renderer';
import { CONTENT_TYPE } from '../../Widget/constant';

let portalSpaceEl: HTMLElement
let defaultPortalBodyEl: ChildNode | null

const TabsLayout = ({
  tabList = []
} : {
  tabList?: Tab[]
}) => {

  const buildTabItems = (initItems: Tab[]) => {
    let dataItems = [] as any[];
    initItems.forEach(item => {
      
      let newItem = {
        tabName: item.tabName,
        tabContent: '' as any
      }
      const tabContent = item.tabContent;
      if (!tabContent) return;
      switch (tabContent.type) {
        case CONTENT_TYPE.IFRAME:
          if (!tabContent.props) {
            break;
          }
          const tabContentIframe = tabContent.props as IframeWidgetProps;
          newItem.tabContent = 
            <Iframe
              url={tabContentIframe.url}
              width={tabContentIframe.width}
              height={tabContentIframe.height}
            />
          break;

        case CONTENT_TYPE.HTML:
          if (!tabContent.props) {
            break;
          };
          const tabContentHTML = tabContent.props as HTMLWidgetProps;
          newItem.tabContent = 
            <HTML
              htmlString={tabContentHTML.htmlString}
              width={tabContentHTML.width}
              height={tabContentHTML.height}
            />
          break;
        case CONTENT_TYPE.SCHEDULER:
          if (!tabContent.props) {
            break;
          };
          const tabContentSchedule = tabContent.props as SchedulerWidgetProps;
          newItem.tabContent = 
          <Schedule
            defaultView={tabContentSchedule.defaultView}
          />
          break;
        case CONTENT_TYPE.NOTIFY:
          if (!tabContent.props) {
            break;
          };
          newItem.tabContent = <Notify />
          break;
        case CONTENT_TYPE.EMPTY:
          newItem.tabContent = EMPTY_WIDGET_CONTENT
        default:
          newItem.tabContent = <div id="default-portal"></div>
          break;
      }
      dataItems = [...dataItems, newItem]
    })

    return dataItems
  }

  const [selectedTab, setSelectedTab] = useState(0)
  const [tabItems, setTabItems] = useState(buildTabItems(tabList))

  useLayoutEffect(() => {
    if (!portalSpaceEl) {
      portalSpaceEl = kintone.portal.getContentSpaceElement();
      defaultPortalBodyEl = portalSpaceEl.nextSibling;
    }
    if (defaultPortalBodyEl) document.getElementById('default-portal')?.appendChild(defaultPortalBodyEl)
  }, [])

  useEffect(() => {
    if (selectedTab === 0) {
      const tabContentDOM = document.getElementsByClassName('kuc-tabs-tab-contents')[0] as HTMLElement
      if (tabContentDOM) tabContentDOM.style.backgroundColor = 'transparent'
      if (defaultPortalBodyEl) document.getElementById('default-portal')?.appendChild(defaultPortalBodyEl)
    }
  }, [selectedTab]);

  return(
    <div 
      className='portal-tabs-layout'
      onDragOver={(event: React.DragEvent<HTMLDivElement>) => {event.preventDefault();}} 
    >
      <Tabs
        items={tabItems}
        value={selectedTab}
        onClickTabItem={setSelectedTab}
      />
    </div>
  )
}

export default TabsLayout