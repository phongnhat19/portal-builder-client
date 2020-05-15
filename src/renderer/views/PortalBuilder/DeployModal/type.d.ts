declare type ItemTable = {
  key: number | string;
  profile: string;
  domain: string;
  status: 'done' | 'processing' | 'unfulfilled';
}