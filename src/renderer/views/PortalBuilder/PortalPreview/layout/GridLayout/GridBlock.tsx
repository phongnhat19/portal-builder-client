import React, { CSSProperties, ReactElement, useRef } from 'react'
import './style.css'
import { MinusCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Row } from 'antd';

const GridBlock = ({ style, content, width, rowIndex, blockIndex, onRemoveBlock, onResizeWidth }: {
  style?: CSSProperties
  content: ReactElement | string | number
  width: number
  rowIndex: number
  blockIndex: number
  onRemoveBlock?: () => void
  onResizeWidth: (item: {width: number}) => void
}) => {

  let finalStyle:CSSProperties = {
    width: `${width}%`
  }

  if (style) {
    finalStyle = {...finalStyle, ...style}
  }

  const blockRef = useRef<HTMLDivElement>(null)
  
  return(
    <div ref={blockRef} style={finalStyle} className="grid-block" onMouseUp={() => {
      onResizeWidth({width: blockRef.current!.offsetWidth})
    }}>
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