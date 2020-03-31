import { createTabs } from './Layout/Tab';

const configs = PORTAL_CONFIG

kintone.events.on('portal.show', function (event) {
  const portalSpaceEl = kintone.portal.getContentSpaceElement();

  const tabs = createTabs(configs);
  portalSpaceEl.appendChild(tabs.render());

  return event;
});
