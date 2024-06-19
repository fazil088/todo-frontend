import React from 'react'
import Navbar from '../Navbar/Navbar.jsx';
import TaskView from '../TaskView/TaskView.js';
import AddTask from '../AddTask/AddTask';

function HomePage() {
  return (
    <div>
        <Navbar/>
        <TaskView/>
        <AddTask/>
    </div>
  )
}

export default HomePage