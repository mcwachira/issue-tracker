import Pagination from '@/components/Pagination'
import React from 'react'

const Home = () => {
  return (
    <div>
    <Pagination itemCount={100} pageSize={10} currentPage={2}/>
    </div>
  )
}

export default Home