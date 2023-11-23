import LatestIssues from '@/components/LatestIssues'
import Pagination from '@/components/Pagination'
import { Flex } from '@radix-ui/themes'
import React from 'react'

const Home = ({searchParams}: {searchParams:{page:string}}) => {
  console.log(searchParams)
  console.log(searchParams.page)
  return (
    <div >
      <LatestIssues/>
    {/* <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)}/> */}
    </div>
  )
}

export default Home