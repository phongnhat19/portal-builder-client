
import {ItemTable} from './DeployModal/Type'
type Portal = {
    name?: string;
    value: string;
    type: string
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
    onChange?: (item: any) => void;
    onDeploy?: (data: DeploySetting) => void;
    onCreate?: (data: Portal) => void;
    dataTable?: ItemTable[], 
    data?: DeployData[]
  }
export {Portal, DeployData, DeploySetting, SideBarProps}