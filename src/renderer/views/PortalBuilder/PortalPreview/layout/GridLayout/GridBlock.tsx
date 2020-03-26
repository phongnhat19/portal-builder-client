import React, { CSSProperties, ReactElement } from 'react'
import './style.css'
import { MinusCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';

const GridBlock = ({ style, content, width, rowIndex, blockIndex, onRemoveBlock, length }: {
  style?: CSSProperties
  content: ReactElement | string | number
  width: number
  rowIndex: number
  blockIndex: number
  onRemoveBlock?: () => void
  length?: number
}) => {

  let finalStyle:CSSProperties = {
    width: `${width}%`
  }

  if (style) {
    finalStyle = {...finalStyle, ...style}
  }

  return(
    <div style={finalStyle} className="grid-block">
      {length !== 1 &&
        <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={onRemoveBlock}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="danger"
            icon={<MinusCircleOutlined />}
            size="small"
          >Remove Block
          </Button>
        </Popconfirm>
      }
      {content}
    </div>
  )
}

export default GridBlock