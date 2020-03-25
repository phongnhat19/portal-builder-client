import React from 'react'
import { GridRow } from './type';

const GridRowItem = ({ gridRowItem }: {
  gridRowItem?: GridRow
}) => {

  return (
    <div className='grid-layout-row'>
      aaa
      {gridRowItem!.blocks.map(block => {
        console.log('Block', block);
      })}
    </div>

  )
}

export default GridRowItem