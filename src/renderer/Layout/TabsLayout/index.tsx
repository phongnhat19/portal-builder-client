import React, {useState, useEffect, useContext, DragEvent} from 'react';
import {Tabs} from '@kintone/kintone-ui-component';
import {Button} from 'antd';
import {PlusCircleOutlined, MinusCircleOutlined, ExclamationCircleOutlined, EditOutlined} from '@ant-design/icons';
import './style.css';
import IframeWidget from '../../Widget/IframeWidget';
import {PortalContext} from '../../views/PortalBuilder';
import confirm from 'antd/lib/modal/confirm';
import {CONFIRM_DELETE, PORTAL_DEFAULT, EMPTY_WIDGET_CONTENT} from './constant';
import TabConfigModal from './TabConfigModal';
import HTMLWidget from '../../Widget/HTMLWidget';
import SchedulerWidget from '../../Widget/SchedulerWidget';
import WeatherWidget from '../../Widget/WeatherWidget/index';
import AppSpaceWidget from '../../Widget/AppSpaceWidget';

import { SCHEDULER_VIEW } from '../../Widget/SchedulerWidget/constant';
import { CONTENT_TYPE } from '../../Widget/constant';
import GNotifyWidget from '../../Widget/GNotifyWidget';
import { WEATHER_UNIT, WEATHER_TYPE } from '../../Widget/WeatherWidget/constant';

