import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    task: [],
}

const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTask(state, action){
            state.task = action.payload.task
        },
        setLogin(state,action){
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout(state, action){
            state.user = null;
            state.token = null;
        },
        setTasks(state, action){
            state.task = action.payload.task;
        }
    }
})

export const { addTask,setLogin,setLogout,setTasks } = todoSlice.actions;

export default todoSlice.reducer;