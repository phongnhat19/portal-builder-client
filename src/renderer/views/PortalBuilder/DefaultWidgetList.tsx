import React, { CSSProperties } from 'react'
import { Card } from 'antd';
import {BorderOutlined, Html5Outlined, CalendarOutlined, MailOutlined} from '@ant-design/icons'

const gridStyle: CSSProperties = {
  width: '50%',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
};

const WidgetList = () => {
  return(
    <Card title="Default Widget">
      <Card.Grid style={gridStyle}>
        <BorderOutlined />
        Iframe
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Html5Outlined />
        HTML
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <CalendarOutlined />
        Schedule
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <MailOutlined />
        Gmail
      </Card.Grid>
    </Card>
  )
}

export default WidgetList