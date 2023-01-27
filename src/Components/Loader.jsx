import React from 'react'
import spinner from '../spinner.gif'
const Loader = () => {
  return (
    <div className='w-200 '>
        <img src={spinner} alt='loading'></img>
    </div>
  )
}

export default Loader