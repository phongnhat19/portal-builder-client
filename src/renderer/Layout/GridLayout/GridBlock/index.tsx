import React, {CSSProperties, useRef, useContext, useState, useEffect} from 'react';
import '../style.css';
import {ExclamationCircleOutlined, CloseOutlined} from '@ant-design/icons';
import {Button, Popconfirm, Row} from 'antd';
import {PortalContext} from '../../../views/PortalBuilder';
import {SCHEDULER_VIEW} from '../../../Widget/SchedulerWidget/constant';
import IframeWidget from '../../../Widget/IframeWidget';
import HTMLWidget from '../../../Widget/HTMLWidget';
import ScheduleWidget from '../../../Widget/SchedulerWidget';
import GNotifyWidget from '../../../Widget/GNotifyWidget';
import {EMPTY_WIDGET_CONTENT, CONFIRM_DELETE} from '../../TabsLayout/constant';
import confirm from 'antd/lib/modal/confirm';
import {CONTENT_TYPE} from '../../../Widget/constant';
import {WEATHER_UNIT, WEATHER_TYPE} from '../../../Widget/WeatherWidget/constant';
import WeatherWidget from '../../../Widget/WeatherWidget';
import AppSpaceWidget from '../../../Widget/AppSpaceListWidget';


const buildContent = ({portalList,selectedPortal,rowIndex,blockIndex,removeWidget, updateWidget}:
  {portalList:Portal[],selectedPortal:number,rowIndex:number,blockIndex:number,removeWidget:()=> void; updateWidget:(currentProps:any)=> void}) => {
  const gridLayout = portalList[selectedPortal].layout.props as GridLayout
  const currentBlock = gridLayout.rows[rowIndex].blocks[blockIndex]
  let currentContentBlock = EMPTY_WIDGET_CONTENT as any

  if (!currentBlock) return;
  switch (currentBlock.type) {
    case CONTENT_TYPE.IFRAME:
      if (!currentBlock.content) {
        break;
      }
      const blockContentIframe = currentBlock.content as IframeWidgetProps;

      currentContentBlock =
        <IframeWidget
          url={blockContentIframe.url}
          width={blockContentIframe.width}
          height={blockContentIframe.height}
          showSettingInit={blockContentIframe.showSettingInit}
          onRemove={removeWidget}
          onSaveSetting={({ url, width, height }) => {
            let currentProps = JSON.parse(JSON.stringify(currentBlock.content))
            currentProps.url = url
            currentProps.width = width
            currentProps.height = height
            currentProps.showSettingInit = false;
            updateWidget(currentProps)
          }}
        />
      break;

    case CONTENT_TYPE.HTML:
      if (!currentBlock.content) {
        break;
      };
      const blockContentHTML = currentBlock.content as HTMLWidgetProps;
      currentContentBlock =
        <HTMLWidget
          htmlString={blockContentHTML.htmlString}
          width={`${blockContentHTML.width}%`}
          showSettingInit={blockContentHTML.showSettingInit}
          onRemove={removeWidget}
          onSaveSetting={({ htmlString }) => {
            let currentProps = JSON.parse(JSON.stringify(currentBlock.content))
            currentProps.htmlString = htmlString
            currentProps.showSettingInit = false;
            updateWidget(currentProps)
          }}
        />
      break;
    case CONTENT_TYPE.SCHEDULER:
      if (!currentBlock.content) {
        break;
      };
      const blockContentSchedule = currentBlock.content as SchedulerWidgetProps;
      currentContentBlock =
        <ScheduleWidget
          width={`${blockContentSchedule.width}%`}
          defaultView={blockContentSchedule.defaultView}
          onRemove={removeWidget}
          onSaveSetting={({ defaultView }) => {
            let currentProps = JSON.parse(JSON.stringify(currentBlock.content))
            currentProps.defaultView = defaultView
            currentProps.showSettingInit = false;
            updateWidget(currentProps)
          }}
        />
      break;
    case CONTENT_TYPE.GAROON_NOTIFY:
      if (!currentBlock.content) {
        break;
      };
      currentContentBlock =
      <GNotifyWidget onRemove={removeWidget}/>
      break;
    case CONTENT_TYPE.WEATHER:
      if (!currentBlock.content)
        break;
      const blockContentWeather = currentBlock.content as WeatherWidgetProps
      currentContentBlock =
        <WeatherWidget
          type={blockContentWeather.type}
          showSettingInit={blockContentWeather.showSettingInit}
          unitTemp={blockContentWeather.unitTemp}
          openWeatherMapAPIKey={blockContentWeather.openWeatherMapAPIKey}
          weatherCity={blockContentWeather.weatherCity}
          onRemove={removeWidget}
          onSaveSetting={({ unitTemp, weatherCity, openWeatherMapAPIKey, type}) => {
            let currentProps = JSON.parse(JSON.stringify(currentBlock.content))
            currentProps.unitTemp = unitTemp;
            currentProps.weatherCity = weatherCity;
            currentProps.openWeatherMapAPIKey = openWeatherMapAPIKey;
            currentProps.showSettingInit = false;
            currentProps.type = type;
            updateWidget(currentProps);
          }}
        />
      break;
      case CONTENT_TYPE.APP_SPACE: {
        if (!currentBlock.content) break;
        const blockContentAppSpace = currentBlock.content as AppSpaceWidgetProps;
        currentContentBlock = (
          <AppSpaceWidget
            titleWidget={blockContentAppSpace.titleWidget}
            listContent={blockContentAppSpace.listContent}
            showSettingInit={blockContentAppSpace.showSettingInit}
            onRemove={removeWidget}
            onSaveSetting={({listContent, titleWidget}) => {
              const currentProps = JSON.parse(JSON.stringify(currentBlock.content));
              currentProps.listContent = listContent;
              currentProps.titleWidget = titleWidget;
              currentProps.showSettingInit = false;
              updateWidget(currentProps);
            }}
          />
        );
        break;
      }
    
    case CONTENT_TYPE.EMPTY:
      currentContentBlock = EMPTY_WIDGET_CONTENT
    default:
      break;
  }
  return currentContentBlock
}
const GridBlock = ({style, content = undefined, width, rowIndex, blockIndex, onRemoveBlock, onResizeWidth}: {
  style?: CSSProperties;
  content?: IframeWidgetProps | HTMLWidgetProps | SchedulerWidgetProps | AppSpaceWidgetProps;
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

  const blockRef = useRef<HTMLDivElement>(null);

  const dropWidget = (rowIndex: number, blockIndex: number, type: ContentType, props: any) => {
    const gridLayout = portalList[selectedPortal].layout.props as GridLayout;
    const currentBlock = gridLayout.rows[rowIndex].blocks[blockIndex];
    if (currentBlock.type === CONTENT_TYPE.EMPTY) {
      currentBlock.type = type;
      currentBlock.content = props;
      setPortalList(portalList);
    }
  };

  const updateWidget = (newProps: IframeWidgetProps | HTMLWidgetProps | SchedulerWidgetProps | WeatherWidgetProps | AppSpaceWidgetProps) => {
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
  useEffect(() => {
    setBlockContent(buildContent({portalList,blockIndex,rowIndex,selectedPortal,updateWidget,removeWidget}));
  }, [content]);

  return (
    <div
      ref={blockRef}
      style={finalStyle}
      className="grid-block"
      onMouseUp={() => {
        onResizeWidth({width: blockRef.current!.offsetWidth});
      }}
      onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
      }}
      onDrop={(e) => {
        let props: any;
        const type = e.dataTransfer.getData('text') as ContentType;
        if (type === CONTENT_TYPE.IFRAME) {
          props = {
            showSettingInit: true,
            url: '',
            width: '100%',
            height: '100%'
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