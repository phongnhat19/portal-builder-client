declare type GmailSettings = {
  apiKey?: string;
  clientID?: string;
}

declare type GmailData = {
  threadId: string;
  from: string;
  subject: strign;
  time: string;
  link: string;
}
declare type GmailWidgetProps = {
  showSettingInit?: boolean;
  apiKey?: string;
  clientID?: string;
  onSaveSetting?: (settings: GmailSettings) => void;
  onRemove?: () => void;
}