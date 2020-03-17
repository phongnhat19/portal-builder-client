
import {ItemTable} from './DeployModal/Type'
import {Tab, TabContentType} from './PortalPreview/Type'
import {Profile} from '../../App'

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
    layout: Layout;
}
// Data return when deploy a domain
type DeploySetting = {
    name?: string;
    value: string;
}

// Data to init deploy form
type DeployData = {
    name?: string;
    value: string;
} 

type SideBarProps = {
    value?: string;
    items?: Portal[];
    onChange?: (item: any, index: number) => void;
    onDeploy?: (data: Profile) => void;
    onCreate?: (data: Portal) => void;
    dataTable?: ItemTable[], 
    data?: DeployData[]
  }
export {Portal, DeployData, DeploySetting, SideBarProps, Layout, TabContentType}