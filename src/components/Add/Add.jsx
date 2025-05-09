import { useEffect, useState } from 'react';
import './Add.css'
import { photos } from '../../assets/photos';

const Add = () => {
    const [name,setName] = useState("");
    const [id,setId] = useState("");
    const [department,setDepartment] = useState("");
    const [designation,setDesignation] = useState("");
    const [project,setProject] = useState("");
    const [type,setType] = useState("");
    const [status,setStatus] = useState("");
    const [image,setImage] = useState("");

    useEffect(()=>{
        if(name.length > 3 && id.length > 3 && id.length < 5 && department.length > 3 && designation.length > 5){
            document.querySelector(".profile-actions button").disabled = false;
        }
        else{
            document.querySelector(".profile-actions button").disabled = true;
        }
    });

    const handleAdd = async () => {
        const formData = new FormData();
        formData.append("employee_id", id);
        formData.append("employee_name", name);
        formData.append("department", department);
        formData.append("designation", designation);
        formData.append("project", project);
        formData.append("type", type);
        formData.append("status", status);
        formData.append("image", image);
    
        const response = await fetch("http://localhost:3001/add-employee", {
            method: "POST",
            body: formData
        });
    
        const result = await response.text();
        alert(result);
        setName("");
        setDepartment(""); 
        setDesignation("");
        setProject("");
        setType("");
        setStatus("");
    };
    

    return (
        <>
        <div className="profile-cont">
            <span>Add an Employee</span>
        </div>
        <div className="profile-ui">
            <div className="profile-info">
                <img src={photos.profilePhotoDefault} className='main-img'/>
                <input type="file" accept=".jpeg,.jpg,.webp,.png" className='main-img' onChange={(e) => setImage(e.target.files[0])} required/>
            </div>
            <div className="profile-actions">
                <div className="profile-section">
                    <div className="profile-left">
                        <label>Name<span style={{color: 'red'}}>*</span></label>
                        <input onChange={(event)=>setName(event.target.value)}/>
                        <label>Department<span style={{color: 'red'}}>*</span></label>
                        <input onChange={(event)=>setDepartment(event.target.value)}/>
                        <label>Project</label>
                        <input onChange={(event)=>setProject(event.target.value)}/>
                        <label>Status</label>
                        <input onChange={(event)=>setStatus(event.target.value)}/>
                        <button onClick={handleAdd}>Add</button>
                    </div>
                    <div className="profile-right">
                        <label>ID<span style={{color: 'red'}}>*</span></label>
                        <input onChange={(event)=>setId(event.target.value)}/>
                        <label>Designation<span style={{color: 'red'}}>*</span></label>
                        <input onChange={(event)=>setDesignation(event.target.value)}/>
                        <label>Type</label>
                        <input onChange={(event)=>setType(event.target.value)}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Add;