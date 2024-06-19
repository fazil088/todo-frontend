import './App.css';
import HomePage from './Components/HomePage/HomePage';
import Register from './Components/Authentication/Register';
import Login from './Components/Authentication/Login';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Toaster} from 'react-hot-toast';

function App() {
  const isAuth = Boolean(useSelector((state)=>state.token));
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster position='bottom-right' toastOptions={{duration:2000}}/>
        <Routes>
          <Route path='/' element={isAuth?  <HomePage/> : <Navigate to='/login'/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
