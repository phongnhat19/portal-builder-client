import React from 'react';
import HTMLHeader from './components/HTMLHeader';
import './style.css';

const HTML = ({width, height, htmlString, htmlTitle}: {htmlTitle: string;htmlString: string; width?: string | number; height?: string | number}) => {
  const createMarkupHTMLWidget = (newHtmlString: string) => {
    return {__html: newHtmlString};
  };

  return (
    <div className="padding-5">
      {window.kintone && <HTMLHeader htmlTitle={htmlTitle} /> }
      <div
        role="button"
        tabIndex={0}
        onDrop={(event) => event.stopPropagation()}
        style={{width, height}}
        dangerouslySetInnerHTML={createMarkupHTMLWidget(htmlString)}
      />
    </div>
  );
};

export default HTML;
