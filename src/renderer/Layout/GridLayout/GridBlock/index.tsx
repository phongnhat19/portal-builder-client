import React, {CSSProperties, useCallback, useContext, useState, useEffect} from 'react';
import '../style.css';
import {ExclamationCircleOutlined, CloseOutlined} from '@ant-design/icons';
import {Button, Popconfirm, Row} from 'antd';
import {PortalContext} from '../../../views/PortalBuilder';
import {SCHEDULER_VIEW} from '../../../Widget/SchedulerWidget/constant';
import IframeWidget from '../../../Widget/IframeWidget';
import HTMLWidget from '../../../Widget/HTMLWidget';
import GmailWidget from '../../../Widget/GmailWidget';
import ScheduleWidget from '../../../Widget/SchedulerWidget';
import GNotifyWidget from '../../../Widget/GNotifyWidget';
import {EMPTY_WIDGET_CONTENT, CONFIRM_DELETE} from '../../TabsLayout/constant';
import confirm from 'antd/lib/modal/confirm';
import {CONTENT_TYPE} from '../../../Widget/constant';
import {WEATHER_UNIT, WEATHER_TYPE} from '../../../Widget/WeatherWidget/constant';
import WeatherWidget from '../../../Widget/WeatherWidget';
import AppSpaceWidget from '../../../Widget/AppSpaceListWidget';

