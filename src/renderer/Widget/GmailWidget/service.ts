
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

const handleSignin = (callback: Function) => {
  gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
};

const getMailFromID = async (msgIDs: any[]) => {
  const LIMIT_REQUEST = msgIDs.length > 20 ? 20 : (msgIDs.length - 1);
  let listMail: any[] = [];
  let listRequest = [];

  for (let i = 0; i < msgIDs.length; i++) {
    listRequest.push(
      gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': msgIDs[i].id
      })
    );

    if ((((i % LIMIT_REQUEST) === 0) && (i !== 0)) || i === (msgIDs.length - 1)) {
      const requests = await Promise.all(listRequest);
      listMail = listMail.concat(requests);
      listRequest = [];
    }
  }

  return listMail;
};

const getListMail = (pageToken?: string) => {
  return gapi.client.gmail.users.messages.list({
    'userId': 'me',
    'labelIds': ['INBOX', 'UNREAD'],
    'maxResults': NUM_DATA_DISPLAY,
    'pageToken': pageToken
  }).then((rsp: any)=> {
    return rsp.result;
  });
};

const formatListMail = (listMail: any[]) => {
  const mailFormats: GmailData[] = [];
  for (let i = 0; i < listMail.length; i++) {
    const headers = getHeaderObj(listMail[i].result.payload.headers);
    const mail = {
      threadId: listMail[i].result.threadId,
      from: headers.From,
      subject: headers.Subject,
      time: headers.Date,
      link: `https://mail.google.com/mail?authuser=${headers['Delivered-To']}#all/${listMail[i].result.threadId}`
    };
    mailFormats.push(mail);
  }
  return mailFormats;
};

const getHeaderObj = (payloadHeaders: any[]) => {
  const headerObject: any = {};
  for (let i = 0; i < payloadHeaders.length; i++) {
    const item = payloadHeaders[i];
    headerObject[item.name] = payloadHeaders[i].value;
  }
  return headerObject;
};

const checkSignin = () => gapi.auth2.getAuthInstance().isSignedIn.get();

export {loadGAPI, getMailFromID, formatListMail, initClient, handleSignin, checkSignin, getListMail, signIn, signOut};