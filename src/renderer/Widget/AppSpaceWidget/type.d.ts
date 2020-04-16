declare type AppSpaceWidgetProps = {
  showSettingInit?: boolean;
};

declare type ContentAppSpaceWidget = {
  type: 'space' | 'app';
  id: string;
  note: string, 
};

declare type ModalContent = {
  name: string;
  listContent: ContentAppSpaceWidget[];
};
