import IssueChart from '@/components/IssueChart'
import IssueSummary from '@/components/IssueSummary'
import LatestIssues from '@/components/LatestIssues'
import Pagination from '@/components/Pagination'
import prisma from '@/prisma/client'
import { Flex } from '@radix-ui/themes'
import React from 'react'

const Home = async() => {
  const open = await prisma.issue.count({where:{status:'OPEN'}})
  const inProgress = await prisma.issue.count({where:{status:'IN_PROGRESS'}})
  const closed = await prisma.issue.count({where:{status:'CLOSED'}})
  return (
    <div >
      {/* <LatestIssues/> */}
      <IssueChart open={open} inProgress={inProgress} closed={closed}/>
    {/* <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)}/> */}
    </div>
  )
}

export default Home