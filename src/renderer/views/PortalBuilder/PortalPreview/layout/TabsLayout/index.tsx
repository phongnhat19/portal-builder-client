import React, { useState, useEffect, useContext } from 'react'
import {Tabs} from '@kintone/kintone-ui-component';
import { Button } from 'antd';
import { PlusCircleOutlined , MinusCircleOutlined, ExclamationCircleOutlined, HighlightOutlined} from '@ant-design/icons';
import '../style.css'
import { TabContentType } from '../../../Type';
import { TabsLayoutProps, IframeWidgetProps, HTMLWidgetProps, Tab } from '../../Type';
import IframeWidget from '../../../Widget/IframeWidget';
import { PortalContext } from '../../..';
import confirm from 'antd/lib/modal/confirm';
import { CONFIRM_DELETE, IFRAME_WIDGET, PORTAL_DEFAULT, HTML_WIDGET } from './constant';
import TabConfigModal from './TabConfigModal';
import HTMLWidget from '../../../Widget/HTMLWidget';

const TabsLayout = ({
  items = [],
  onAddItem = () => {},
  onRemoveItem = () => { }
} : TabsLayoutProps) => {

  const [selectedTab, setSelectedTab] = useState(0)
  const [isShowTabNameModal, showTabNameModal] = useState(false)
  const [inited, setInited] = useState(false)
  const [tabItems, setTabItems] = useState([] as any[])
  const {portalList, setPortalList, selectedPortal} = useContext(PortalContext)
  const [isShowTabConfigModal, showTabConfigModal] = useState(false)

  const buildTabItems = (initItems: Tab[]) => {
    let dataItems = [] as any[];
    initItems.forEach(item => {
      let newItem = {
        tabName: item.tabName,
        tabContent: PORTAL_DEFAULT.TAB_CONTENT_INIT as any
      }
      const tabContent = item.tabContent;
      if (!tabContent) return;
      switch (tabContent.type) {
        case TabContentType.IFRAME:
          if (!tabContent.props) {
            newItem.tabContent = IFRAME_WIDGET.TAB_CONTENT_INIT
            break;
          }
          const tabContentIframe = tabContent.props as IframeWidgetProps;
          newItem.tabContent = 
            <IframeWidget 
              url={tabContentIframe.url}
              width={tabContentIframe.width}
              height={tabContentIframe.height}
              showSettingInit={tabContentIframe.showSettingInit}
              onRemove={removeWidget}
              onSaveSetting={({url}) => {
                let currentProps = JSON.parse(JSON.stringify(tabContent.props))
                currentProps.url = url
                currentProps.showSettingInit = false;
                updateWidget(currentProps)
              }}
            />
          break;

        case TabContentType.HTML:
          if (!tabContent.props) {
            newItem.tabContent = HTML_WIDGET.TAB_CONTENT_INIT
            break;
          };
          const tabContentHTML = tabContent.props as HTMLWidgetProps;
          newItem.tabContent = 
            <HTMLWidget 
              htmlString={tabContentHTML.htmlString}
              width={tabContentHTML.width}
              height={tabContentHTML.height}
              showSettingInit={tabContentHTML.showSettingInit}
              onRemove={removeWidget}
              onSaveSetting={({htmlString}) => {
                let currentProps = JSON.parse(JSON.stringify(tabContent.props))
                currentProps.htmlString = htmlString
                currentProps.showSettingInit = false;
                updateWidget(currentProps)
              }}
            />
        default:
          break;
      }
      dataItems = [...dataItems, newItem]
    })

    return dataItems
  }

  const removeWidget = () => {
    confirm({
      title: CONFIRM_DELETE.TITLE,
      icon: <ExclamationCircleOutlined />,
      okText: CONFIRM_DELETE.BUTTON_OK,
      okType: 'danger',
      cancelText: CONFIRM_DELETE.BUTTON_CANCEL,
      onOk() {
        const tabList = portalList[selectedPortal].layout.props.tabList
        delete tabList[selectedTab].tabContent['props']
        setPortalList(portalList)
      }
    })
  }

  const updateWidget = (newProps: IframeWidgetProps | HTMLWidgetProps) => {
    const tabList = portalList[selectedPortal].layout.props.tabList
    tabList[selectedTab].tabContent.props = newProps
    setPortalList(portalList)
  }

  useEffect(() => {
    if (inited) {
      setSelectedTab(items.length - 1)
    } else {
      setInited(true)
    }
  }, [items.length])

  useEffect(() => {
    setTabItems(buildTabItems(items))
  },[items, selectedTab])

  const dropWidget = (tabIndex: number, type: TabContentType, props: any) => {

    const currentTab = portalList[selectedPortal].layout.props.tabList[tabIndex]

    if (currentTab.tabContent.type !== TabContentType.DEFAULT){
      currentTab.tabContent = {
        type: type,
        name: 'New Tab',
        props
      }
      setPortalList(portalList)
    } 
  }

  return(
    <div 
      className='portal-tabs-layout'
      onDragOver={(event: React.DragEvent<HTMLDivElement>) => {event.preventDefault();}} 
      onDrop={(e) => {
        let props: any
        const type = e.dataTransfer.getData("text") as TabContentType
        if (type === TabContentType.IFRAME) {
          props = {
            showSettingInit: true,
            url: "",
            width: "100%",
            height: "82vh"
          }
        } else if (type === TabContentType.HTML) {
          props = {
            showSettingInit: true,
            htmlString: "",
            width: "100%",
            height: "82vh"
          }
        }
        props && dropWidget(selectedTab, type, props)
      }}
    >
      <Button
        type="default"
        icon={<PlusCircleOutlined />}
        className='portal-tabs-btn portal-tabs-btn-add'
        onClick={() => {
          showTabConfigModal(true)
        }} 
      />
      {selectedTab !== 0 &&
        <Button
          type="default"
          icon={<HighlightOutlined />}
          className='portal-tabs-btn portal-tabs-btn-edit-name'
          onClick={() => {
            showTabNameModal(true)
          }} 
        />  
      }
        {tabItems.length > 1 &&
          <Button
            type="default"
            icon={<MinusCircleOutlined />}
            className='portal-tabs-btn portal-tabs-btn-sub'
            onClick={() => {
              if (selectedTab === 0) return;
              const newSelectedTab = selectedTab - 1;
              setSelectedTab(newSelectedTab)
              onRemoveItem(selectedTab)
            }} 
          />
        }
      <Tabs
        items={tabItems}
        value={selectedTab}
        onClickTabItem={setSelectedTab}
      />
      <TabConfigModal 
        isVisible={isShowTabConfigModal}
        onClose={()=> showTabConfigModal(false)}
        onSave={(name) => {
          const tab = {
            tabName: name,
            tabContent: {
              type: TabContentType.IFRAME,
              name: "Iframe"
            }
          }
          onAddItem(tab)
          showTabConfigModal(false)
        }}
      />
      <TabConfigModal 
        tabName={items[selectedTab].tabName}
        isVisible={isShowTabNameModal}
        onClose={()=> showTabNameModal(false)}
        onSave={(name) => {
          const portalListClone = JSON.parse(JSON.stringify(portalList))
          portalListClone[selectedPortal].layout.props.tabList[selectedTab].tabName = name
          setPortalList(portalListClone)
          showTabNameModal(false)
        }}
      />
    </div>
  )
}

export default TabsLayout