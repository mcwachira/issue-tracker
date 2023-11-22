"use client"
import { Status } from '@prisma/client'
import { SelectContent, SelectRoot, SelectTrigger, Select } from '@radix-ui/themes';
import React from 'react'


const status:{label:string, value?:Status}[] = [

    {label:'All'},
    {label:'Open', value:'OPEN'},
    {label: 'In Progress', value:'IN_PROGRESS'},
    {label:"Closed", value:'CLOSED'}
]
const IssueStatusFilter = () => {
 
  return (
<Select.Root>
<Select.Trigger placeholder='Filter By Status'/>
<Select.Content>

{status.map((status) => (<Select.Item key={status.value} value={status.value || 'ALL'} >

    {status.label}
</Select.Item>))}
</Select.Content>

</Select.Root>
  )
}

export default IssueStatusFilter    