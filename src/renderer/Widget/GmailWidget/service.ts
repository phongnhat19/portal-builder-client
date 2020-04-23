

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
    // console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
    return gapi.auth2.getAuthInstance().isSignedIn.get();
    // gapi.auth2.getAuthInstance().isSignedIn.listen()

    // Listen for sign-in state changes.
    // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // // Handle the initial sign-in state.
    // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    // authorizeButton.onclick = handleAuthClick;
    // signoutButton.onclick = handleSignoutClick;
  });
};

const handleSignin = (callback: Function) => {
  gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
};

const getListMail = () => {
  return gapi.client.gmail.users.messages.list({
    'userId': 'me',
    'labelIds': ['INBOX', 'UNREAD'],
    'maxResults': 10
  }).then((rsp: any)=> {
    console.log(rsp);
    const listMsgRequest = rsp.result.messages.map((item: {id?: string; threadId?: string}) => {
      return gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': item.id
      });
    });

    return Promise.all(listMsgRequest);
  }).then((rsp: any)=> {
    console.log(rsp);
    return formatListMail(rsp);
  })
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

export {handleClientLoad, initClient, handleSignin, checkSignin, getListMail};