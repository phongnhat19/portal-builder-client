function createHTMLItemContent(props) {
  const htmlEl = document.createElement('div');
  htmlEl.innerHTML = props.htmlString;

  return htmlEl;
}

export {
  createHTMLItemContent
}