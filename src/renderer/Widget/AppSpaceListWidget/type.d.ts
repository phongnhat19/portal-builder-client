declare type AppSpaceWidgetProps = {
  showSettingInit?: boolean;
  contentList: ModalAppSpaceContent[];
  widgetTitle: string;
};

declare type CategorytAppSpace = {
  type: string;
  id: string;
  icon: string;
  name:string;
};

declare type ModalAppSpaceContent = {
  category: string;
  categoryList: ContentAppSpaceWidget[];
};
