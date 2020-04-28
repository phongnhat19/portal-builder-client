declare type GmailSettings = {
  apiKey: string;
  clientID: string;
}

declare type GmailData = {
  key: string;
  from: string;
  subject: strign;
  time: string;
}
declare type GmailWidgetProps = {
  showSettingInit?: boolean;
  apiKey: string;
  clientID: string;
  onSaveSetting?: (settings: GmailSettings) => {};
  onRemove?: () => {};
}