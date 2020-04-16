import { LAYOUT_TYPE } from './resource/constant';
import TabsLayout from '../renderer/Layout/TabsLayout/renderer'
import GridLayout from '../renderer/Layout/GridLayout/renderer'
import ReactDOM from 'react-dom'
import React from 'react';

// @ts-ignore
const portalConfig = PORTAL_CONFIG
console.log("PORTAL_CONFIG",PORTAL_CONFIG);

kintone.events.on('portal.show', function (event: any) {
  const portalSpaceEl = kintone.portal.getContentSpaceElement();

  if (portalConfig.layout.type === LAYOUT_TYPE.TABS) {
    ReactDOM.render(<TabsLayout tabList={portalConfig.layout.props.tabList} />, portalSpaceEl);
  } else if (portalConfig.layout.type === LAYOUT_TYPE.GRID) {
    ReactDOM.render(<GridLayout items={portalConfig.layout.props.rows} />, portalSpaceEl);
  }

  return event;
});
