import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Alert  } from 'antd';
import { CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';
import {doneBtnStyle, deployBtnStyle} from './constant'

const TableCustom = ({ data, onDeploy = () => {}}: {
  data: any
  onDeploy?: (profile: Profile, index: number) => void
}) => {
  const [profiles, setProfiles] = useState(data)
  useEffect(()=> {
    setProfiles(data)
  },[data])
  const columns = [
    {
      title: 'Profile',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: '',
      key: 'status',
      render: (profile: any) => (
        <div>
            {(profile.status === 'unfulfilled' || profile.status === 'error' || !profile.status) && <Button type="primary" onClick = {() => {
              let index = 0;
              const newProfile = [...profiles]
              profiles.forEach((item: any, i: number) => {
                if (profile.profileId === item.profileId) {
                  index = i;
                  newProfile[i].status = 'processing'
                }
              });
              setProfiles(newProfile)
              onDeploy(profile, index)

            }}>Deploy</Button>}
            {profile.status === 'error' && <Alert message="Error occurs" type="error" />}
            {profile.status === 'done' && <Button style={doneBtnStyle} icon={<CheckOutlined />} disabled ghost>Done</Button>}
            {profile.status === 'processing' && <Button style={deployBtnStyle} disabled icon={<ClockCircleOutlined />} ghost>Deploying</Button>}
        </div>
      ),
    },
  ];
  return (<Table columns={columns} dataSource={profiles}/>)
}

export default TableCustom