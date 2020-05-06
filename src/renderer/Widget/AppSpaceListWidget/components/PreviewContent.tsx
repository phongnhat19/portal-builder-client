import React from 'react';

const IconType = ({type}: {type: string}) => {
  const isTypeApp = type === 'app';
  return <span className={isTypeApp ? 'app-type border-radius' : 'app-type'}>{isTypeApp ? 'Icon' : 'Cover'}</span>;
};

const PreviewContent = ({contentList}: {contentList: ModalAppSpaceContent[]}) => {
  function redirectApp(categoryType: string, id: number) {
    let path = `/#/space/${id}`;

    if (categoryType === 'app') {
      path = `${id}`;
    }
    window.location.replace(`${window.location.origin}/k/${path}`);
  }
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
                <div className={'widget-content-preview-row ' + hightLightRow} key={i}>
                  <div className="widget-content-preview-col-icon">
                    {category.icon ? (
                      <img
                        role="presentation"
                        onDoubleClick={() => {
                          redirectApp(category.type, category.id);
                        }}
                        alt="widget-icon"
                        src={category.icon ? category.icon : ''}
                        width={34}
                        height={34}
                      />
                    ) : (
                      <IconType type={category.type} />
                    )}
                  </div>
                  <div className="widget-content-preview-col-app">{
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