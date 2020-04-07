import React from 'react'

const Iframe = ({url, width, height}: {
  url?: string,
  width?: string | number,
  height?: string | number,
}) => {
  return <iframe src={url} style={{ width, height }} />
}

export default Iframe;