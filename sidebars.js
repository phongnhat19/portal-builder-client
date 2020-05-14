module.exports = {
  someSidebar: {
    'Portal Builder': [
      'overview',
      {
        type: 'category',
        label: 'Profile Management',
        items: [
          'profileManagement/addProfile',
          'profileManagement/updateProfile',
          'profileManagement/deleteProfile',
        ],
      },
      {
        type: 'category',
        label: 'Portal Management',
        items: [
          'portalManagement/addPortal',
          'portalManagement/updatePortal',
          'portalManagement/deletePortal',
          'portalManagement/deployPortal',
        ],
      },
      {
        type: 'category',
        label: 'Widget Management',
        items: [

          'widgetManagement/addWidget',
          'widgetManagement/updateWidget',
          'widgetManagement/deleteWidget',
          {
            type: 'category',
            label: 'Widgets',
            items: [
              'widgetManagement/widgets/iframe',
              'widgetManagement/widgets/html',
              'widgetManagement/widgets/appSpaceList',
              'widgetManagement/widgets/garoonScheduler',
              'widgetManagement/widgets/garoonNotifications',
              'widgetManagement/widgets/gmail',
              'widgetManagement/widgets/weather'
            ],
          }
        ],
      }
    ],
  },
};
