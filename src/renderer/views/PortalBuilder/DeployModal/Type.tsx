import{ CSSProperties } from 'react';
import {Profile} from '../../../App'
type ItemTable = {
    key: number | string,
    profile: string,
    domain: string,
    status: 'done' | 'processing' | 'unfulfilled'
}
type DeployTable = {
    data: any
    onDeploy?: (profile: Profile, index: number) => void
}

const doneBtnStyle:CSSProperties = {
    border: '1px solid green',
    color: 'green'
}
const deployBtnStyle:CSSProperties = {
    border: '1px solid orange',
    color: 'orange'
}

export {ItemTable, DeployTable, doneBtnStyle, deployBtnStyle}