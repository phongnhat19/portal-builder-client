import React, { useContext } from 'react'
import './style.css'
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { PortalContext } from '../../..';
import GridRow from './GridRow';

const GridLayout = ({ items = [] }: {
  items?: GridRow[]
}) => {

  const { portalList, setPortalList, selectedPortal } = useContext(PortalContext)

  return (
    <div className='grid-layout-container'>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        style={{marginBottom: '15px'}}
        onClick={() => {
          const sampleRow = {
            blocks: [{
              content: 1,
              width: 20
            }],
            align: 'top',
            justify: 'start'
          } as GridRow
          const props = portalList[selectedPortal].layout.props as GridLayout
          props.rows.push(sampleRow)
          setPortalList(portalList);
        }}>
        Add Row
      </Button>
      <div style={{height: '85vh', overflow: 'auto'}}>
        <div className='grid-layout'>
          {items.map((item, i) => {
            return <GridRow gridRowItem={item} key={i} rowIndex={i} />
          })}
        </div>
      </div>
    </div>
  )
}

export default GridLayout