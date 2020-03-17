enum TabContentType {
    IFRAME = 'IframeWidget',
    HTML = 'HTML',
    DEFAULT = 'DefaultPortal'
}
type Tab = {
    tabName: string,
    tabContent: {
        type: TabContentType,
        name?: string,
        props?: TabProps,
        value?: string
    }
}
type TabProps = {
    url: string,
    width: string,
    height: string
    showSettingModal: boolean
}
type TabsLayoutProps = {
    tabIndexPreview: number,
    items?: Tab[],
    onSelectedTabItem: (tabIndex: number) => void,
    onAddItem?: (data: Tab) => void
    onSubItem?: (data: Tab[]) => void
}

export {TabContentType, Tab, TabProps, TabsLayoutProps}