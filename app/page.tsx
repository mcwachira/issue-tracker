import IssueChart from '@/components/IssueChart'
import IssueSummary from '@/components/IssueSummary'
import LatestIssues from '@/components/LatestIssues'
import Pagination from '@/components/Pagination'
import prisma from '@/prisma/client'
import { Flex, Grid } from '@radix-ui/themes'
import { Metadata } from 'next'
import React from 'react'

const Home = async() => {
  const open = await prisma.issue.count({where:{status:'OPEN'}})
  const inProgress = await prisma.issue.count({where:{status:'IN_PROGRESS'}})
  const closed = await prisma.issue.count({where:{status:'CLOSED'}})
  return (
    <Grid columns={{initial:'1', md:'2'}} gap='5'>

    <Flex direction='column' gap='5'>
        

    <IssueSummary open={open} inProgress={inProgress} closed={closed}/>
    <IssueChart open={open} inProgress={inProgress} closed={closed}/>
    </Flex>

       <LatestIssues/>

    {/* <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)}/> */}
</Grid>
  )

}

export default Home

export const metadata:Metadata = {
  title:'Issue Tracker - Dashboard',
  description:'View a summary of project issues'
}