declare type AppSpaceWidgetProps = {
  showSettingInit?: boolean;
  listContent:any;
  titleWidget:string
};

declare type CategorytAppSpace = {
  type: string;
  id: string;
};

declare type ModalAppSpace = {
  category: string;
  listCategory:ContentAppSpaceWidget[]
};
