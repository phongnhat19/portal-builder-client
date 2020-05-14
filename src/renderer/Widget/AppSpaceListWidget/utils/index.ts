const isSameCategoryObject = (currentObject: ModalAppSpaceContent, updateObject: ModalAppSpaceContent) => {
  if (currentObject.category !== updateObject.category) {
    return false;
  }
  const categoryListCurrent = currentObject.categoryList;
  const categoryListUpdate = updateObject.categoryList;
  if (categoryListCurrent.length !== categoryListUpdate.length) {
    return false;
  }
  for (let i = 0; i < categoryListCurrent.length; i++) {
    const category = categoryListCurrent[i];
    const isSameCategory = categoryListUpdate.some(
      (categoryUpdate) =>
        categoryUpdate.type === category.type
        && categoryUpdate.name === category.name
        && categoryUpdate.id === category.id
        && categoryUpdate.icon === category.icon
    );
    if (!isSameCategory) {
      return false;
    }
  }
  return true;
};
const isSameCategoryValue = (currentObjectList: ModalAppSpaceContent[], updateObjectList: ModalAppSpaceContent[]) => {
  if (currentObjectList.length !== updateObjectList.length) {
    return false;
  }
  for (let i = 0; i < currentObjectList.length; i++) {
    for (let j = 0; j < updateObjectList.length; j++) {
      const isSameObject = isSameCategoryObject(currentObjectList[i], updateObjectList[i]);
      if (!isSameObject) {
        return false;
      }
    }
  }
  return true;
};

function redirectApp(categoryType: string, id: number) {
  let path = `/#/space/${id}`;

  if (categoryType === 'app') {
    path = `${id}`;
  }
  window.location.href = `${window.location.origin}/k/${path}`;
}

export {
  isSameCategoryValue,
  redirectApp
};