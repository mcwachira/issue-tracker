import prisma from '@/prisma/client'
import { Button, Flex, Table } from '@radix-ui/themes'
import React from 'react'
import IssueAction from './IssueAction'
import Link from '@/components/Link'
import { IssuesStatusBadge } from '@/components'
import { Issue, Status } from '@prisma/client'

import Pagination from '@/components/Pagination'
import IssueTable, { columnNames } from './IssueTable'
import { IssueQuery } from './IssueTable';




interface IssuesProps {
  searchParams:IssueQuery


}

const IssuesPage = async ({searchParams}:IssuesProps) => {

  // console.log(searchParams.status)




  //check if status is valid

  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  // const where={status}

  const orderBy =columnNames.includes(searchParams.orderBy) ?{[searchParams.orderBy]: "asc"} : undefined


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
    <Flex direction='column' gap='4' >
        
<IssueAction/>
     
<IssueTable searchParams={searchParams} issues={issues}/>
        
<Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </Flex>
  )
}

export default IssuesPage