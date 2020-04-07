import React from 'react'
import GridBlock from '../GridBlock/renderer';

const GridRowItem = ({ gridRowItem }: {
  gridRowItem?: GridRow
}) => {

  return (
    <div className='grid-layout-row'>
      <div className='grid-blocks-container'>
        {gridRowItem!.blocks.map((block, index) => {
          return <GridBlock
            type={block.type}
            content={block.content}
            width={block.width}
            key={`block-${index}`}
          />
        })}
      </div>
    </div>

  )
}

export default GridRowItem