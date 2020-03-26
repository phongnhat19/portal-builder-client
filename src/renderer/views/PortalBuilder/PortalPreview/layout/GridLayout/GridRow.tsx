import React from 'react'
import { Row, Button } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import GridBlock from './GridBlock';

const GridRowItem = ({ gridRowItem, rowIndex, onAddBlock }: {
  gridRowItem?: GridRow,
  rowIndex: number,
  onAddBlock?: () => void
}) => {

  return (
    <div className='grid-layout-row'>
      <Row justify="space-between" style={{ marginBottom: '15px' }}>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          size="small"
          onClick={onAddBlock}
        >
          Add Block
          </Button>
        <Button type="danger" icon={<MinusCircleOutlined />} size="small">Remove Row</Button>
      </Row>
      <div className='grid-blocks-container'>
        {gridRowItem!.blocks.map((block, index) => {
          return <GridBlock content={block.content} width={block.width} key={`block-${index}`} rowIndex={rowIndex} blockIndex={index} />
        })}
      </div>
    </div>

  )
}

export default GridRowItem