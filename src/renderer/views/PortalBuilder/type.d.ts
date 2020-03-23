declare type Layout = {
    type: string,
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