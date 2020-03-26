import React, { CSSProperties, ReactElement } from 'react'
import './style.css'

const GridBlock = ({style, content, width, rowIndex, blockIndex}: {
  style?: CSSProperties
  content: ReactElement | string | number
  width: number
  rowIndex: number
  blockIndex: number
}) => {

  let finalStyle:CSSProperties = {
    width: `${width}%`
  }

  if (style) {
    finalStyle = {...finalStyle, ...style}
  }

  return(
    <div style={finalStyle} className="grid-block">
      {content}
    </div>
  )
}

export default GridBlock