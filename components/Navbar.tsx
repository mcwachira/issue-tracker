'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import clsx from 'clsx'
import {useSession} from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import Skeleton from '@/components/Skeleton'
const Navbar = () => {

  const currentPath = usePathname()

  const {status, data:session} = useSession();

  if(status === 'loading') return <Skeleton width='3rem'/>

    const links =[
        {label:"Dashboard", href:"/"},
        {label:"Issues", href:"/issues/lists"}
    ]
  return (
   <nav className='border-b mb-5 px-5 py-3   text-xl'>
    <Container>
    <Flex justify='between'>
      <Flex align='center' gap='3'>
      <Link href="/"> <AiFillBug size={30} /></Link>

<ul className='flex space-x-6'>

    {
        links.map((link) => (<li key={link.href} ><Link  className={clsx(link.href === currentPath ? 'text-zinc-900' :"text-zinc-500", " hover:text-zinc-800 transition-colors")}
         key={link.href}
          href={link.href}>{
            link.label}</Link></li>))
    }

</ul>
      </Flex>

      <Box>
          {status === 'authenticated' &&(

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Avatar src={session.user!.image!}
    fallback='?'
    size='2'
    radius='full'
    className='cursor-pointer'
    referre rPolicy='no-reffer'/>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>
      <Text size='2'>
        {session.user!.email}
      </Text>
    </DropdownMenu.Label>
    <DropdownMenu.Item>
    <Link href='/api/auth/signout'>Log Out</Link>
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>

          )}

          {status === 'unauthenticated' && <Link href='/api/auth/signin'>Log In</Link>}
        </Box>
  
    </Flex>
   
    </Container>
       
   </nav>
  )
}

export default Navbar