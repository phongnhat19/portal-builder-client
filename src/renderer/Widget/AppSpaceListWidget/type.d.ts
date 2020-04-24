declare type AppSpaceWidgetProps = {
  showSettingInit?: boolean;
  listContent: ModalAppSpace[];
  titleWidget: string;
  isSave:boolean
};

declare type CategorytAppSpace = {
  type: string;
  id: string;
  icon: string;
  name:string;
};

declare type ModalAppSpace = {
  category: string;
  listCategory: ContentAppSpaceWidget[];
};
