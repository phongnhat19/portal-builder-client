declare enum ContentType {
  IFRAME = 'Iframe',
  HTML = 'HTML',
  SCHEDULE = 'Schedule',
  DEFAULT = 'DefaultPortal',
  EMPTY = 'Empty'
}

declare type Tab = {
  tabName: string,
  tabContent: {
    type: ContentType,
    name?: string,
    props?: IframeWidgetProps | HTMLWidgetProps | SchedulerWidgetProps,
    value?: string
  }
}