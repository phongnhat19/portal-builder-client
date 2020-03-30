import React, { useRef } from 'react'
import { Row, Button, Popconfirm } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import GridBlock from './GridBlock';

const GridRowItem = ({ gridRowItem, rowIndex, onRemoveBlock, onAddBlock, onRemoveGridRow, onResizeWidthBlock }: {
  gridRowItem?: GridRow,
  rowIndex: number
  onRemoveBlock: (item: { removedIndex: number }) => void
  onAddBlock?: () => void
  onRemoveGridRow?: () => void
  onResizeWidthBlock: (item: { blockIndex: number, width: number }) => void
}) => {

  const rowRef = useRef<HTMLDivElement>(null)

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
      <div className='grid-blocks-container' ref={rowRef}>
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
            onResizeWidth={(item) => {
              const rowWidth: number = rowRef.current!.offsetWidth
              const percentageConversionWidth: number = (item.width / rowWidth * 100)
              const roundDecimalTwoPlaces: number = Math.round(percentageConversionWidth * 100) / 100
              onResizeWidthBlock({
                blockIndex: index,
                width: roundDecimalTwoPlaces
              })
            }}
          />
        })}
      </div>
    </div>

  )
}

export default GridRowItem