function createIframeItemContent(props) {
  const iframeEl = document.createElement('iframe');
  iframeEl.src = props.url;
  iframeEl.style.width = props.width;
  iframeEl.style.height = props.height;

  return iframeEl;
}

export {
  createIframeItemContent
}