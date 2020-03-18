  import {Tabs} from '@kintone/kintone-ui-component/esm/js'

  const configs = PORTAL_CONFIG

  function createDefaultPortalContent() {
    const portalSpaceEl = kintone.portal.getContentSpaceElement();
    const defaultPortalBodyEl = portalSpaceEl.nextSibling;

    const containerEl = document.createElement('div');
    containerEl.appendChild(defaultPortalBodyEl);

    return containerEl;
  }

  function createIframeItemContent(props) {
    const iframeEl = document.createElement('iframe');
    iframeEl.src = props.url;
    iframeEl.style.width = props.width;
    iframeEl.style.height = props.height;

    return iframeEl;
  }

  function createHTMLItemContent(props) {
    const htmlEl = document.createElement('div');
    htmlEl.innerHTML = props.src;

    return htmlEl;
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
      case 'HTMLWidget':
        tabContent = createHTMLItemContent(content.props);
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

  function createTabs() {
    const tabItems = [];

    configs.forEach(function (item) {
      tabItems.push(createTabItem(item.tabName, item.tabContent));
    });

    return new Tabs({ items: tabItems });
  }

  kintone.events.on('portal.show', function (event) {
    const portalSpaceEl = kintone.portal.getContentSpaceElement();

    const tabs = createTabs();
    portalSpaceEl.appendChild(tabs.render());

    return event;
  });
