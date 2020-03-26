import React from 'react'
import { Row, Button, Popconfirm } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import GridBlock from './GridBlock';

const GridRowItem = ({ gridRowItem, rowIndex, onRemoveBlock, onAddBlock, onRemoveGridRow }: {
  gridRowItem?: GridRow,
  rowIndex: number
  onRemoveBlock: (item: { removedIndex: number }) => void
  onAddBlock?: () => void
  onRemoveGridRow?: () => void
}) => {

  return (
    <div className='grid-layout-row'>
      <Row justify="space-between" style={{ marginBottom: '15px' }}>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          size="small"
          onClick={onAddBlock}
        >Add Block
        </Button>

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
      </Row>
      <div className='grid-blocks-container'>
        {gridRowItem!.blocks.map((block, index) => {
          return <GridBlock
            content={block.content}
            width={block.width}
            key={`block-${index}`}
            rowIndex={rowIndex}
            blockIndex={index}
            onRemoveBlock={() => {
              onRemoveBlock({
                removedIndex: index
              })
            }}
          />
        })}
      </div>
    </div>

  )
}

export default GridRowItem