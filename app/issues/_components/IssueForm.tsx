"use client"
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';


import {z} from 'zod'


import { ErrorMessage, Spinner } from '@/components';
import { Issue } from '@prisma/client';
import { IssueSchema } from '@/app/validationSchema';
import SimpleMDE from 'react-simplemde-editor';


type IssueFormData =  z.infer<typeof IssueSchema>;




const IssueForm = ({issue}: {issue?:Issue}) => {

    const [error, setError] = useState('')

    const [isSubmitting, setIsSubmitting] = useState(false)
    const router=  useRouter()

    const {register, control, handleSubmit, formState:{errors},} = useForm<IssueFormData>({
        resolver:zodResolver(IssueSchema)
    })

    const onSubmit =handleSubmit(  async (data) => {

        try {
            setIsSubmitting(true)
            if(issue){
                await axios.patch('/api/issues/' + issue.id, data)
            }else{

                await axios.post('/api/issues', data);
            }

            router.push('/issues')

            router.refresh()
        } catch (error) {
            setIsSubmitting(false)
            setError('An expected error occurred')
        }

    })
  return (

    <div className='max-w-xl'>

{error && <Callout.Root color='red' className='mb-5'>
    <Callout.Text>
        {error}</Callout.Text></Callout.Root>}


    <form className='space-y-3' onSubmit={onSubmit}>
<TextField.Root>

    <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')}/>
</TextField.Root>
<ErrorMessage>{errors.title?.message}</ErrorMessage>

<Controller name='description' control={control}  defaultValue={issue?.description} render={({field}) =><SimpleMDE placeholder='description ...' {...field}/> }/>
 <ErrorMessage>{errors.description?.message}</ErrorMessage>

<Button disabled={isSubmitting}>{issue? "Update Issue": "Submit new issue"} {' '} {isSubmitting && <Spinner/> } </Button>

    </form>

    </div>
  )
}

export default IssueForm