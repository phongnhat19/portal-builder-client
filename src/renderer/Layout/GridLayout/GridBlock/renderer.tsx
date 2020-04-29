import React, {CSSProperties, useState, useEffect} from 'react';
import {Row} from 'antd';

import IframeWidget from '../../../Widget/IframeWidget/renderer';
import HTMLWidget from '../../../Widget/HTMLWidget/renderer';
import SchedulerWidget from '../../../Widget/SchedulerWidget/renderer';
import GNotify from '../../../Widget/GNotifyWidget/renderer';
import {EMPTY_WIDGET_CONTENT} from '../../TabsLayout/constant';
import {CONTENT_TYPE} from '../../../Widget/constant';
import WeatherComponent from '../../../Widget/WeatherWidget/renderer';
import GmailWidget from '../../../Widget/GmailWidget/renderer';

const GridBlock = ({style, type = CONTENT_TYPE.EMPTY as ContentType, content = undefined, width}: {
  style?: CSSProperties;
  type?: ContentType;
  content?: IframeWidgetProps | HTMLWidgetProps | SchedulerWidgetProps | GmailWidgetProps;
  width: number;
}) => {

  let finalStyle: CSSProperties = {
    width: `${width}%`
  };

  if (style) {
    finalStyle = {...finalStyle, ...style};
  }

  const [blockContent, setBlockContent] = useState(null);

  useEffect(() => {
    const buildContent = () => {
      let currentContentBlock = EMPTY_WIDGET_CONTENT as any;

      if (!content) return;
      switch (type) {
        case CONTENT_TYPE.IFRAME: {
          const blockContentIframe = content as IframeWidgetProps;

          currentContentBlock =
            (<IframeWidget
              url={blockContentIframe.url}
              width={blockContentIframe.width}
              height={blockContentIframe.height}
            />);
          break;
        }
        case CONTENT_TYPE.HTML: {
          const blockContentHTML = content as HTMLWidgetProps;
          currentContentBlock =
            (<HTMLWidget
              htmlString={blockContentHTML.htmlString}
              width={`${blockContentHTML.width}%`}
            />);
          break;
        }
        case CONTENT_TYPE.SCHEDULER: {
          const blockContentSchedule = content as SchedulerWidgetProps;
          currentContentBlock =
            (<SchedulerWidget
              defaultView={blockContentSchedule.defaultView}
            />);
          break;
        }
        case CONTENT_TYPE.GMAIL: {

          const blockContentHTML = content as GmailWidgetProps;
          currentContentBlock = <GmailWidget apiKey={blockContentHTML.apiKey} clientID={blockContentHTML.clientID} />;
          break;
        }
        case CONTENT_TYPE.GAROON_NOTIFY:
          currentContentBlock = <GNotify data={[]} />;
          break;
        case CONTENT_TYPE.WEATHER: {
          const blockContentWeather = content as WeatherWidgetProps;
          currentContentBlock =
              (<WeatherComponent
                unitTemp={blockContentWeather.unitTemp}
                weatherCity={blockContentWeather.weatherCity}
                openWeatherMapAPIKey={blockContentWeather.openWeatherMapAPIKey}
                type={blockContentWeather.type}
              />);
          break;
        }
        case CONTENT_TYPE.EMPTY:
          currentContentBlock = '';
      }
      return currentContentBlock;
    };
    setBlockContent(buildContent());
  }, [content, type]);

  return (
    <div
      style={finalStyle}
      className="grid-block grid-block-template"
    >
      <Row className="grid-block-position-relative">
        {blockContent}
      </Row>
    </div>
  );
};

export default GridBlock;