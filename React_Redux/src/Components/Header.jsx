import React from 'react'
import { useSelector } from 'react-redux'


const Header = () => {

  const {tasksList,error}= useSelector((state)=>state.tasks)



  return (
    <div>
       <h1 className='text-center my-4 text-primary'> Project Management</h1>
       <p className='text-center lead'>{`Currently ${tasksList.length} tasks pending`}</p>
       <>
       {
        (error!=='')?<h4 className='text-center text-danger'>{error}</h4>:null
       }
       </>
    </div>
  )
}

export default Header 