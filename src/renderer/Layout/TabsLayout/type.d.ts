declare type Tab = {
  tabName: string;
  tabContent: {
    type: ContentType;
    name?: string;
    props?: IframeWidgetProps | HTMLWidgetProps | SchedulerWidgetProps | WeatherWidgetProps | GmailWidgetProps | AppSpaceWidgetProps;
    value?: string;
  };
}

declare type TabLayout = {
  tabList: Tab[];
}