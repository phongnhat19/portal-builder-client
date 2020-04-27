import React, {useEffect, useState} from 'react';
import {Button, Table} from 'antd';
import 'antd/dist/antd.css';
import $script from 'scriptjs';
import {handleClientLoad, initClient, handleSignin, checkSignin, getListMail, signIn, signOut} from './service';
import MailDetail from './MailDetail';
import './style.css';

const Gmail = ({width, height, htmlString}: {
  htmlString?: string;
  width?: string | number;
  height?: string | number;
}) => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      from: 'kimcuc0202@gmail.com',
      subject: '10 Downing Street',
      time: '24/10/2020',
    }
  ]);

  const [columns, setColumns] = useState([
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      // eslint-disable-next-line react/display-name
      render: (data: any) => {
        return <MailDetail data={data} />;
      },
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
  ]);
  const [showDetail, setShowDetail] = useState(false);
  const [signin, setSignin] = useState(false);
  useEffect(() =>{
    if (window.kintone) {
      $script('https://apis.google.com/js/api.js', () => {
        const apiKey = 'AIzaSyDk9PdSINSxc0N52-Q58pKJrKr9pZgr5W4';
        const clientID = '171368506272-s327p05s7haujqmm88j86fjegc53b934.apps.googleusercontent.com';
        handleClientLoad(apiKey, clientID);
        gapi.load('client:auth2', () => {
          initClient(apiKey, clientID).then(() => {
            setSignin(checkSignin());
            handleSignin(handleSigninCallBack);
            handleSigninCallBack(checkSignin());
          });
        });
      });
    }
  }, []);

  const handleSigninCallBack = (isSignedIn: boolean) => {
    setSignin(isSignedIn);
    console.log(isSignedIn, 'callback');
    if (isSignedIn) {
      getListMail().then((rsp: any) => {
        console.log(rsp);

        setDataSource(rsp);
      }).catch((err: any) => {
        console.log(err);
      });
    } else {
    }
  };

  return (
    <div className="gmail-container">
      <Button
        style={{display: signin ? 'none' : 'block'}}
        className="gmail-widget-login"
        type="primary"
        onClick={signIn}
      >Login
      </Button>
      <Button style={{display: signin ? 'block' : 'none'}} className="gmail-widget-logout" type="primary" onClick={signOut} >Logout</Button>
      {signin &&
      <div>
        <div className="gmail-header" >
          <span>Inbox</span>
        </div>
        <div className="gmail-contain" >
          <Table dataSource={dataSource} columns={columns} />;
        </div>
      </div> }
    </div>
  );
};

export default Gmail;