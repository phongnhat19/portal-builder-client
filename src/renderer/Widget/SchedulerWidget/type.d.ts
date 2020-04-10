declare type SchedulerWidgetProps = {
  width: string;
  height: string;
  defaultView: string;
  showSettingInit?: boolean;
}

declare type SchedulerEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
}