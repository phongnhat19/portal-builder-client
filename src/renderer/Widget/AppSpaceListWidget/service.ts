import {PRESET_ICON_APP} from './constant';

const getAppInfo: ({listAppSpace}: {listAppSpace: ModalAppSpace[]}) => Promise<ModalAppSpace[]> = async ({
  listAppSpace,
}: {
  listAppSpace: ModalAppSpace[];
}) => {
  let newListAppSpace = listAppSpace.slice();
  for (let i = 0; i < newListAppSpace.length; i++) {
    let appSpace = newListAppSpace[i];
    for (let j = 0; j < appSpace.listCategory.length; j++) {
      let category = appSpace.listCategory[j];
      if (category.type === 'space') {
        let spaceInfo = {} as any;
        try {
          spaceInfo = await getSpace({id: category.id});
        } catch (error) {
          category.name = error.message;
          continue;
        }
        category.name = spaceInfo.name;
        category.icon = spaceInfo.coverUrl;
        continue;
      }
      let appInfo = {} as {name: string; icon: string; message: any};
      try {
        appInfo = await getApp({id: category.id});
      } catch (error) {
        category.name = error.message;
        continue;
      }
      const appNameAndIcon = parseInfoApp(appInfo);
      if (appNameAndIcon) {
        appInfo.name = appNameAndIcon.name;
        appInfo.icon = appNameAndIcon.icon;
        continue;
      }
      category.name = appInfo.name;
      category.icon = PRESET_ICON_APP.APP39;
    }
  }
  return newListAppSpace;
};

const parseInfoApp = (appInfo: any) => {
  if (appInfo.error) {
    return;
  }
  for (const key in PRESET_ICON_APP) {
    let preset = PRESET_ICON_APP[key] as any;
    if (PRESET_ICON_APP[key] === appInfo.icon.key) {
      return {name: preset.name, icon: PRESET_ICON_APP[key]};
    }
  }
};

const getSpace = ({id}: {id: number}) => {
  return kintone.api(kintone.api.url('/k/v1/space', true), 'GET', {id: id});
};

const getApp = ({id}: {id: number}) => {
  return kintone.api(kintone.api.url('/k/v1/app/settings', true), 'GET', {app: id, lang: 'en'});
};
export {getAppInfo};
