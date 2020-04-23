import React from 'react';

const IconType = ({type}: {type: string}) => {
  let appType = type === 'app';
  return <span className={appType ? 'app-type border-radius' : 'app-type'}>{appType ? "Icon" : "Cover"}</span>;
};

const PreviewContent = ({listContent}: {listContent: ModalAppSpace[]}) => {  
  const checkEvenNumber = (number: number) => {
    if (number % 2 === 0) {
      return true;
    }
    return false;
  };
  console.log("listContent preview",listContent);
  
  return (
    <div className="widget-content-preview">
      {listContent.map((content,key) => {        
        return (
          <React.Fragment key={key}>
            <div className="widget-content-preview-category">{content.category}</div>
            {content.listCategory.map((category, i) => {
              let numberEven = checkEvenNumber(i);
              let hightLightRow= !numberEven ? "hight-light" : "";        
              return (
                <React.Fragment key={i}>
                  <div className={"widget-content-preview-row " + hightLightRow}>
                    <div className="widget-content-preview-col-icon">
                      {category.icon ? (
                        <img src={category.icon ? category.icon : ''} width={34} height={34} />
                      ) : (
                        <IconType type={category.type} />
                      )}
                    </div>
                    <div className="widget-content-preview-col-app">{category.name ? category.name : `${category.type === "app" ? "App" : "Space"} name (id: ${category.id})`}</div>
                  </div>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PreviewContent;