import React, { CSSProperties } from 'react'
import { Card } from 'antd';
import Widget from './Widget';

type Widget = {
  name: string
  icon: any
}

type WidgetList = {
  containers?: Array<Widget>,
  onDragStart?: (item: Widget) => void
}

const WidgetList = ({ containers = [], onDragStart = () => {} }: WidgetList) => {

  return (
    <Card title="Default Widget">
      {containers.map((item: Widget, index: number) => {
        return <Widget name={item.name} icon={item.icon} dragStart={(event) => {
          onDragStart(item); 
          event.dataTransfer.setData("text", item.name);
        }} key={index} />
      })}
    </Card>
  )
}
export {Widget}
export default WidgetList