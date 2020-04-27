import React from 'react';
import HTMLHeader from './components/HTMLHeader';
import './style.css'

const HTML = ({width, height, htmlString,htmlTitle}: {htmlTitle:string;htmlString: string; width?: string | number; height?: string | number}) => {
  const createMarkupHTMLWidget = (htmlString: string) => {
    return {__html: htmlString};
  };

  return (
    <React.Fragment>
      {window.kintone && <HTMLHeader htmlTitle={htmlTitle} /> }
      <div
        onDrop={(event) => event.stopPropagation()}
        style={{width, height}}
        dangerouslySetInnerHTML={createMarkupHTMLWidget(htmlString)}
      />
    </React.Fragment>
  );
};

export default HTML;
