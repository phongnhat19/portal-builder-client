
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import FormData from 'form-data';
import stream from 'stream'

const preparePortalCustomFiles = (files: any, jsKey: any, cssKey: any) => {
  const kintoneUIComponentJsLink = 'https://unpkg.com/@kintone/kintone-ui-component@0.6.0/dist/kintone-ui-component.min.js';
  if (files["DESKTOP"].indexOf(kintoneUIComponentJsLink) === -1) {
    files["DESKTOP"].push(kintoneUIComponentJsLink);
  }
  files["DESKTOP"].push(jsKey);

  const kintoneUIComponentCSSLink = 'https://unpkg.com/@kintone/kintone-ui-component@0.6.0/dist/kintone-ui-component.min.css';
  if (files["DESKTOP_CSS"].indexOf(kintoneUIComponentCSSLink) === -1) {
    files["DESKTOP_CSS"].push(kintoneUIComponentCSSLink);
  }
  files["DESKTOP_CSS"].push(cssKey);

  return files;
}

const prepareSettingToUpdate = (scripts: any, jsKey: string, cssKey: string, fileNames: string[]) => {
  let files: any = {
    "DESKTOP": [],
    "MOBILE": [],
    "DESKTOP_CSS": [],
    "MOBILE_CSS": []
  };

  scripts.filter((script: any) => {
    return fileNames.indexOf(script.name) == -1
  }).map((script: any) => {
    return {
      type: script.type,
      contentId: script.contentId,
      contentUrl: script.contentUrl
    }
  }).forEach((script: any) => {
    files[script.type].push(script.contentUrl ? script.contentUrl : script.contentId);
  });

  files = preparePortalCustomFiles(files, jsKey, cssKey)

  return {
    "jsScope": "ALL",
    "jsFiles": [
      { "jsType": "DESKTOP", "fileKeys": files["DESKTOP"] },
      { "jsType": "MOBILE", "fileKeys": files["MOBILE"] },
      { "jsType": "DESKTOP_CSS", "fileKeys": files["DESKTOP_CSS"] },
      { "jsType": "MOBILE_CSS", "fileKeys": files["MOBILE_CSS"] }
    ]
  };
}

const uploadFile = (setting: any, formData: any) => {
  const passwordAuth = Buffer.from(`${setting.username}:${setting.password}`).toString('base64');
  return axios({
      method: 'POST',
      url: `https://${setting.domain}/k/api/blob/upload.json?_lc=en_US`,
      data: formData,
      headers: { 
        'Content-Type' : formData.getHeaders()['content-type'],
        'X-Cybozu-Authorization': passwordAuth
      }
    });
};

const getSystemSetting = (setting: any) => {
  const passwordAuth = Buffer.from(`${setting.username}:${setting.password}`).toString('base64');
  return axios({
    method: 'POST',
    url: `https://${setting.domain}/k/api/js/getSystemSetting.json?_lc=en_US`,
    headers: {
      'Content-Type': 'application/json',
      'X-Cybozu-Authorization': passwordAuth
    },
    data: {}
  });
}

const updateSetting = (profile: any, setting: any) => {
  const passwordAuth = Buffer.from(`${profile.username}:${profile.password}`).toString('base64');
  return axios({
    method: 'POST',
    url: `https://${profile.domain}/k/api/js/updateSystemSetting.json?_lc=en_US`,
    headers: {
      'X-Cybozu-Authorization': passwordAuth
    },
    data: setting
  });
}

const deployPortalToKintone = (data: any) => {
  const profile = data.profile
  const portal = data.portal

  const jsFileName = 'customPortalTemplate.min.js'
  const cssFileName = 'customPortalTemplate.css'

  let jsFile = fs.readFileSync(path.join(__dirname, `../../dist/${jsFileName}`), 'utf8');
  jsFile = jsFile.replace('PORTAL_CONFIG', JSON.stringify(portal) + ';')
  
  const fileData = new stream.Readable()
  fileData.push(jsFile)
  fileData.push(null) 

  const jsFormData = new FormData();
  jsFormData.append("file", fileData, jsFileName);

  const cssFormData = new FormData();
  cssFormData.append("file", fs.createReadStream(path.join(__dirname, `../../dist/${cssFileName}`)), cssFileName);

  const allRequests = [
    uploadFile(profile, jsFormData),
    uploadFile(profile, cssFormData),
    getSystemSetting(profile)
  ];

  return Promise.all(allRequests).then((resp: any) => {
    const jsKey = resp[0].data.result.fileKey;
    const cssKey = resp[1].data.result.fileKey;
    const systemSetting = resp[2].data.result;
    const scripts = systemSetting.scripts;
    return prepareSettingToUpdate(scripts, jsKey, cssKey, [jsFileName, cssFileName]);
  }).then((setting) => {
    return updateSetting(profile, setting)
  }).then((resp) => {
    return resp.data
  }).catch((error) => {
    console.log(error);
  });
}

export {
  deployPortalToKintone
}