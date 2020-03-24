declare enum TabContentType {
  IFRAME = 'Iframe',
  HTML = 'HTML',
  SCHEDULE = 'Schedule',
  DEFAULT = 'DefaultPortal',
  EMPTY = 'Empty'
}

declare type Tab = {
  tabName: string,
  tabContent: {
    type: TabContentType,
    name?: string,
    props?: IframeWidgetProps | HTMLWidgetProps | ScheduleWidgetProps,
    value?: string
  }
}