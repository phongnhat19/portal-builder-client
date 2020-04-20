declare type Tab = {
  tabName: string;
  tabContent: {
    type: ContentType;
    name?: string;
    props?: IframeWidgetProps | HTMLWidgetProps | SchedulerWidgetProps | AppSpaceWidgetProps;
    value?: string;
  };
}

declare type TabLayout = {
  tabList: Tab[];
}