import{ CSSProperties } from 'react';
type ItemTable = {
    key: number | string,
    profile: string,
    domain: string,
    status: 'done' | 'processing' | 'unfulfilled'
}
type DeployTable = {
    items: ItemTable[],
    onDeploy?: (data: ItemTable) => void
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