
import $script from 'scriptjs';
import {NUM_DATA_DISPLAY} from './constant';

const loadGAPI = () => {
  return new Promise((resolve) => {
    $script('https://apis.google.com/js/api.js', () => {
      resolve(true);
    });
  });
};

const initClient = (apiKey: string, clientID: string) => {
  const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'];

  return gapi.client.init({
    apiKey: apiKey,
    clientId: clientID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(() => {
    return gapi.auth2.getAuthInstance().isSignedIn.get();
  });
};

const signIn = () => {
  gapi.auth2.getAuthInstance().signIn();
};

const signOut = () => {
  gapi.auth2.getAuthInstance().signOut();
};

const handleAuthorize = (callback: Function) => {
  gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
};

const getMailFromID = async (msgIDs: [{id: string}]) => {
  const listRequest = [];

  for (let i = 0; i < msgIDs.length; i++) {
    listRequest.push(
      gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': msgIDs[i].id
      })
    );
  }
  return Promise.all(listRequest);
};

const getListMail = (pageToken?: string) => {
  return gapi.client.gmail.users.messages.list({
    'userId': 'me',
    'labelIds': ['INBOX', 'UNREAD'],
    'maxResults': NUM_DATA_DISPLAY,
    'pageToken': pageToken
  }).then((rsp: {result: {nextPageToken: string; messages: [{id: string}]}})=> {
    return rsp.result;
  });
};

const formatListMail = (listMail: [ListMail]) => {
  const mailFormats: GmailData[] = [];
  for (let i = 0; i < listMail.length; i++) {
    const headers = getHeaderObj(listMail[i].result.payload.headers);
    const mail = {
      threadId: listMail[i].result.threadId,
      from: formatFrom(headers.From),
      subject: headers.Subject,
      time: formatDate(headers.Date),
      link: `https://mail.google.com/mail?authuser=${headers['Delivered-To']}#all/${listMail[i].result.threadId}`
    };
    mailFormats.push(mail);
  }
  return mailFormats;
};

const formatFrom = (from?: string) => {
  const format = from.split('<')[0];
  format.replace(/"/g, '').replace('>', '');
  return format.trim();
};

const formatDate = (date?: string) => {
  let format = '';
  const inputDate = new Date(date);
  const today = new Date();

  const numberFormat = (num: number) => `${num < 10 ? '0' : ''}${num}`;
  const dateFormat = (d: Date) => `${d.getFullYear()}-${numberFormat(d.getMonth())}-${numberFormat(d.getDate())} `;
  format = dateFormat(inputDate);

  if (dateFormat(today) === dateFormat(inputDate)) {
    format = `${numberFormat(inputDate.getHours())}:${numberFormat(inputDate.getMinutes())}`;
  }
  return format;
};

const getHeaderObj = (payloadHeaders: [{name: GmailHeaderKey ; value: string}]) => {
  const headerObject: GmailHeaderRsp = {};
  for (let i = 0; i < payloadHeaders.length; i++) {
    const item = payloadHeaders[i];
    headerObject[item.name] = payloadHeaders[i].value;
  }
  return headerObject;
};

const checkSignin = () => gapi.auth2.getAuthInstance().isSignedIn.get();

export {loadGAPI, getMailFromID, formatListMail, initClient, handleAuthorize, checkSignin, getListMail, signIn, signOut};