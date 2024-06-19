import React, { useState } from 'react'
import './Authentication.css';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Register() {
  const [inputs, setInputs] = useState({
    name:'',
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const BASE_URL = "https://todo-backend-hibv.onrender.com";



  const handleInputs = (e) => {
    setInputs({...inputs,[e.target.name]:e.target.value})
  }


  let handleSignup =async (e)=>{
    e.preventDefault();
    try{
      const response = await axios.post(`${BASE_URL}/register`,{
        name:inputs.name,
        email:inputs.email,
        password:inputs.password,
      });

      const data = await response.data;
      if(data.error){
        toast.error(data.error)
      }else{
        setInputs({});
        toast.success(data.message);
        navigate('/login')
      }
    }
    catch(err){
      alert("theerror:",err.message)
    }
  }

  return (
    <div className='loginContainer'>
        <h1> TO DO </h1>
        <h3>Create an account</h3>
        <form className='container' onSubmit={handleSignup}>
            <input type="text" placeholder='Username' required name='name' value={inputs.name} onChange={handleInputs} /> 
            <input type="email" placeholder='Email' required name='email' value={inputs.email} onChange={handleInputs} />
            <input type="password" placeholder='Password' required name='password' value={inputs.password} onChange={handleInputs} />
            <button className='button' type='submit'>Sign up</button>
            <Link to={'/login'} >Already have an account</Link>
        </form>
    </div>  
  )
}

export default Register;