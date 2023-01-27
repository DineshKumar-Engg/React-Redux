import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import MyVerticallyCenteredModal from './UpdateTask';
import { useSelector } from 'react-redux';
import {DeleteTaskFromServer, getTaskFromServer, SetSelectedTask} from '../Slice/TaskSlice'
import {removeFromList} from '../Slice/TaskSlice'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Loader from './Loader';
import { unwrapResult } from '@reduxjs/toolkit';

const TaskTable = () => {


const [modalShow,setModalShow]=useState(false)

const {tasksList,isloading} =useSelector((state)=>state.tasks) //------------>>> get data from state and list on table

const dispatch = useDispatch()

const handleEdit=(task)=>{

    setModalShow(true)
    dispatch(SetSelectedTask(task))
}

const handleDelete=(task)=>{
    // dispatch(removeFromList(task))

    dispatch(DeleteTaskFromServer(task))
       .then(()=>{
        dispatch(removeFromList(task))
        
    })
}

useEffect(()=>{
    dispatch(getTaskFromServer())
},[dispatch])




    return (
        <div className='my-5'>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>No:</th>
                        <th>Task Title</th>
                        <th>Task Dexcription</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
            {
                isloading ? (<Loader/>):(
                    
                        tasksList && tasksList.map((item,index)=>(
                           
                            <tr key={item.id}>
                                            <td>{index+1}</td>
                                            <td >{item.title}</td>
                                            <td>{item.content}</td>
                                            <td className='text-center'>
                                                <Button variant="primary" className='mx-2' onClick={()=>handleEdit(item)}>
                                                    <i className="bi bi-pencil-square"></i>
                                                </Button>
                                                <Button variant="primary" className='mx-2' onClick={()=>handleDelete(item)}>
                                                    <i className="bi bi-trash3"></i>
                                                </Button>
                                            </td>
                            </tr>
                            
                        ))
                    
                )
            }
                    
                </tbody>
            </Table>
            <MyVerticallyCenteredModal
             show={modalShow}
             onHide={() => setModalShow(false)}
      />
        </div>
    )
}

export default TaskTable
