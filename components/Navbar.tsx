'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import clsx from 'clsx'

const Navbar = () => {

  const currentPath = usePathname()

    const links =[
        {label:"Dashboard", href:"/"},
        {label:"Issues", href:"/issues/lists"}
    ]
  return (
   <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center  text-xl'>
    <Link href="/"> <AiFillBug size={30} /></Link>

    <ul className='flex space-x-6'>

        {
            links.map((link) => (<Link  className={clsx(link.href === currentPath ? 'text-zinc-900' :"text-zinc-500", " hover:text-zinc-800 transition-colors")}
             key={link.href}
              href={link.href}>{
                link.label}</Link>))
        }

    </ul>
   </nav>
  )
}

export default Navbar