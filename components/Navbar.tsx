'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import clsx from 'clsx'
import {useSession} from 'next-auth/react'
import { Box } from '@radix-ui/themes'

const Navbar = () => {

  const currentPath = usePathname()

  const {status, data:session} = useSession();

    const links =[
        {label:"Dashboard", href:"/"},
        {label:"Issues", href:"/issues/lists"}
    ]
  return (
   <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center  text-xl'>
    <Link href="/"> <AiFillBug size={30} /></Link>

    <ul className='flex space-x-6'>

        {
            links.map((link) => (<li key={link.href} ><Link  className={clsx(link.href === currentPath ? 'text-zinc-900' :"text-zinc-500", " hover:text-zinc-800 transition-colors")}
             key={link.href}
              href={link.href}>{
                link.label}</Link></li>))
        }

</ul>
        
        <Box>
          {status === 'authenticated' &&( <Link href='/api/auth/signout'>Log Out</Link>)}

          {status === 'unauthenticated' && <Link href='/api/auth/signin'>Log In</Link>}
        </Box>
  
   </nav>
  )
}

export default Navbar