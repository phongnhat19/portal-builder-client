import React from 'react';
import './renderer.css';
import GridRow from './GridRow/renderer';

const GridLayout = ({items = []}: {
  items?: GridRow[];
}) => {

  return (
    <div className="grid-layout-container">
      <div>
        <div className="grid-layout">
          {items.map((item, i) => {
            return (<GridRow
              gridRowItem={item}
              key={i}
                    />);
          })}
        </div>
      </div>
    </div>
  );
};

export default GridLayout;