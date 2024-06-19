import React, { useState } from 'react'
import './Authentication.css';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { setLogin } from '../../Slices/Slices';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [inputs, setInputs] = useState({
    email:'',
    password:''
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = "https://todo-backend-hibv.onrender.com";

  const handleInputs = (e) => {
    setInputs({...inputs,[e.target.name]:e.target.value})
  }

  const handleLogin = async (e) =>{
    e.preventDefault();
    try{
      const response = await axios.post(`${BASE_URL}/login`,{
        email:inputs.email,
        password:inputs.password
      })
      const user = await response.data;
      if(user.error){
        toast.error(user.error)
      }else{
        dispatch(setLogin({
          user:user.user,
          token: user.token
        }))
        toast.success(user.message)
        navigate('/')
        setInputs({})
      }
    }catch(err){
      alert(err.message)
    }
  }
  return (
    <div className='loginContainer'>
        <h1> TO DO </h1>
        <h3>Login</h3>
        <form className='container' onSubmit={handleLogin}>
            <input type="email" placeholder='Email' required value={inputs.email} name='email' onChange={handleInputs} />
            <input type="password" placeholder='Password' required value={inputs.password} name='password' onChange={handleInputs} />
            <button className='button' type='submit'>Sign in</button>
            <Link to={'/register'} >Don't have an account</Link>
        </form>
    </div>  
  )
}

export default Login