import React from 'react'
import { Card } from 'antd';
import Widget from './Widget';

const WidgetList = ({ containers = [], onDragStart = () => {} }: {
  containers?: Array<Widget>,
  onDragStart?: (item: Widget) => void
}) => {
  return (
    <React.Fragment>
      <Card title="Default Widget">
        {containers.map((item: Widget, index: number) => {
          return <Widget name={item.name} icon={item.icon} dragStart={(event) => {
            onDragStart(item); 
            event.dataTransfer.setData("text", item.name);
          }} key={index} />
        })}
      </Card>
    </React.Fragment>
  )
}
export {Widget}
export default WidgetList