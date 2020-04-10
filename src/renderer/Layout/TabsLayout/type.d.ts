declare type Tab = {
  tabName: string;
  tabContent: {
    type: ContentType;
    name?: string;
    props?: IframeWidgetProps | HTMLWidgetProps | SchedulerWidgetProps;
    value?: string;
  };
}

declare type TabLayout = {
  tabList: Tab[];
}