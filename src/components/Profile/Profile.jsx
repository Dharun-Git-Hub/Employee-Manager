import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { photos } from '../../assets/photos';
import './Profile.css';

const Profile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const employee = state?.employee;

  const [edit, setEdit] = useState(false);

  const storedUser = localStorage.getItem('user');
  const parsedUser = storedUser ? JSON.parse(storedUser) : {}; 

  const [name, setName] = useState(employee?.employee_name || parsedUser.username || '');
  const [id, setId] = useState(employee?.employee_id || parsedUser.id || '');
  const [department, setDepartment] = useState(employee?.department || parsedUser.department || '');
  const [designation, setDesignation] = useState(employee?.designation || parsedUser.designation || '');
  const [project, setProject] = useState(employee?.project || '');
  const [type, setType] = useState(employee?.type || '');
  const [status, setStatus] = useState(employee?.status || '');

  useEffect(() => {
    if (!employee && !parsedUser.username) {
      navigate('/login');
    }
  }, [employee, parsedUser, navigate]);

  const handleUpdateEmployee = async () => {
    if (name.length > 5 && department.length > 3 && designation.length > 5 ) {
      const updatedData = {
        employee_name: name,
        department,
        designation,
        project,
        type,
        status
      };

      try {
        const response = await fetch(`http://localhost:3001/api/employees/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          alert('Employee updated successfully!');
          setEdit(true);
        } else {
          alert('Failed to update employee.');
        }
      } catch (error) {
        console.error('Error updating employee:', error);
        alert('Error while updating. Please try again.');
      }
    } else {
      alert("Fill up all the Fields...");
    }
  };

  return (
    <>
      <div className="profile-cont">
        <span>Employee Profile</span>
      </div>
      <div className="profile-ui">
        <div className="profile-info">
          <img className="main-img" src={photos.profilePhotoDefault} alt="Profile" />
          <input type="file" accept='.jpg,.jpeg,.png,.webp' className='main-img' alt="Profile Upload" />
          <button
            style={{
              marginLeft: "10px",
              border: "1px solid grey",
              backgroundColor: "green",
              color: "white",
              borderRadius: "5px",
            }}
            onClick={() => setEdit(prev => !prev)}
          >
            {!edit ? "Save" : "Edit"}
          </button>
        </div>
        <div className="profile-actions">
          <div className="profile-section">
            <div className="profile-left">
              <label>Name</label>
              <input value={name} onChange={e => setName(e.target.value)} disabled={edit} />
              <label>Department</label>
              <input value={department} onChange={e => setDepartment(e.target.value)} disabled={edit} />
              <label>Project</label>
              <input value={project} onChange={e => setProject(e.target.value)} disabled={edit} />
              <label>Status</label>
              <input value={status} onChange={e => setStatus(e.target.value)} disabled={edit} />
              <button onClick={handleUpdateEmployee}>Update</button>
            </div>
            <div className="profile-right">
              <label>ID</label>
              <input value={id} onChange={e => setId(e.target.value)} disabled />
              <label>Designation</label>
              <input value={designation} onChange={e => setDesignation(e.target.value)} disabled={edit} />
              <label>Type</label>
              <input value={type} onChange={e => setType(e.target.value)} disabled={edit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
