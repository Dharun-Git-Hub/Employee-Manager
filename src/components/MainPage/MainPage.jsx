import './MainPage.css';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();
    return(
        <div className="mainpage-cont">
            <div className='card1' onClick={()=>navigate('/employees')}>
                View Employees
            </div>
            <div className='card2' onClick={()=>navigate('/profile')}>
                Profile
            </div>
        </div>
    )
}

export default MainPage;