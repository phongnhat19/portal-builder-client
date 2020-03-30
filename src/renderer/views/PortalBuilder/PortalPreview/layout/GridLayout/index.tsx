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
        style={{ marginBottom: '15px' }}
        onClick={() => {
          const sampleRow = {
            blocks: [{
              content: 'Widget',
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
      <div style={{ height: '85vh', overflow: 'auto' }}>
        <div className='grid-layout'>
          {items.map((item, i) => {
            return <GridRow
              gridRowItem={item}
              key={i}
              rowIndex={i}
              onRemoveGridRow={() => {
                const newLayout = JSON.parse(JSON.stringify(portalList[selectedPortal].layout))
                newLayout.props.rows.splice(i, 1)
                portalList[selectedPortal].layout = newLayout
                setPortalList(portalList);
              }}
              onAddBlock={() => {
                const newBlock = {
                  content: 'Widget',
                  width: 20
                }
                const props = portalList[selectedPortal].layout.props as GridLayout
                props.rows[i].blocks.push(newBlock)
                setPortalList(portalList);
              }}
              onRemoveBlock={({ removedIndex }) => {
                const newLayout = JSON.parse(JSON.stringify(portalList[selectedPortal].layout))
                newLayout.props.rows[i].blocks.splice(removedIndex, 1)
                portalList[selectedPortal].layout = newLayout
                setPortalList(portalList);
              }}
              onResizeWidthBlock={({blockIndex, width }) => {
                const props = portalList[selectedPortal].layout.props as GridLayout
                props.rows[i].blocks[blockIndex].width = width
                setPortalList(portalList);
              }}
            />
          })}
        </div>
      </div>
    </div>
  )
}

export default GridLayout