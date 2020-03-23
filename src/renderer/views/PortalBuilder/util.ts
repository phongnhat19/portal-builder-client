const downloadFile = (filename: string, text: any) => {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
const portalJs = '!function(){"use strict";var e=PORTAL_CONFIG;function t(e){var t,n,r,a,o;switch(e.type){case"DefaultPortal":a=kintone.portal.getContentSpaceElement().nextSibling,(o=document.createElement("div")).appendChild(a),t=o;break;case"IframeWidget":n=e.props,(r=document.createElement("iframe")).src=n.url,r.style.width=n.width,r.style.height=n.height,t=r;break;case"HTMLWidget":t=function(e){var t=document.createElement("div");return t.innerHTML=e.src,t}(e.props);break;default:t=""}return t}function n(){var n=[];return e.forEach(function(e){var r,a;n.push((r=e.tabName,a=e.tabContent,{tabName:r,tabContent:t(a)}))}),new kintoneUIComponent.Tabs({items:n})}kintone.events.on("portal.show",function(e){var t=kintone.portal.getContentSpaceElement(),r=n();return t.appendChild(r.render()),e})}();';
const portalCss = '.kintone-portal-content-space .kuc-tabs-tabs{width:98%}.kintone-portal-content-space .kuc-tabs-tab-contents{min-height:730px;background-color:transparent;box-shadow:none;border-top:1px solid #fff;border-left:none;padding:5px}.kintone-portal-content-space .kuc-tabs-tab-contents iframe{border:none}.kintone-portal-content-space .kuc-tabs-container{background-color:#efefef;box-shadow:none}.kintone-portal-content-space .kuc-tabs-container-selection{background-color:#fff;box-shadow:none}.kintone-portal-content-space .ocean-portal-body{padding:0}';

export {downloadFile, portalJs, portalCss}