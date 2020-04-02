import React, { useContext } from 'react'
import './style.css'
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { PortalContext } from '../../..';
import GridRow from './GridRow';
import { CONTENT_TYPE } from '../../../Widget/constant';

const GridLayout = ({ items = [] }: {
  items?: GridRow[]
}) => {

  const { portalList, setPortalList, selectedPortal } = useContext(PortalContext)

  return (
    <div className='grid-layout-container'>
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
                const newBlock: GridBlock = {
                  type: CONTENT_TYPE.EMPTY as ContentType,
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
              onResizeWidthBlock={({ blockIndex, width }) => {
                const props = portalList[selectedPortal].layout.props as GridLayout
                props.rows[i].blocks[blockIndex].width = width
                setPortalList(portalList);
              }}
            />
          })}

          <Button
            type="dashed"
            icon={<PlusCircleOutlined />}
            className="grid-layout-btn-add"
            style={{ width: '100%', minHeight: '100px', backgroundColor: '#fef2e7', borderColor: '#fce0c7' }}
            onClick={() => {
              const sampleRow = {
                blocks: [{
                  type: CONTENT_TYPE.EMPTY as ContentType,
                  width: 20
                }],
                align: 'top',
                justify: 'start'
              } as GridRow
              const props = portalList[selectedPortal].layout.props as GridLayout
              props.rows.push(sampleRow)
              setPortalList(portalList);
            }}
          ></Button>
        </div>
      </div>
    </div>
  )
}

export default GridLayout