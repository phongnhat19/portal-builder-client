import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button  } from 'antd';
import { CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';
import {DeployTable, doneBtnStyle, deployBtnStyle} from './Type'

const TableCustom = ({ data, onDeploy = () => {}}: DeployTable) => {
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
            {(profile.status === 'unfulfilled' || !profile.status) && <Button type="primary" onClick = {() => {
              let index = 0;
              data.forEach((item: any, i: number) => {
                if (profile.profileId === item.profileId) {
                  index = i;
                }
              });
              onDeploy(profile, index)

            }}> {data.status}Deploy</Button>}
            {profile.status === 'done' && <Button style={doneBtnStyle} icon={<CheckOutlined />} disabled ghost>Done</Button>}
            {profile.status === 'processing' && <Button style={deployBtnStyle} disabled icon={<ClockCircleOutlined />} ghost>Deploying</Button>}
        </div>
      ),
    },
  ];
  return (<Table columns={columns} dataSource={data}/>)
}

export default TableCustom