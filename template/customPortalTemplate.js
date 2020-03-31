import { createTabs } from './Layout/Tab';

const portalConfig = PORTAL_CONFIG

const LAYOUT_TYPE = {
  TABS: 'Tabs',
  GRID: 'Grid'
}

kintone.events.on('portal.show', function (event) {
  const portalSpaceEl = kintone.portal.getContentSpaceElement();

  if (portalConfig.layout.type === LAYOUT_TYPE.TABS) {
    const tabs = createTabs(portalConfig.layout.props.tabList);
    portalSpaceEl.appendChild(tabs.render());
  } else if (portalConfig.layout.type === LAYOUT_TYPE.GRID) {
    // Build grid layout
    console.log('Hello');
    const test = document.createElement('h1')
    test.textContent = 'HELLLO'
    portalSpaceEl.appendChild(test);
  }

  return event;
});
