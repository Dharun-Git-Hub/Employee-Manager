import Dashboard from './components/Dashboard/Dashboard';
import Employees from './components/Employees/Employees';
import Login from './components/Login/Login';
import Messages from './components/Messages/Messages';
import Signup from './components/Signup/Signup';
import Profile from './components/Profile/Profile';
import Add from './components/Add/Add';
import MainPage from './components/MainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Login/>}/>
        <Route path = "/signup" element={<Signup/>}/>
        <Route path = "/dashboard" element={<><Dashboard/><MainPage/></>}/>
        <Route path="/employees" element={<><Dashboard/><Employees/></>}/>
        <Route path="/messages" element={<><Dashboard/><Messages/></>}/>
        <Route path="/profile" element={<><Dashboard/><Profile/></>}/>
        <Route path="/add" element={<><Dashboard/><Add/></>}/>
      </Routes>
    </BrowserRouter>
    )
}

export default App;