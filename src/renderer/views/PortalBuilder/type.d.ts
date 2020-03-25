declare enum LayoutType {
  TAB = 'Tabs',
  GRID = 'Grid'
}

declare type Layout = {
    type: LayoutType,
    props: TabLayoutProps
}

declare type Portal = {
    name: string;
    layout: Layout;
}

declare type Widget = {
  name: string
  icon: any
}