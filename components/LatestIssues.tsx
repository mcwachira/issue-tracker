import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { IssuesStatusBadge } from '.'

const LatestIssues = async() => {

    const issues = await prisma.issue.findMany({
      
        orderBy:{
            createdAt:'desc'
        },
        take:6,
        include:{
            assignToUser:true
        }
    })  
    
    return (
        <Card>
            <Heading size='4' mb='5'>

Latest News
            </Heading>
 <Table.Root>
    <Table.Body>

{issues.map((issue) => <Table.Row key={issue.id}><Table.Cell>
    <Flex justify='between'>

    <Flex direction='column' align='start' gap='3'>

<Link href={`/issues/${issue.id}`}>
{issue.title}
</Link>
<IssuesStatusBadge status={issue.status}/>


</Flex>

{issue.assignToUser && (<Avatar src={issue.assignToUser.image!} fallback='?' size='2' radius='full'/>)}
    </Flex>
    </Table.Cell></Table.Row>)}
    </Table.Body>
 </Table.Root>

 </Card>
  )
}

export default LatestIssues