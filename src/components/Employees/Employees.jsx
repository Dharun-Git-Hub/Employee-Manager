import { useNavigate } from 'react-router-dom';
import { photos } from '../../assets/photos';
import { useEffect, useState } from 'react';
import './Employees.css';

const Employees = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch("http://localhost:3001/get-employees")
            .then(res => res.json())
            .then(data => setEmployees(data))
            .catch(err => console.error("Failed to fetch:", err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            fetch(`http://localhost:3001/api/employees/${id}`, {
                method: "DELETE" 
            })
            .then(res => {
                if (!res.ok) throw new Error("Delete failed");
                setEmployees(prev => prev.filter(emp => emp.employee_id !== id));
            })
            .catch(err => console.error("Error deleting employee:", err));
        }
    };

    const filteredEmployees = employees.filter(emp =>
        emp.employee_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="employees-cont">
            <div className='employee-1-cont'>
                <span><span style={{cursor: "pointer"}} className='bx bx-arrow-back' onClick={()=>navigate(-1)}></span>Employee</span>
                <div style={{marginLeft: "10px"}}>
                    <input 
                        type="text" 
                        placeholder='Search by name' 
                        className='employee-search'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button 
                        className='employee-add-btn' 
                        style={{cursor: "pointer"}} 
                        onClick={() => navigate("/add")}
                    >
                        Add Employee +
                    </button>
                </div>
            </div>
            <div className='employee-2-cont'>
                <div className="employee-list-cont">
                    <table className='employee-table'>
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Employee ID</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Project</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredEmployees.map((emp, index) => (
                            <tr key={index} style={{textAlign: "center"}}>
                                <td>
                                    <img
                                        src={photos.profilePhotoDefault}
                                        alt="profile"
                                        style={{width:"25px", height: "25px", marginRight: "10px", borderRadius: "50%"}}
                                    />
                                    {emp.employee_name}
                                </td>
                                <td>{emp.employee_id}</td>
                                <td>{emp.department}</td>
                                <td>{emp.designation}</td>
                                <td>{emp.project}</td>
                                <td>{emp.type}</td>
                                <td>{emp.status}</td>
                                <td>
                                    <button onClick={() => navigate("/profile", { state: { employee: emp } })}>Edit</button>
                                    <button onClick={() => handleDelete(emp.employee_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Employees;
