import React, { useContext, useState, useEffect, Context} from 'react';
import 'antd/dist/antd.css';
import {ProfileContext} from '../../../ProfileContext'
import { Table, Button  } from 'antd';
import { CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';
import {DeployTable, doneBtnStyle, deployBtnStyle} from './Type'

const TableCustom = ({ onDeploy = () => {}}: DeployTable) => {

  const profiles = useContext(ProfileContext);
  const [profilesSetting, setProfilesSetting] = useState(profiles[0])
  useEffect(() => {
    setProfilesSetting(profiles[0])
  },[profiles[0]])

    const columns = [
        {
          title: 'Profile',
          dataIndex: 'profile',
          key: 'profile'
        },
        {
          title: 'Domain',
          dataIndex: 'domain',
          key: 'domain',
        },
        {
          title: '',
          key: 'status',
          render: (data: any) => (
            <div>
                {(data.status === 'unfulfilled' || !data.status) && <Button type="primary" onClick = {() => {onDeploy(data)}}>Deploy</Button>}
                {data.status === 'done' && <Button style={doneBtnStyle} icon={<CheckOutlined />} disabled ghost>Done</Button>}
                {data.status === 'processing' && <Button style={deployBtnStyle} disabled icon={<ClockCircleOutlined />} ghost>Deploying</Button>}
            </div>
          ),
        },
      ];
      return (<Table columns={columns}  dataSource={profilesSetting}/>)
}

export default TableCustom