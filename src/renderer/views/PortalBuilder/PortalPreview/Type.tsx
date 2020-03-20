enum TabContentType {
  IFRAME = 'Iframe',
  HTML = 'HTML',
  SCHEDULE = 'Schedule',
  DEFAULT = 'DefaultPortal'
}
type Tab = {
  tabName: string,
  tabContent: {
    type: TabContentType,
    name?: string,
    props?: IframeWidgetProps | HTMLWidgetProps,
    value?: string
  }
}
type IframeWidgetProps = {
  url: string,
  width: string,
  height: string,
  showSettingInit?: boolean
}
type HTMLWidgetProps = {
  width: string,
  height: string,
  htmlString: string,
  showSettingInit?: boolean
}
type TabsLayoutProps = {
  // tabIndexPreview: number,
  items?: Tab[],
  // onSelectedTabItem: (tabIndex: number) => void,
  onAddItem?: (data: Tab) => void
  onRemoveItem?: (index: number) => void
}

export { TabContentType, Tab, IframeWidgetProps, HTMLWidgetProps, TabsLayoutProps }