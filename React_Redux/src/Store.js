import {configureStore} from '@reduxjs/toolkit'
import taskReducer from './Slice/TaskSlice'

 export const Store = configureStore({
    reducer:{
        tasks:taskReducer
    }
})

