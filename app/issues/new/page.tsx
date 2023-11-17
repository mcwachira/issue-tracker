"use client"
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '../../validationSchema';
import {z} from 'zod'
import ErrorMessage from '@/components/ErrorMessage';


//infer types from my schema

type IssueForm =  z.infer<typeof createIssueSchema>;


const NewIssuePage = () => {

    const [error, setError] = useState('')
    const router=  useRouter()

    const {register, control, handleSubmit, formState:{errors}} = useForm<IssueForm>({
        resolver:zodResolver(createIssueSchema)
    })
  return (

    <div className='max-w-xl'>

{error && <Callout.Root color='red' className='mb-5'>
    <Callout.Text>
        {error}</Callout.Text></Callout.Root>}


    <form className='space-y-3' onSubmit={handleSubmit(async (data) => {

        try {
            await axios.post('/api/issues', data);
            router.push('/issues')
        } catch (error) {
            setError('An expected error occurred')
        }

    })}>
<TextField.Root>

    <TextField.Input placeholder='Title' {...register('title')}/>
</TextField.Root>
<ErrorMessage>{errors.title?.message}</ErrorMessage>

<Controller name='description' control={control} render={({field}) =><SimpleMDE placeholder='description ...' {...field}/> }/>
 <ErrorMessage>{errors.description?.message}</ErrorMessage>

<Button> Submit new issue</Button>

    </form>

    </div>
  )
}

export default NewIssuePage