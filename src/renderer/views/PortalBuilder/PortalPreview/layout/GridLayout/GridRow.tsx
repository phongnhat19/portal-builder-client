import React from 'react'
import { Row, Button, Popconfirm } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import GridBlock from './GridBlock';

const GridRowItem = ({ length, gridRowItem, rowIndex, onRemoveGridRow }: {
  gridRowItem?: GridRow,
  length?: number,
  rowIndex: number,
  onRemoveGridRow?: () => void
}) => {

  return (
    <div className='grid-layout-row'>
      <Row justify="space-between" style={{marginBottom: '15px'}}>
        <Button type="primary" icon={<PlusCircleOutlined />} size="small">Add Block</Button>
        {length !== 1 &&
          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={onRemoveGridRow}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="danger"
              icon={<MinusCircleOutlined />}
              size="small"
            >
              Remove Row
            </Button>
          </Popconfirm>
        }
      </Row>
      {gridRowItem!.blocks.map((block, index) => {
        return <GridBlock content={block.content} width={block.width} key={`block-${index}`} rowIndex={rowIndex} blockIndex={index} />
      })}
    </div>

  )
}

export default GridRowItem