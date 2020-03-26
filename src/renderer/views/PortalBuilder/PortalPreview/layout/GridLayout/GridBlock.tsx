import React, { CSSProperties, ReactElement } from 'react'
import './style.css'
import { MinusCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Row } from 'antd';

const GridBlock = ({ style, content, width, rowIndex, blockIndex, onRemoveBlock }: {
  style?: CSSProperties
  content: ReactElement | string | number
  width: number
  rowIndex: number
  blockIndex: number
  onRemoveBlock?: () => void
}) => {

  let finalStyle:CSSProperties = {
    width: `${width}%`
  }

  if (style) {
    finalStyle = {...finalStyle, ...style}
  }

  return(
    <div style={finalStyle} className="grid-block">
      <Row>
        <Popconfirm
          title="Are you sure to delete this block?"
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
      </Row>
      <Row>
        {content}
      </Row>
    </div>
  )
}

export default GridBlock