
import {ItemTable} from './DeployModal/Type'
import {Tab, TabContentType} from './PortalPreview/Type'

type Layout = {
    type: string,
    props: LayoutProps
}
type LayoutProps = {
    tabList: Tab[]
}
type Portal = {
    name?: string;
    value: string;
    type: string;
    layout: Layout | {};
    settingDomain?: any
}
// Data return when deploy a domain
type DeploySetting = {
    name?: string;
    value: string;
    type: string;
    settingDomain: ItemTable
}

// Data to init deploy form
type DeployData = {
    name?: string;
    value: string;
    type: string;
    settingDomain: ItemTable[]
} 

type SideBarProps = {
    value?: string;
    items?: Portal[];
    onChange?: (item: any, index: number) => void;
    onDeploy?: (data: DeploySetting) => void;
    onCreate?: (data: Portal) => void;
    dataTable?: ItemTable[], 
    data?: DeployData[]
  }
export {Portal, DeployData, DeploySetting, SideBarProps, Layout, TabContentType}