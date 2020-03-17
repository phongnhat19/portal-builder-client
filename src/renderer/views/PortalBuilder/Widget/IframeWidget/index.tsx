import React, { useState, useContext } from 'react';
import SettingsIframeWidget from './Settings';
import IframeModal from './IframeModal';
import { DataWidgetSettingsContext } from '../..';

const IframeWidget = ({ isVisible = false, tabContent, style, onClickMenuWidgetSettings = () => { }}: {
  tabContent?: any,
  style?: any,
  isVisible?: boolean,
  onClickMenuWidgetSettings?: (event: any) => void;
}) => {

  const {dataWidgetSettings, setWidgetSettings} = useContext(DataWidgetSettingsContext)

  return (
    <React.Fragment>
      <IframeModal
        isVisible={isVisible}
        onSave={(item) => {
          console.log('item', item);
          
          setWidgetSettings(item.url)
        }}
      />
      <div>
        <SettingsIframeWidget onClickMenuWidgetSettings={onClickMenuWidgetSettings} />
        <iframe src={tabContent.props.url} style={style} />
      </div>
    </React.Fragment>

  )
}

export default IframeWidget;