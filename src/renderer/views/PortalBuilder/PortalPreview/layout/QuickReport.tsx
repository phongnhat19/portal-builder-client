import React, { useState } from 'react'
import {Button, Table, Text} from '@kintone/kintone-ui-component'
import './style.css'

const QuickReport = () => {

  const [showReport, setShowReport] = useState(false)
  const tableData =  [
    {
      description: 'Meeting',
      relatedTask: 'SSR-123',
      duration: 3,
      detail: 'OKR Meeting'
    }
  ]

  const columns = [
    {
      header: 'Description',
      cell: ({ rowIndex }: any) => {
        return (
          <span>{tableData[rowIndex].description}</span>
        )
      }
    },
    {
      header: 'Related Task ',
      cell: ({ rowIndex }: any) => {
        return (
          <span>{tableData[rowIndex].relatedTask}</span>
        )
      }
    },
    {
      header: 'Detail ',
      cell: ({ rowIndex }: any) => {
        return (
          <Text value={tableData[rowIndex].detail}/>
        )
      }
    },
    {
      header: 'Duration (hours) ',
      cell: ({ rowIndex }: any) => {
        return (
          <Text value={`${tableData[rowIndex].duration}`}/>
        )
      }
    },
  ]

  return(
    <React.Fragment>
      {
        !showReport && 
        <Button text="Generate today report" type="submit" onClick={() => setShowReport(true)} />
      }
      {
        showReport &&
        <div style={{paddingTop: '30px', display: 'flex', justifyContent: 'center', flexDirection: 'column'}} >
          <Table 
            columns={columns}
            data={tableData}
            actionButtonsShown={false}
          />
          <div style={{paddingTop: '20px', display: 'flex', justifyContent: 'flex-end'}}>
            <Button text="Confirm" type="submit" />
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default QuickReport