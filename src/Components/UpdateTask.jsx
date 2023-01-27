import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {UpdateTaskFromServer, updateTaskList} from '../Slice/TaskSlice'
import { useDispatch } from 'react-redux';

const MyVerticallyCenteredModal = (props) => {


    const [title,setTitle]=useState('')
    const[content,setcontent]=useState('')
    const dispatch = useDispatch()

    const UpdateTask=(e)=>{   
        props.onHide()
    // dispatch(updateTaskList({id,title,content}))

    dispatch(UpdateTaskFromServer({id,title,content}))


    }

const {selectedTask}=useSelector((state)=>state.tasks)

const [id,setId]=useState(0)

useEffect(()=>{

    if(Object.keys(selectedTask).length !==0){
        setTitle(selectedTask.title)
        setcontent(selectedTask.content)
        setId(selectedTask.id)
    }
},[selectedTask])



  return (
    <div>
            <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Task</Form.Label>
        <Form.Control type="text" placeholder="Enter Tasks Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Task Description</Form.Label>
        <Form.Control type="text" placeholder=" Enter Task Description" value={content} onChange={(e)=>setcontent(e.target.value)} />
      </Form.Group>
    </Form>
      </Modal.Body>
      <Modal.Footer>
      <div className='text-end'>
      <Button variant="primary" type="submit" onClick={(e)=>UpdateTask(e)}>
        Update Task
      </Button>
      </div>      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default MyVerticallyCenteredModal