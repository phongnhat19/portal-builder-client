
import {ItemTable} from './DeployModal/Type'
type Portal = {
    name?: string;
    value: string;
    type: string
}
// Data return when deploy a domain
type DeploySetting = {
    portal: Portal ;
    settingDomain: ItemTable
}

// Data to init deploy form
type DeployData = {
    portal: Portal ;
    settingDomain: ItemTable[]
} 

type SideBarProps = {
    value?: string;
    items?: Portal[];
    onChange?: (item: Portal) => void;
    onDeploy?: (data: DeploySetting) => void;
    onCreate?: (data: Portal) => void;
    dataTable?: ItemTable[], 
    data?: DeployData[]
  }
export {Portal, DeployData, DeploySetting, SideBarProps}