import React, {useEffect, useState} from 'react';
import {NUM_DATA_DISPLAY, ERROR_MESSAGE} from './constant';
import {Button, Spin, Alert, Tag} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {loadGAPI, initClient, getMailFromID, formatListMail, handleAuthorize, checkSignin, getListMail, signIn, signOut} from './service';
import MailDetail from './MailDetail';
import './style.css';

const Gmail = ({apiKey = '', clientID = '', data = []}: {
  apiKey?: string;
  clientID?: string;
  data?: GmailData[];
}) => {
  const [dataSource, setDataSource] = useState(data);
  const [existGAPI, setExistGAPI] = useState(false);
  const [dataDisplay, setDataDisplay] = useState([] as GmailData[]);
  const [currentPape, setCurrentPage] = useState(0);
  const [nextPageToken, setNextPageToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [signin, setSignin] = useState(false);
  const [error, setError] = useState({logOut: '', invalidKey: ''});

  useEffect(() =>{
    if (dataSource.length === 0) setDataDisplay([]);
    const startIndex = NUM_DATA_DISPLAY * currentPape;
    if (dataSource.length <= startIndex) return;

    let endIndex = startIndex + NUM_DATA_DISPLAY;
    endIndex = endIndex > dataSource.length ? dataSource.length : endIndex;

    const copyData = [...dataSource];
    const currentData = copyData.length > NUM_DATA_DISPLAY ? copyData.slice(startIndex, endIndex) : copyData;
    setDataDisplay(currentData);
  }, [currentPape, dataSource]);
  useEffect(() =>{
    const handleSigninCallBack = (isSignedIn: boolean) => {
      setSignin(isSignedIn);
      prepareData(isSignedIn);
    };
    const handleGAPIClient = async () => {
      if (!existGAPI) {
        await loadGAPI();
        setExistGAPI(true);
      }
      if (window.kintone && existGAPI) {
        gapi.load('client:auth2', () => {
          setLoading(true);
          initClient(apiKey, clientID).then(() => {
            setSignin(checkSignin());
            handleAuthorize(handleSigninCallBack);
            handleSigninCallBack(checkSignin());
          }).catch(() => {
            setError({invalidKey: ERROR_MESSAGE.API_KEY, logOut: ''});
            setLoading(false);
          });
        });
      }
    };
    handleGAPIClient();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, clientID, existGAPI]);

  const prepareData = (isSignedIn: boolean, pageToken?: string) => {
    if (isSignedIn) {
      setError({invalidKey: '', logOut: ''});
      setLoading(true);
      getListMail(pageToken).then((rsp: {nextPageToken: string; messages: [{id: string}]}) => {
        setNextPageToken(rsp.nextPageToken);
        return getMailFromID(rsp.messages);
      }).then((rsp: [ListMail])=> {
        return formatListMail(rsp);
      }).then((rsp: GmailData[])=> {
        const newData = dataSource.concat(rsp);
        setDataSource(newData);
        setLoading(false);
      }).catch(() => {
        setError({invalidKey: ERROR_MESSAGE.API_KEY, logOut: ''});
        setLoading(false);
      });
    } else {
      setDataSource([]);
      setError({invalidKey: '', logOut: ERROR_MESSAGE.OAUTH});
      setLoading(false);
    }
  };
  const handlePreviousBtn = () => {
    if (currentPape === 0) return;
    setCurrentPage(currentPape - 1);
  };

  const handleNextBtn = () => {
    if (nextPageToken && ((NUM_DATA_DISPLAY * currentPape + NUM_DATA_DISPLAY) >= dataSource.length)) {
      prepareData(checkSignin(), nextPageToken);
    }
    setCurrentPage(currentPape + 1);
  };

  const handleSignin = () => {
    signIn();
  };
  const handleSignout = () => {
    signOut();
    setDataSource([]);
    setError({invalidKey: '', logOut: ERROR_MESSAGE.OAUTH});
  };

  const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />;

  return (
    <div className="gmail-container">
      <div className="gmail-header-container">
        <div className="gmail-header-left">
          <div className="gmail-header-icon"> </div>
          <div className="gmail-header-title"> Gmail </div>
        </div>
      </div>
      {!window.kintone && <Alert message="Warning" description={ERROR_MESSAGE.WANNING} type="warning" showIcon style={{margin: '10px'}} />}
      <div className="gmail-action">
        <div className="gmail-action-left">
          <Tag className="gmail-tag" style={{color: '#1890ff', background: '#e6f7ff', borderColor: '#91d5ff'}} color="blue">Inbox</Tag>
          <Tag className="gmail-tag" style={{color: '#eb2f96', background: '#fff0f6', borderColor: '#ffadd2'}} color="magenta">Unread</Tag>
        </div>
        <div className="gmail-action-right" >
          <Button
            type="primary"
            className="gmail-widget-login"
            onClick={() => {
              if (!window.kintone) return;
              if (checkSignin()) {
                handleSignout();
              } else {
                handleSignin();
              }
            }}
          >
            {(!signin && window.kintone) && `Login` }
            {(signin || !window.kintone) && `Logout` }
          </Button>
          <Button disabled={(currentPape === 0)} className="icon-previous-container" onClick={handlePreviousBtn}>
            <div className="icon-previous"> </div>
          </Button>
          <Button disabled={(nextPageToken === '')} className="icon-next-container" onClick={handleNextBtn}>
            <div className="icon-next"> </div>
          </Button>
        </div>
      </div>
      <div>
        {(error.invalidKey || error.logOut) && <div className="gmail-error-alert"> {error.invalidKey || error.logOut}</div> }
        {loading ? <Spin className="gmail-loading" indicator={antIcon} /> : <MailDetail dataDisplay={dataDisplay} />}
      </div>
    </div>
  );
};

export default Gmail;