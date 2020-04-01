import {Tabs} from '@kintone/kintone-ui-component/esm/js'
import { createIframeItemContent } from "../../Widget/Iframe";
import { createHTMLItemContent } from "../../Widget/HTML";
import { createScheduleWidget } from '../../Widget/Schedule';

function createDefaultPortalContent() {
  const portalSpaceEl = kintone.portal.getContentSpaceElement();
  const defaultPortalBodyEl = portalSpaceEl.nextSibling;

  const containerEl = document.createElement('div');
  containerEl.appendChild(defaultPortalBodyEl);

  return containerEl;
}

function createTabContent(content) {
  let tabContent = '';
  switch (content.type) {
    case 'DefaultPortal':
      tabContent = createDefaultPortalContent();
      break;
    case 'Iframe':
      if (!content.props) break;

      tabContent = createIframeItemContent(content.props);
      break;
    case 'HTML':
      tabContent = createHTMLItemContent(content.props);
      break;
    
    case 'Schedule':
      tabContent = createScheduleWidget(content.props);
      break;
      
    default:
      tabContent = '';
  }

  return tabContent;
}

function createTabItem(name, content) {
  return {
    tabName: name,
    tabContent: createTabContent(content)
  };
};

function createTabs(tabList) {
  const tabItems = [];

  tabList.forEach(function (item) {
    tabItems.push(createTabItem(item.tabName, item.tabContent));
  });

  return new Tabs({ items: tabItems });
}

export {
  createTabs
}