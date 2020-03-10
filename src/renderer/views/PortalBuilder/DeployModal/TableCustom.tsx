import React, { CSSProperties } from 'react';
import 'antd/dist/antd.css';
import { Table, Button  } from 'antd';
import { CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';
import {DeployTable, doneBtnStyle, deployBtnStyle} from './Type'

const TableCustom = ({items = [], onDeploy = () => {}}: DeployTable) => {
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
                {data.status === 'unfulfilled' && <Button type="primary" onClick = {() => {onDeploy(data)}}>Deploy</Button>}
                {data.status === 'done' && <Button style={doneBtnStyle} icon={<CheckOutlined />} disabled ghost>Done</Button>}
                {data.status === 'processing' && <Button style={deployBtnStyle} disabled icon={<ClockCircleOutlined />} ghost>Deploying</Button>}
            </div>
          ),
        },
      ];
      return (<Table columns={columns}  dataSource={items}/>)
}

export default TableCustom