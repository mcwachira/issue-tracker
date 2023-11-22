import prisma from '@/prisma/client'
import { Button, Table } from '@radix-ui/themes'
import React from 'react'
import delay from 'delay'
import IssueAction from './IssueAction'
import Link from '@/components/Link'
import { IssuesStatusBadge } from '@/components'
import { Issue, Status } from '@prisma/client'
import NextLink from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import Pagination from '@/components/Pagination'




interface IssuesProps {
  searchParams:{
    status:Status, 
    orderBy:keyof Issue,
  page:string}


}

const IssuesPage = async ({searchParams}:IssuesProps) => {

  // console.log(searchParams.status)


const columns:{label:string;
  className?:string,
  
  value:keyof Issue} []=[

  {label:'Issue', value:'title'},
  {label:'Status', value:'status', className:'hidden md:table-cell'},
  {label:'Created', value:'createdAt', className:'hidden md:table-cell'},
]

  //check if status is valid

  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  // const where={status}

  const orderBy =columns.map(column => column.value).includes(searchParams.orderBy) ?{[searchParams.orderBy]: "asc"} : undefined


  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where:{
      status
    },
    orderBy,
    skip:(page - 1) * pageSize,
    take:pageSize //number of records to fetch
  });

  const issueCount = await prisma.issue.count({where:{status}})

  return (
    <div>
        
<IssueAction/>
     

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


<Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </div>
  )
}

export default IssuesPage