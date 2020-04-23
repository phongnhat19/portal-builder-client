import React, {useEffect, useState} from 'react';
import {Button, Table} from 'antd';
import 'antd/dist/antd.css';
import $script from 'scriptjs';
import {handleClientLoad, initClient, handleSignin, checkSignin, getListMail} from './service';
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
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
  ]);
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
        setDataSource(rsp);
      }).catch((err: any) => {
        console.log(err);
      });
    }
  };

  return (
    <div className="gmail-container">
      <Button
        style={{display: signin ? 'none' : 'block'}}
        className="gmail-widget-login"
        type="primary"
        onClick={() => {
          console.log(111);
          getListMail();
        }}
      >Login
      </Button>
      <Button style={{display: signin ? 'block' : 'none'}} className="gmail-widget-logout" type="primary">Logout</Button>
      <div className="gmail-header" >
        <span>Inbox</span>
      </div>
      <div className="gmail-contain" >
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
};

export default Gmail;