(function () {
    'use strict';
    var configs = [
      {
        'tabName': 'Default Portal',
        'tabContent': {
          'type': 'DefaultPortal'
        }
      },
      {
        'tabName': 'Company Location',
        'tabContent': {
          'type': 'IframeWidget',
          'props': {
            'url': 'https://www.google.com/maps/embed/v1/place?key=AIzaSyC6NGlXCyiz7CbeJAb1RA6bUsWN6YWaK8Q&q=Centre+Point+Tower',
            'width': '100%',
            'height': '720px'
          }
        }
      },
      {
        'tabName': 'Company Location',
        'tabContent': {
          'type': 'HTMLWidget',
          'props': {
            'src': '<button>Hello</button>'
          }
        }
      }
    ]
  
    function createDefaultPortalContent() {
      var portalSpaceEl = kintone.portal.getContentSpaceElement();
      var defaultPortalBodyEl = portalSpaceEl.nextSibling;
  
      var containerEl = document.createElement('div');
      containerEl.appendChild(defaultPortalBodyEl);
  
      return containerEl;
    }
  
    function createIframeItemContent(props) {
      var iframeEl = document.createElement('iframe');
      iframeEl.src = props.url;
      iframeEl.style.width = props.width;
      iframeEl.style.height = props.height;
  
      return iframeEl;
    }
  
    function createHTMLItemContent(props) {
      var htmlEl = document.createElement('div');
      htmlEl.innerHTML = props.src;
  
      return htmlEl;
    }
  
    function createTabContent(content) {
      var tabContent;
      switch (content.type) {
        case 'DefaultPortal':
          tabContent = createDefaultPortalContent();
          break;
        case 'IframeWidget':
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
      var tabItems = [];
  
      configs.forEach(function (item) {
        tabItems.push(createTabItem(item.tabName, item.tabContent));
      });
  
      return new kintoneUIComponent.Tabs({ items: tabItems });
    }
  
    kintone.events.on('portal.show', function (event) {
      var portalSpaceEl = kintone.portal.getContentSpaceElement();
  
      var tabs = createTabs();
      portalSpaceEl.appendChild(tabs.render());
  
      return event;
    });
  })();
  