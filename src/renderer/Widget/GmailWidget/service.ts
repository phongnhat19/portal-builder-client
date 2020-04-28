

let API_KEY = '';
let CLIENT_ID = '';

const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'];

const handleClientLoad = (apiKey: string, clientID: string) => {
  CLIENT_ID = clientID;
  API_KEY = apiKey;
  console.log(gapi);

//   gapi.load('client:auth2', initClient);
};

const initClient = (apiKey, clientID) => {

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
  let listMail: any = [];
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

  console.log('mail ', listMail);
  return listMail;
};

const getListMail = () => {
  return gapi.client.gmail.users.messages.list({
    'userId': 'me',
    'labelIds': ['INBOX', 'UNREAD'],
    // 'maxResults': 10
  }).then((rsp: any)=> {
    console.log('list ', rsp);
    
    return getMailFromID(rsp.result.messages);
  }).then((rsp: any)=> {
    return formatListMail(rsp);
  });
};

const formatListMail = (listMail: any[]) => {
  const mailFormats: any[] = [];
  for (let i = 0; i < listMail.length; i++) {
    const headers = getHeaderObj(listMail[i].result.payload.headers);
    const mail = {
      key: i,
      from: headers.From,
      subject: headers.Subject,
      time: headers.Date,
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

export {handleClientLoad, initClient, handleSignin, checkSignin, getListMail, signIn, signOut};