const GridBlock = ({style, content = undefined, width, rowIndex, blockIndex, onRemoveBlock, onResizeWidth}: {
  style?: CSSProperties;
  content?: IframeWidgetProps | HTMLWidgetProps | SchedulerWidgetProps | AppSpaceWidgetProps | GmailWidgetProps | WeatherWidgetProps;
  width: number;
  rowIndex: number;
  blockIndex: number;
  onRemoveBlock?: () => void;
  onResizeWidth: (item: {width: number}) => void;
}) => {

  let finalStyle: CSSProperties = {
    width: `${width}%`
  };

  if (style) {
    finalStyle = {...finalStyle, ...style};
  }

  const {portalList, setPortalList, selectedPortal} = useContext(PortalContext);
  const [blockContent, setBlockContent] = useState(null);
  const [isResize, setIsReSize] = useState(false);
  const [blockElement, setBlockElement] = useState<HTMLDivElement>();
  const blockRef = useCallback((node: HTMLDivElement) => {
    node && setBlockElement(node);
  }, []);

  const dropWidget = (dropRowIndex: number, dropBlockIndex: number, type: ContentType, props: any) => {
    const gridLayout = portalList[selectedPortal].layout.props as GridLayout;
    const currentBlock = gridLayout.rows[dropRowIndex].blocks[dropBlockIndex];
    if (currentBlock.type === CONTENT_TYPE.EMPTY) {
      currentBlock.type = type;
      currentBlock.content = props;
      setPortalList(portalList);
    }
  };

  useEffect(() => {
    const updateWidget = (newProps: IframeWidgetProps | HTMLWidgetProps | SchedulerWidgetProps | WeatherWidgetProps | GmailWidgetProps) => {
      const gridLayout = portalList[selectedPortal].layout.props as GridLayout;
      const currentBlock = gridLayout.rows[rowIndex].blocks[blockIndex];
      currentBlock.content = newProps;
      setPortalList(portalList);
    };

    const removeWidget = () => {
      confirm({
        title: CONFIRM_DELETE.TITLE,
        icon: <ExclamationCircleOutlined />,
        okText: CONFIRM_DELETE.BUTTON_OK,
        okType: 'danger',
        cancelText: CONFIRM_DELETE.BUTTON_CANCEL,
        onOk() {
          const gridLayout = portalList[selectedPortal].layout.props as GridLayout;
          const currentBlock = gridLayout.rows[rowIndex].blocks[blockIndex];
          currentBlock.type = CONTENT_TYPE.EMPTY as ContentType;
          delete currentBlock.content;
          setPortalList(portalList);
        }
      });
    };
    const buildContent = () => {
      const gridLayout = portalList[selectedPortal].layout.props as GridLayout;
      const currentBlock = gridLayout.rows[rowIndex].blocks[blockIndex];
      let currentContentBlock = EMPTY_WIDGET_CONTENT as any;

      if (!currentBlock) return currentContentBlock;
      switch (currentBlock.type) {
        case CONTENT_TYPE.IFRAME: {
          if (!currentBlock.content) {
            break;
          }
          const blockContentIframe = currentBlock.content as IframeWidgetProps;

          currentContentBlock =
            (<IframeWidget
              defaultTitle={blockContentIframe.defaultTitle}
              url={blockContentIframe.url}
              width={blockContentIframe.width}
              height={blockContentIframe.height}
              showSettingInit={blockContentIframe.showSettingInit}
              onRemove={removeWidget}
              onSaveSetting={({url, width: nextWidth, height, title}) => {
                const currentProps = JSON.parse(JSON.stringify(currentBlock.content));
                currentProps.url = url;
                currentProps.width = nextWidth;
                currentProps.height = height;
                currentProps.showSettingInit = false;
                currentProps.defaultTitle = title;
                updateWidget(currentProps);
              }}
            />);
          break;
        }
        case CONTENT_TYPE.GMAIL: {
          if (!currentBlock.content) {
            break;
          }
          const blockContentGmail = currentBlock.content as GmailWidgetProps;
          currentContentBlock = (<GmailWidget
            clientID={blockContentGmail.clientID}
            apiKey={blockContentGmail.apiKey}
            onRemove={removeWidget}
            onSaveSetting={(settings) => {
              const currentProps = JSON.parse(JSON.stringify(currentBlock.content));
              currentProps.apiKey = settings.apiKey;
              currentProps.clientID = settings.clientID;
              updateWidget(currentProps);
            }}
          />);
          break;
        }
        case CONTENT_TYPE.HTML: {
          if (!currentBlock.content) {
            break;
          }
          const blockContentHTML = currentBlock.content as HTMLWidgetProps;
          currentContentBlock =
          (<HTMLWidget
            htmlString={blockContentHTML.htmlString}
            htmlTitle={blockContentHTML.htmlTitle}
            width={`${blockContentHTML.width}%`}
            showSettingInit={blockContentHTML.showSettingInit}
            onRemove={removeWidget}
            onSaveSetting={({htmlString, htmlTitle}) => {
              const currentProps = JSON.parse(JSON.stringify(currentBlock.content));
              currentProps.htmlString = htmlString;
              currentProps.showSettingInit = false;
              currentProps.htmlTitle = htmlTitle;
              updateWidget(currentProps);
            }}
          />);
          break;
        }
        case CONTENT_TYPE.SCHEDULER: {
          if (!currentBlock.content) {
            break;
          }
          const blockContentSchedule = currentBlock.content as SchedulerWidgetProps;
          currentContentBlock =
          (<ScheduleWidget
            width={`${blockContentSchedule.width}%`}
            defaultView={blockContentSchedule.defaultView}
            onRemove={removeWidget}
            onSaveSetting={({defaultView}) => {
              const currentProps = JSON.parse(JSON.stringify(currentBlock.content));
              currentProps.defaultView = defaultView;
              currentProps.showSettingInit = false;
              updateWidget(currentProps);
            }}
          />);
          break;
        }
        case CONTENT_TYPE.GAROON_NOTIFY:
          if (!currentBlock.content) {
            break;
          }
          currentContentBlock =
            <GNotifyWidget onRemove={removeWidget} />;
          break;
        case CONTENT_TYPE.WEATHER: {
          if (!currentBlock.content) break;
          const blockContentWeather = currentBlock.content as WeatherWidgetProps;
          currentContentBlock =
          (<WeatherWidget
            type={blockContentWeather.type}
            showSettingInit={blockContentWeather.showSettingInit}
            unitTemp={blockContentWeather.unitTemp}
            openWeatherMapAPIKey={blockContentWeather.openWeatherMapAPIKey}
            weatherCity={blockContentWeather.weatherCity}
            onRemove={removeWidget}
            onSaveSetting={({unitTemp, weatherCity, openWeatherMapAPIKey, type}) => {
              const currentProps = JSON.parse(JSON.stringify(currentBlock.content));
              currentProps.unitTemp = unitTemp;
              currentProps.weatherCity = weatherCity;
              currentProps.openWeatherMapAPIKey = openWeatherMapAPIKey;
              currentProps.showSettingInit = false;
              currentProps.type = type;
              updateWidget(currentProps);
            }}
          />);
          break;
        }
        case CONTENT_TYPE.APP_SPACE: {
          if (!currentBlock.content) break;
          const blockContentAppSpace = currentBlock.content as AppSpaceWidgetProps;
          currentContentBlock = (
            <AppSpaceWidget
              widgetTitle={blockContentAppSpace.widgetTitle}
              contentList={blockContentAppSpace.contentList}
              showSettingInit={blockContentAppSpace.showSettingInit}
              onRemove={removeWidget}
              onSaveSetting={({contentList, widgetTitle}) => {
                const currentProps = JSON.parse(JSON.stringify(currentBlock.content));
                currentProps.contentList = contentList;
                currentProps.widgetTitle = widgetTitle;
                currentProps.showSettingInit = false;
                updateWidget(currentProps);
              }}
            />
          );
          break;
        }
        case CONTENT_TYPE.EMPTY:
          currentContentBlock = EMPTY_WIDGET_CONTENT;
      }
      return currentContentBlock;
    };

    setBlockContent(buildContent());
  }, [blockIndex, content, portalList, rowIndex, selectedPortal, setPortalList]);

  useEffect(()=> {
    const handleMouseUp = () => {
      if (isResize) {
        onResizeWidth({width: blockElement!.offsetWidth});
        setIsReSize(false);
      }
    };

    blockElement && blockElement.addEventListener('resize', handleMouseUp);
    return () => {
      blockElement && blockElement.removeEventListener('resize', handleMouseUp);
    };
  }, [isResize, onResizeWidth, blockElement]);

  return (
    <div
      role="presentation"
      ref={blockRef}
      style={finalStyle}
      className="grid-block"
      onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
      }}
      onMouseDown={() => setIsReSize(true)}
      onDrop={(e) => {
        let props: any;
        const type = e.dataTransfer.getData('text') as ContentType;
        if (type === CONTENT_TYPE.IFRAME) {
          props = {
            showSettingInit: true,
            url: '',
            width: '100%',
            height: '82vh'
          };
        } else if (type === CONTENT_TYPE.GMAIL) {
          props = {
            showSettingInit: true,
            apiKey: '',
            clientID: ''
          };
        } else if (type === CONTENT_TYPE.HTML) {
          props = {
            showSettingInit: true,
            htmlString: '',
            width: 100
          };
        } else if (type === CONTENT_TYPE.SCHEDULER) {
          props = {
            showSettingInit: true,
            defaultView: SCHEDULER_VIEW.FULL_CALENDAR_DAY_TIME,
            width: 100
          };
        } else if (type === CONTENT_TYPE.GAROON_NOTIFY) {
          props = {
            showSettingInit: false,
            width: 100
          };
        } else if (type === CONTENT_TYPE.WEATHER) {
          props = {
            showSettingInit: true,
            unitTemp: WEATHER_UNIT.CELCIUS,
            weatherCity: '',
            openWeatherMapAPIKey: '',
            type: WEATHER_TYPE.SIMPLE
          };
        } else if (type === CONTENT_TYPE.APP_SPACE) {
          props = {
            showSettingInit: true,
          };
        }

        props && dropWidget(rowIndex, blockIndex, type, props);
      }}
    >
      <Row>
        <Popconfirm
          title="Are you sure to delete this block?"
          onConfirm={onRemoveBlock}
          okText="Yes"
          cancelText="No"
        >
          <Button
            shape="circle"
            type="danger"
            icon={<CloseOutlined />}
            className="grid-layout-btn-remove"
            onMouseUp={(event) => {
              event.stopPropagation();
            }}
          />
        </Popconfirm>
      </Row>
      <Row className="grid-block-position-relative">
        {blockContent}
      </Row>
    </div>
  );
};

export default GridBlock;