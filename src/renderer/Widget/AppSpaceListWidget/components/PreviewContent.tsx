import React from 'react';
import {redirectApp} from '../utils';

const IconType = ({type}: {type: string}) => {
  const isTypeApp = type === 'app';
  return <span className={isTypeApp ? 'app-type border-radius' : 'app-type'}>{isTypeApp ? 'Icon' : 'Cover'}</span>;
};

const PreviewContent = ({contentList}: {contentList: ModalAppSpaceContent[]}) => {
  const checkEvenNumber = (number: number) => {
    if (number % 2 === 0) {
      return true;
    }
    return false;
  };
  return (
    <div className="widget-content-preview">
      {contentList.map((content, key) => {
        return (
          <React.Fragment key={key}>
            <div className="widget-content-preview-category">{content.category}</div>
            {content.categoryList.map((category, i) => {
              const isEven = checkEvenNumber(i);
              const hightLightRow = !isEven ? 'hight-light' : '';
              return (
                <div
                  role="presentation"
                  onClick={() => {
                    redirectApp(category.type, category.id);
                  }}
                  className={'widget-content-preview-row ' + hightLightRow}
                  key={i}
                >
                  <div className="widget-content-preview-col-icon">
                    {category.icon ? (
                      <img
                        alt="widget-icon"
                        src={category.icon ? category.icon : ''}
                        width={34}
                        height={34}
                      />
                    ) : (
                      <IconType type={category.type} />
                    )}
                  </div>
                  <div className={`widget-content-preview-col-app ${window.kintone ? 'color-link' : ''}`}>{
                    category.name ? category.name : `${category.type === 'app'
                      ? 'App' : 'Space'} name (id: ${category.id})`}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PreviewContent;