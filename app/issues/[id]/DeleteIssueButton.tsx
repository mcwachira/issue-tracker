import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import React from 'react'


const DeleteIssueButton = ({issueId}: {issueId:number}) => {



    const handleDelete = () => {

    }
  return (
    <Button color='red'>
    <TrashIcon />
    Delete Issue
</Button>
  )
}

export default DeleteIssueButton 