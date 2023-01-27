import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addTaskTolist, PostTaskFromServer } from '../Slice/TaskSlice';
import {useDispatch} from 'react-redux'

const FormTask = () => {
  const dispatch =useDispatch()

const [title,setTitle]=useState('')
const[content,setcontent]=useState('')

const AddTask=(e)=>{
    e.preventDefault()
    // dispatch(addTaskTolist({title,content}))

      dispatch(PostTaskFromServer({title,content}))

    setTitle('')
    setcontent('')
}

  return (
    <div className='my-5'>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Task</Form.Label>
        <Form.Control type="text" placeholder="Enter Tasks Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Task Description</Form.Label>
        <Form.Control type="text" placeholder=" Enter Task Description" value={content} onChange={(e)=>setcontent(e.target.value)} />
      </Form.Group>
      <div className='text-end'>
      <Button variant="primary" type="submit" onClick={(e)=>AddTask(e)}>
        Add Task
      </Button>
      </div>
    </Form>
    </div>
  )
}

export default FormTask