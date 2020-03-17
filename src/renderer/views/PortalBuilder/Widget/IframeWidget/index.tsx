import React, { useState, useContext } from 'react';
import SettingsIframeWidget from './Settings';

const IframeWidget = ({ tabContent, style, onClickMenuWidgetSettings = () => { } }: {
  tabContent?: any,
  style?: any,
  onClickMenuWidgetSettings?: (event: any) => void;
}) => {

  return (
    <React.Fragment>
      <div>
        <SettingsIframeWidget onClickMenuWidgetSettings={onClickMenuWidgetSettings} />
        <iframe src={tabContent.props.url} style={style} />
      </div>
    </React.Fragment>

  )
}

export default IframeWidget;