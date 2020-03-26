import React from 'react'
import { Row, Button } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import GridBlock from './GridBlock';

const GridRowItem = ({ gridRowItem, rowIndex }: {
  gridRowItem?: GridRow,
  rowIndex: number
}) => {

  return (
    <div className='grid-layout-row'>
      <Row justify="space-between" style={{marginBottom: '15px'}}>
        <Button type="primary" icon={<PlusCircleOutlined />} size="small">Add Block</Button>
        <Button type="danger" icon={<MinusCircleOutlined />} size="small">Remove Row</Button>
      </Row>
      {gridRowItem!.blocks.map((block, index) => {
        return <GridBlock content={block.content} width={block.width} key={`block-${index}`} rowIndex={rowIndex} blockIndex={index} />
      })}
    </div>

  )
}

export default GridRowItem