import IssuesStatusBadge from '@/components/IssuesStatusBadge'
import { Heading, Flex, Card , Text, Box} from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Markdown from 'react-markdown'

const LoadingIssueDetailPage = () => {
    return (
        <Box className='max-w-xl'>


            <Heading><Skeleton/></Heading>
            <Flex className='space-x-3' my='2'>
            <Skeleton/>
                <Text><Skeleton/></Text>
            </Flex>
            <Card className='prose' mt='4'>
              <Skeleton count={3}/>

            </Card>
        </Box>
    )
}

export default LoadingIssueDetailPage