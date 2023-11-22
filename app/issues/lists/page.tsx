import prisma from '@/prisma/client'
import { Button, Table } from '@radix-ui/themes'
import React from 'react'
import delay from 'delay'
import IssueAction from './IssueAction'
import Link from '@/components/Link'
import { IssuesStatusBadge } from '@/components'
import { Status } from '@prisma/client'

const IssuesPage = async ({searchParams}:{searchParams:{status:Status }}) => {

  // console.log(searchParams.status)

  //check if status is valid

  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const issues = await prisma.issue.findMany({
    where:{
      status
    }
  });
  await delay(2000)

  return (
    <div>
        
<IssueAction/>
     

        <Table.Root variant='surface'>
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell className='hidden md:table-cell'>Created At</Table.ColumnHeaderCell>
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
    </div>
  )
}

export default IssuesPage