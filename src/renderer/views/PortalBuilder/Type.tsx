
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
    name: string;
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
    value?: number;
    items?: Portal[];
    onChange?: (item: any, index: number) => void;
    onDeploy?: (data: Profile, index: number) => void;
    onCreate?: (data: Portal) => void;
    onSaveRename?: (item: { name: string }) => void
    dataTable?: ItemTable[], 
    selectedPortal?: number
}
export {Portal, DeployData, DeploySetting, SideBarProps, Layout, TabContentType}