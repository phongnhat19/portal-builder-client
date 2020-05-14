const NUM_DATA_DISPLAY = 20;
const ERROR_MESSAGE = {
  OAUTH: 'Please login to get the emails',
  API_KEY: 'APIKey or ClientID is not valid',
  REQUIRED_FIELD: 'Required Field',
  WANNING: 'The data below is just an example. Your email will be displayed after successfully logged in'
};
const SAMPLE_DATA = [
  {
    threadId: '1',
    from: 'test@gmail.com',
    subject: '10 Downing Street',
    time: '2020-10-24',
    link: 'htpps://test.com'
  },
  {
    threadId: '1',
    from: 'alex@gmail.com',
    subject: '10 Downing Street',
    time: '2020-10-25',
    link: 'htpps://alex.com'
  }
];

export {
  NUM_DATA_DISPLAY,
  ERROR_MESSAGE,
  SAMPLE_DATA
};