const TabsLayout = ({
  tabList = []
}: {
  tabList?: Tab[];
}) => {

  const [selectedTab, setSelectedTab] = useState(0);
  const [isShowTabNameModal, showTabNameModal] = useState(false);
  const [inited, setInited] = useState(false);
  const [tabItems, setTabItems] = useState([] as any[]);
  const {portalList, setPortalList, selectedPortal} = useContext(PortalContext);
  const [isShowTabConfigModal, showTabConfigModal] = useState(false);

  const buildTabItems = (initItems: Tab[]) => {
    let dataItems = [] as any[];
    initItems.forEach(item => {
      const newItem = {
        tabName: item.tabName,
        tabContent: PORTAL_DEFAULT.TAB_CONTENT_INIT as any
      };
      const tabContent = item.tabContent;
      if (!tabContent) return;
      switch (tabContent.type) {
        case CONTENT_TYPE.IFRAME:
          if (!tabContent.props) {
            break;
          }
          const tabContentIframe = tabContent.props as IframeWidgetProps;
          newItem.tabContent =
            (<IframeWidget
              url={tabContentIframe.url}
              width={tabContentIframe.width}
              height={tabContentIframe.height}
              showSettingInit={tabContentIframe.showSettingInit}
              onRemove={removeWidget}
              onSaveSetting={({url, height, width}) => {
                const currentProps = JSON.parse(JSON.stringify(tabContent.props));
                currentProps.url = url;
                currentProps.width = width;
                currentProps.height = height;
                currentProps.showSettingInit = false;
                updateWidget(currentProps);
              }}
            />);
          break;

        case CONTENT_TYPE.HTML:
          if (!tabContent.props) {
            break;
          }
          const tabContentHTML = tabContent.props as HTMLWidgetProps;
          newItem.tabContent =
            (<HTMLWidget
              htmlString={tabContentHTML.htmlString}
              width={tabContentHTML.width}
              height={tabContentHTML.height}
              showSettingInit={tabContentHTML.showSettingInit}
              onRemove={removeWidget}
              onSaveSetting={({htmlString}) => {
                const currentProps = JSON.parse(JSON.stringify(tabContent.props));
                currentProps.htmlString = htmlString;
                currentProps.showSettingInit = false;
                updateWidget(currentProps);
              }}
            />);
          break;
        case CONTENT_TYPE.SCHEDULER:
          if (!tabContent.props) {
            break;
          }
          const tabContentSchedule = tabContent.props as SchedulerWidgetProps;
          newItem.tabContent =
            (<SchedulerWidget
              defaultView={tabContentSchedule.defaultView}
              onRemove={removeWidget}
              onSaveSetting={({defaultView}) => {
                const currentProps = JSON.parse(JSON.stringify(tabContent.props));
                currentProps.defaultView = defaultView;
                currentProps.showSettingInit = false;
                updateWidget(currentProps);
              }}
            />);
          break;
        case CONTENT_TYPE.WEATHER:
          if (!tabContent.props) break;
          const tabContentWeather = tabContent.props as WeatherWidgetProps;
          newItem.tabContent =
            (<WeatherWidget
              type={tabContentWeather.type}
              showSettingInit={tabContentWeather.showSettingInit}
              unitTemp={tabContentWeather.unitTemp}
              openWeatherMapAPIKey={tabContentWeather.openWeatherMapAPIKey}
              weatherCity={tabContentWeather.weatherCity}
              onRemove={removeWidget}
              onSaveSetting={({unitTemp, weatherCity, openWeatherMapAPIKey, type}) => {
                const currentProps = JSON.parse(JSON.stringify(tabContent.props));
                currentProps.unitTemp = unitTemp;
                currentProps.weatherCity = weatherCity;
                currentProps.openWeatherMapAPIKey = openWeatherMapAPIKey;
                currentProps.showSettingInit = false;
                currentProps.type = type;
                updateWidget(currentProps);
              }}
            />);
          break;
        case CONTENT_TYPE.APP_SPACE:
          if (!tabContent.props)
            break;
          const tabContentAppSpace = tabContent.props as AppSpaceWidgetProps
          newItem.tabContent = <AppSpaceWidget showSettingInit={tabContentAppSpace.showSettingInit}/>
            break;
        case CONTENT_TYPE.EMPTY:
          newItem.tabContent = EMPTY_WIDGET_CONTENT;
        default:
          break;
      }
      dataItems = [...dataItems, newItem];
    });

    return dataItems;
  };

  const removeWidget = () => {
    confirm({
      title: CONFIRM_DELETE.TITLE,
      icon: <ExclamationCircleOutlined />,
      okText: CONFIRM_DELETE.BUTTON_OK,
      okType: 'danger',
      cancelText: CONFIRM_DELETE.BUTTON_CANCEL,
      onOk() {
        const tabList = (portalList[selectedPortal].layout.props as TabLayout).tabList;
        tabList[selectedTab].tabContent.type = CONTENT_TYPE.EMPTY as ContentType;
        delete tabList[selectedTab].tabContent.props;
        setPortalList(portalList);
      }
    });
  };

  const updateWidget = (newProps: IframeWidgetProps | HTMLWidgetProps | SchedulerWidgetProps | WeatherWidgetProps) => {
    const listTab = (portalList[selectedPortal].layout.props as TabLayout).tabList;
    listTab[selectedTab].tabContent.props = newProps;
    setPortalList(portalList);
  };
  const handleDropWidget = (e: DragEvent) => {
    const listTab = (portalList[selectedPortal].layout.props as TabLayout).tabList;
    if (listTab[selectedTab].tabContent.type !== CONTENT_TYPE.EMPTY) return;

    let props: any;
    const type = e.dataTransfer.getData('text') as ContentType;
    if (type === CONTENT_TYPE.IFRAME) {
      props = {
        showSettingInit: true,
        url: '',
        width: '100%',
        height: '82vh'
      };
    } else if (type === CONTENT_TYPE.HTML) {
      props = {
        showSettingInit: true,
        htmlString: '',
        width: '100%',
        height: '82vh'
      };
    } else if (type === CONTENT_TYPE.SCHEDULER) {
      props = {
        showSettingInit: true,
        defaultView: SCHEDULER_VIEW.FULL_CALENDAR_DAY_TIME
      }
    } else if (type === CONTENT_TYPE.GAROON_NOTIFY) {
      props = {
        showSettingInit: true
      }
    } else if (type === CONTENT_TYPE.WEATHER) {
      props = {
        showSettingInit: true,
        unitTemp: WEATHER_UNIT.CELCIUS,
        weatherCity: '',
        openWeatherMapAPIKey: '',
        type: WEATHER_TYPE.SIMPLE
      };
    }
    props && dropWidget(selectedTab, type, props);
  };

  useEffect(() => {
    if (inited) {
      setSelectedTab(tabList.length - 1);
    } else {
      setInited(true);
    }
  }, [inited, tabList.length]);

  useEffect(() => {
    setTabItems(buildTabItems(tabList));
  }, [tabList, selectedTab]);

  const dropWidget = (tabIndex: number, type: ContentType, props: any) => {

    const currentTab = (portalList[selectedPortal].layout.props as TabLayout).tabList[tabIndex];

    if (currentTab.tabContent.type !== CONTENT_TYPE.DEFAULT) {
      currentTab.tabContent = {
        type: type,
        name: 'New Tab',
        props
      };
      setPortalList(portalList);
    }
  };

  return (
    <div
      className='portal-tabs-layout'
      onDragOver={(event: React.DragEvent<HTMLDivElement>) => {event.preventDefault();}}
      onDrop={(e) => {
        let props: any
        const type = e.dataTransfer.getData("text") as ContentType 
        if (type === CONTENT_TYPE.IFRAME) {
          props = {
            showSettingInit: true,
            url: "",
            width: "100%",
            height: "82vh"
          }
        } else if (type === CONTENT_TYPE.HTML) {
          props = {
            showSettingInit: true,
            htmlString: "",
            width: "100%",
            height: "82vh"
          }
        } else if (type === CONTENT_TYPE.SCHEDULER) {
          props = {
            showSettingInit: true,
            defaultView: SCHEDULER_VIEW.FULL_CALENDAR_DAY_TIME
          }
        } else if (type === CONTENT_TYPE.WEATHER) {
          props = {
            showSettingInit: true,
            unitTemp: WEATHER_UNIT.CELCIUS,
            weatherCity: '',
            openWeatherMapAPIKey: '',
            type: WEATHER_TYPE.SIMPLE
          }
        }
        else if (type === CONTENT_TYPE.APP_SPACE){
          props = {
            showSettingInit: true,
          }
        }
        props && dropWidget(selectedTab, type, props)
      }}
    >
      <Button
        type="default"
        icon={<PlusCircleOutlined />}
        className="portal-tabs-btn portal-tabs-btn-add"
        onClick={() => {
          showTabConfigModal(true);
        }}
      />
      {selectedTab !== 0 &&
        <Button
          type="default"
          icon={<EditOutlined />}
          className="portal-tabs-btn portal-tabs-btn-edit-name"
          onClick={() => {
            showTabNameModal(true);
          }}
        />
      }
      {tabItems.length > 1 &&
        <Button
          type="default"
          icon={<MinusCircleOutlined />}
          className="portal-tabs-btn portal-tabs-btn-sub"
          onClick={() => {
            if (selectedTab === 0) return;
            const newSelectedTab = selectedTab - 1;
            setSelectedTab(newSelectedTab);

            const newLayout = JSON.parse(JSON.stringify(portalList[selectedPortal].layout));
            newLayout.props.tabList.splice(selectedTab, 1);
            portalList[selectedPortal].layout = newLayout;
            setPortalList(portalList);
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
              type: CONTENT_TYPE.EMPTY as ContentType
            }
          } as Tab;
          (portalList[selectedPortal].layout.props as TabLayout).tabList.push(tab);
          setPortalList(portalList);
          showTabConfigModal(false);
        }}
      />
      <TabConfigModal
        tabName={tabList[selectedTab] ? tabList[selectedTab].tabName : tabList[0].tabName}
        isVisible={isShowTabNameModal}
        onClose={()=> showTabNameModal(false)}
        onSave={(name) => {
          const portalListClone = JSON.parse(JSON.stringify(portalList));
          portalListClone[selectedPortal].layout.props.tabList[selectedTab].tabName = name;
          setPortalList(portalListClone);
          showTabNameModal(false);
        }}
      />
    </div>
  );
};

export default TabsLayout;