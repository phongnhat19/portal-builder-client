import React, { useContext } from 'react'
import './style.css'
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { PortalContext } from '../../..';
import GridRowItem from './GridRow';

const GridLayout = ({ items = [] }: {
  items?: GridRow[]
}) => {

  const { portalList, setPortalList, selectedPortal } = useContext(PortalContext)

  return (
    <div className='grid-layout-container'>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={() => {
          const sampleRow = {
            blocks: [{
              content: 1,
              width: 20
            }],
            align: 'top',
            justify: 'start'
          }
          portalList[selectedPortal].layout.props.rows.push(sampleRow)
          setPortalList(portalList);
        }}>
        Add Row
        </Button>
      <div className='grid-layout'>
        Grid Layout
        {items.map((item, i) => {
          return <GridRowItem gridRowItem={item} key={i} />
        })}
      </div>
    </div>
  )
}

export default GridLayout