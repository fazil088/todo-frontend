import React, { useEffect, useState } from 'react';
import './TaskView.css'
import { CircleOutlined,DeleteOutline,EditOutlined} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import { setTasks } from '../../Slices/Slices';
import toast from 'react-hot-toast';

function TaskView() {
    const tasks = useSelector((state)=>state.task);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user._id);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatingTask, setUpdatingTask] = useState('');
    const [taskId, setTaskId] = useState('');
    const BASE_URL = "https://todo-backend-hibv.onrender.com";

    useEffect(()=>{
    axios.get(`${BASE_URL}/post/tasks`,{
        params:{
            userId
        }
    }).then((res) => {
        dispatch(setTasks({task:res.data}))
    }).catch(err=>{
        console.log(err)
    })
    },[]) //eslint-disable-line react-hooks/exhaustive-deps


    async function handleDelete(taskId){

        try {
            const deleteTask = await axios.delete(`${BASE_URL}/delete/`,{
                params:{
                    taskId,
                    userId
                }
            });
            const data = await deleteTask.data;
            if(data.error){
                toast.error(data.error)
            }
            else{
                dispatch(setTasks({task:data.posts}));
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async ()=> {
        try {
          const updateResponse = await axios.put(`${BASE_URL}/task/update`,{
            taskId,
            newText:updatingTask,
            userId
          })
          const data = await updateResponse.data;
          if(data.error){
              toast.error(data.error)
          }else{
              dispatch(setTasks({task:data.posts}))
              toast.success(data.message);
              setIsUpdating(false)
          }
        } catch (error) {
          console.log(error)
        }
      }


  return (
    <div className="task-list">
        { 
                isUpdating ? <div className='update-container'>
                    <input type="text" value={updatingTask} onChange={(e)=>{setUpdatingTask(e.target.value)}} />
                    <div className='button-container'>
                        <button onClick={()=>setIsUpdating(false)}>Cancel</button>     
                        <button onClick={handleUpdate}>Submit</button>
                    </div>
                </div>
                :
                tasks.length > 0 ? tasks.map((task, index) =>{
                    return(
                            <div className="task-container" key={index}>
                            <div>
                                <IconButton>
                                    <CircleOutlined/>
                                </IconButton>
                                <p>
                                    {task.task}
                                </p>
                            </div>
                            <div>
                                <IconButton
                                    onClick={()=>{
                                        setIsUpdating(true)
                                        setUpdatingTask(task.task)
                                        setTaskId(task._id)
                                    }}
                                >
                                    <EditOutlined/>
                                </IconButton>
                                <IconButton onClick={()=> handleDelete(task._id)}>
                                    <DeleteOutline/>
                                </IconButton>
                            </div>
                        </div>
                    )
            }) :
            <p>No tasks added</p>
            
        } 
    </div>
  )
}

export default TaskView