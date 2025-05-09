import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { photos } from '../../assets/photos';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [clickedName,setClicked] = useState('Dashboard');
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : {};
    const originaluser = parsedUser.username || "User";
    

    const sideBarItems = [
        {name: "Dashboard", action:"/dashboard"},
        {name: "Employees", action:"/employees"},
        {name: "Query", action:"/messages"},
    ];

    const handleClick = (name) => {
        setClicked(name);
        console.log(parsedUser)
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <>
        <div className="dash-nav">
            <span style={{marginLeft: "30px", userSelect: "none"}}>RS - Tech</span>
            <div className="nav-navigations">
                <img title="Profile" src={photos.profilePhotoDefault} onClick={()=>navigate("/profile")}/>
                <i title={originaluser} style={{fontSize: "27px", cursor: "pointer"}} className='bx bx-user'/>
                <i/>
            </div>
        </div>
        <div className="dash-side-cont"> 
            <ul>
                {sideBarItems.map((el)=>(
                    <li className={clickedName === el.name?"active-li":undefined} onClick={()=>{handleClick(el.name); navigate(el.action)}} key={el.name}>{el.name}</li>
                ))}
            </ul>
            <button className='logout' onClick={handleLogout}>Logout</button>
        </div>
        </>
    );
}

export default Dashboard;