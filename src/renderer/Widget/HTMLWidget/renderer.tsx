import React from 'react'

const HTML = ({width, height, htmlString}: {
  htmlString: string,
  width?: string | number,
  height?: string | number,
}) => {

  const createMarkupHTMLWidget = (htmlString: string) => {
    return {__html: htmlString};
  }

  return (
    <div 
      onDrop={(event)=>event.stopPropagation()} 
      style={{width, height}} 
      dangerouslySetInnerHTML={createMarkupHTMLWidget(htmlString)} 
    />
  )
}

export default HTML;