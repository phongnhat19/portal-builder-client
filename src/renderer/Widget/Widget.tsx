import React, {CSSProperties} from 'react';
import {Card} from 'antd';

const gridStyle: CSSProperties = {
  width: '50%',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
};

const Widget = ({name, icon, dragStart}: {
  name?: string;
  icon?: HTMLElement;
  dragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
}) => {

  return (
    <div role="button" tabIndex={0} draggable onDragStart={dragStart}>
      <Card.Grid style={gridStyle}>
        {icon}
        {name}
      </Card.Grid>
    </div>
  );
};

export default Widget;