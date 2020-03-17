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
      render: (data: any) => (
        <div>
            {(data.status === 'unfulfilled' || !data.status) && <Button type="primary" onClick = {() => {
              let index = 0;
              onDeploy(data, index)
            }}> Deploy</Button>}
            {data.status === 'done' && <Button  type="primary" style={doneBtnStyle} icon={<CheckOutlined />} disabled ghost>Done</Button>}
            {data.status === 'processing' && <Button style={deployBtnStyle} disabled icon={<ClockCircleOutlined />} ghost>Deploying</Button>}
        </div>
      ),
    },
  ];
  return (<Table columns={columns} dataSource={data}/>)
}

export default TableCustom