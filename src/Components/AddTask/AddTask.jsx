import React, { useState } from 'react';
import "./AddTask.css";
import {Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setTasks } from '../../Slices/Slices';

function AddTask() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user._id)
  const BASE_URL = "https://todo-backend-hibv.onrender.com";

  const handlePost = async () => {
    try{
       const postResponse = await axios.post(`${BASE_URL}/task`,{
        userId,
        task:input,
        date: new Date().toLocaleDateString('en-US',{day:'2-digit',month:'2-digit',year:'numeric'})
       })

       const postData = await postResponse.data;
       
       if(postData.error){
        toast.error(postData.error)
       }else{
        dispatch(setTasks({task:postData.post}))
        setInput('');
        toast.success(postData.message);
       }
    }
    catch(err){
      console.log(err)
    }
  }
  
  return (
    <div className='input-page'>
      <div className="input-task">
        <input type="text" placeholder='Add a task' value={input} onChange={(e)=> setInput(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key === "Enter"){
            handlePost()
          }
        }} 
        />
        {
          input && <IconButton onClick={handlePost}>
          <Add fontSize='large'/>
        </IconButton>
        }
      </div>
    </div>
  )
}

export default AddTask