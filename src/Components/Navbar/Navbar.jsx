import React from 'react'
import "./Navbar.css"
import { LogoutOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../Slices/Slices';

function Navbar() {
  const dispatch = useDispatch();
  return (
    <div className='navbar'>
      <div className='leftSideNavbar'>
        <p className='logo'>
          TO DO
        </p>
        <p>
          {
            new Date().toLocaleDateString('en-US',{weekday:'short',day:'2-digit',month:'long'})
          }
        </p>
      </div>
      <div className='rightSideNavbar'>
        <Tooltip title='Logout' arrow>
          <IconButton onClick={()=>{
            dispatch(
              setLogout()
            )
          }}>
            <LogoutOutlined />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}


export default Navbar