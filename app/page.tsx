import Pagination from '@/components/Pagination'
import React from 'react'

const Home = ({searchParams}: {searchParams:{page:string}}) => {
  console.log(searchParams)
  console.log(searchParams.page)
  return (
    <div>
    <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)}/>
    </div>
  )
}

export default Home