import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState ={
    tasksList:[],     //------->>> All task list add inside array
    selectedTask:{} ,  //-------------->>>>>>>>which task we selected For update task 
    isloading:false,
    error:''
}

// GET

export const getTaskFromServer = createAsyncThunk(
    "tasks/getTaskFromServer", //----------------------------------------->>>>>>>>>>>>> type
    async ( _ ,{rejectWithValue})=>{                                   //------------>>> callback
        const response = await fetch('http://localhost:8000/tasks')
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }
        else{
            return rejectWithValue({error:'No Task found'})
        }
    }
)
 
// POST

export const PostTaskFromServer = createAsyncThunk(
    "tasks/PostTaskFromServer", //----------------------------------------->>>>>>>>>>>>> type
    async ( task ,{rejectWithValue})=>{     
        const option={
            method:'POST',
            body:JSON.stringify(task),
            headers:{
                "content-type":"application/json; charset=UTF-8"
            }
        }                              //------------>>> callback
        const response = await fetch('http://localhost:8000/tasks',option)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }
        else{
            return rejectWithValue({error:'Task Not Added'})
        }
    }
)

// PATCH
export const UpdateTaskFromServer = createAsyncThunk(
    "tasks/UpdateTaskFromServer", //----------------------------------------->>>>>>>>>>>>> type
    async ( task ,{rejectWithValue})=>{     
        const option={
            method:'PATCH',
            body:JSON.stringify(task),
            headers:{
                "content-type":"application/json; charset=UTF-8"
            }
        }                              //------------>>> callback
        const response = await fetch('http://localhost:8000/tasks/'+task.id,option)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }
        else{
            return rejectWithValue({error:'Task Not updated'})
        }
    }
)

export const DeleteTaskFromServer = createAsyncThunk(
    "tasks/DeleteTaskFromServer", //----------------------------------------->>>>>>>>>>>>> type
    async ( task ,{rejectWithValue})=>{     
        const option={
            method:'DELETE',
        }                              //------------>>> callback
        const response = await fetch('http://localhost:8000/tasks/'+task.id,option)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }
        else{
            return rejectWithValue({error:'Task Not Deleted'})
        }
    }
)



const TaskSlice = createSlice({
    name:'tasksSlice',
    initialState:initialState,
    reducers:{
        // addTaskTolist:(state,action)=>{
        //     const id = Math.round(Math.random()*1000);
        //     const task = {...action.payload,id}
        //     state.tasksList.push(task)
        // },
        removeFromList:(state,action)=>{
            state.tasksList = state.tasksList.filter((task)=>task.id !==action.payload.id)
        },
        // updateTaskList:(state,action)=>{
        //     state.tasksList = state.tasksList.map((task)=> task.id === action.payload.id ? action.payload : task)
        // },
        SetSelectedTask:(state,action)=>{
            state.selectedTask = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getTaskFromServer.pending,(state)=>{
            state.isloading=true
        })
        .addCase(getTaskFromServer.fulfilled,(state,action)=>{
            state.isloading=false
            state.error=null
            state.tasksList=action.payload
        })
        .addCase(getTaskFromServer.rejected,(state,action)=>{
            state.error =action.payload.error
            state.isloading=false
            state.tasksList=[]
        })
        .addCase(PostTaskFromServer.pending,(state)=>{
            state.isloading=true
        })
        .addCase(PostTaskFromServer.fulfilled,(state,action)=>{
            state.isloading=false
            state.error=''
            state.tasksList.push(action.payload)
        })
        .addCase(PostTaskFromServer.rejected,(state,action)=>{
            state.error =action.payload.error
            state.isloading=false
        })
        .addCase(UpdateTaskFromServer.pending,(state)=>{
            state.isloading=true
        })
        .addCase(UpdateTaskFromServer.fulfilled,(state,action)=>{
            state.isloading=false
            state.error=''
            state.tasksList = state.tasksList.map((task)=> task.id === action.payload.id ? action.payload : task)
        })
        .addCase(UpdateTaskFromServer.rejected,(state,action)=>{
            state.error =action.payload.error
            state.isloading=false
        })
        .addCase(DeleteTaskFromServer.pending,(state)=>{
            state.isloading=true
        })
        .addCase(DeleteTaskFromServer.fulfilled,(state,action)=>{
            state.isloading=false
            state.error=''
            // state.tasksList = state.tasksList.filter((task)=>task.id !==action.payload.id)
        })
        .addCase(DeleteTaskFromServer.rejected,(state,action)=>{
            state.error =action.payload.error
            state.isloading=false
        })
    }

})

export const {addTaskTolist,removeFromList,updateTaskList,SetSelectedTask} = TaskSlice.actions

export default TaskSlice.reducer //---------->>>> taskReducer