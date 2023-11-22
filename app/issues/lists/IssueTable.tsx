import { IssuesStatusBadge } from '@/components'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import NextLink from 'next/link'
import { Issue, Status } from '@prisma/client'


export interface IssueQuery {
    status:Status, 
      orderBy:keyof Issue,
    page:string
}

interface IssuesTableProps {
    searchParams:IssueQuery,
    issues:Issue[]
  
  
  }

  const columns:{
    label:string;
    className?:string
    value:keyof Issue} []=[
  
    {label:'Issue', value:'title'},
    {label:'Status', value:'status', className:'hidden md:table-cell'},
    {label:'Created', value:'createdAt', className:'hidden md:table-cell'},
  ]


  export const columnNames = columns.map(column => column.value)
  
const IssueTable = ({searchParams, issues}:IssuesTableProps) => {

    

  return (
<Table.Root variant='surface'>
  <Table.Header>
    <Table.Row>
    {columns.map((column) => (
      <Table.ColumnHeaderCell key={column.value} className={column.className}>
<NextLink href={{
  query:{...searchParams, orderBy:column.value}
}}>{column.label }</NextLink>
{column.value === searchParams.orderBy && <ArrowUpIcon className='inline'/>}
      </Table.ColumnHeaderCell>    )
      )}
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {issues.map((issue) =>(
    <Table.Row key={issue.id}>

    <Table.Cell>
      <Link href={`/issues/${issue.id}`}>
      {issue.title}
      </Link>     </Table.Cell>
    <div className="bloc md:hidden"><IssuesStatusBadge status={issue.status}/></div>
    <Table.Cell className='hidden md:table-cell'><IssuesStatusBadge status={issue.status}/></Table.Cell>
    <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
  </Table.Row>
    ) )}

  </Table.Body>

</Table.Root>


  )
}

export default IssueTable