import { createTabs } from './Layout/Tab';
import { createGridsLayout } from './Layout/Grid';
import { LAYOUT_TYPE } from './resource/constant';

const portalConfig = PORTAL_CONFIG

kintone.events.on('portal.show', function (event) {
  const portalSpaceEl = kintone.portal.getContentSpaceElement();

  if (portalConfig.layout.type === LAYOUT_TYPE.TABS) {
    const tabs = createTabs(portalConfig.layout.props.tabList);
    portalSpaceEl.appendChild(tabs.render());
  } else if (portalConfig.layout.type === LAYOUT_TYPE.GRID) {
    // Build grid layout
    const gridLayout = createGridsLayout(portalConfig.layout.props.rows)
    portalSpaceEl.appendChild(gridLayout);
  }

  return event;
});
