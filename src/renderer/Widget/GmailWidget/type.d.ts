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

declare type GmailHeaderRsp = {
  threadId?: string;
  From?: string;
  Subject?: string;
  Date?: string;
}

declare type GmailHeaderKey = 'threadId' | 'From' | 'Subject' | 'Date'
declare type ListMail = {
  result: {
    threadId: string;
    payload: {
      headers: [{name: GmailHeaderKey ; value: string}];
    };
  };
}