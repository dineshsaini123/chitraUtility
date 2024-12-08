import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Userlisting = () => {
    const navigate=useNavigate();

    const [userlist, userlistupdate] = useState([]);
    const [showlisting, showlistingupdate] = useState(true);
    const [rolelist, rolelistupdate] = useState([]);

    const [username, idchange] = useState('');
    const [name, namechange] = useState('');
    const [role, rolechange] = useState('');
    const [email, emailchange] = useState('');
    //const [mobile, mobilechange] = useState('');
    const [password, pwchange] = useState('');
    //const [address, addresschange] = useState('');
    const [isactive, activechange] = useState(false);



    useEffect(() => {
        let userrole = localStorage.getItem('userrole') != null ? localStorage.getItem('userrole').toString() : '';
        if(userrole !='admin'){
            navigate('/');
        }
        
        //console.log(userrole);

        fetch(`https://localhost:7143/api/User/GetAll`).then(res => {
            return res.json();
        }).then(resp => {
            userlistupdate(resp);
        }).catch((err) => {
            console.log(err.message);
        });
        loadrole();

    }, [showlisting])

    
   /* const handlesubmit = (e) => {
        e.preventDefault();
        //let userobj={username,name,email,password,role,isactive}
        let userobj={username,role,isactive}

        
        console.log(JSON.stringify(userobj));
        

        fetch(`https://localhost:7143/api/User/updaterole`).then(res=>{  
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(userobj)
           }).then(res => {
             toast.success('Updated successfully.');
             showlistingupdate(true);
   
           }).catch((err) => {
               console.log(err.message)
               console.log(1)
               
           })
            
           
    };*/

    const handlesubmit = (e) => {
    e.preventDefault();

    // Only including username, role, and isactive in the payload
    let userobj = { username, role, isactive,email,password };

    console.log(JSON.stringify(userobj));

    fetch(`https://localhost:7143/api/User/updaterole`, {
        method: "PUT", // Correct placement for the HTTP method
        headers: {
            "Content-Type": "application/json", // Specify content type
        },
        body: JSON.stringify(userobj), // Pass the user object as the request body
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json(); // Parse JSON response if necessary
        })
        .then(() => {
            toast.success("Updated successfully.");
            showlistingupdate(true); // Set the listing state to true
        })
        .catch((err) => {
            console.error("Error:", err.message); // Log error to console
            toast.error("Failed to update user.");
        });
};

    
     
    
    const updateuser = (username) => {
        showlistingupdate(false);
        
        
           
         fetch(`https://localhost:7143/api/User/Getbycode?code=${username}`).then(res=>{  
            if(!res.ok){
                return false;
            }
            return res.json();
        }).then(res => {
            
            idchange(res.username);
            namechange(res.name);
            emailchange(res.email);
            pwchange(res.password);
            rolechange(res.role);
           // mobilechange(res.mobile);
            //addresschange(res.address); 
            activechange(res.isactive);
        }).catch((err) => {
            console.log(err.message);
         });

    }
    
    const loadrole = () => {
        fetch(`https://localhost:7143/api/UserRole/GetAllRoles`).then(res => {
            return res.json();
        }).then(resp => {
            rolelistupdate(resp);
        }).catch((err) => {
            console.log(err.message);
        });
    };
    return (
        <div className="container">
            {showlisting &&
                <div className="card">
                    <div className="card-header">
                        <h2>User Listing</h2>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <td>Username</td>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Role</td>
                                    <td>Status</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {userlist &&
                                    userlist.map((item) => (
                                        <tr key={item.username}>
                                            <td>{item.username}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            <td>{item.isactive === true ? 'Active' : 'InActive'}</td>
                                            <td>
                                                <button onClick={() => { updateuser(item.username) }} className="btn btn-primary">Update</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            }

            <div>
                {!showlisting &&
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="row">
                            <div className="offset-lg-2 col-lg-8">
                                <div className="card">
                                    <div className="card-header">
                                        <h2>Update User</h2>
                                    </div>
                                    <div className="card-body">
                                    <div className="form-group">
                                            <label>User Name : {name}</label>
                                            </div>

                                        <div className="form-group">
                                            <label>Role</label>
                                            <select value={role} onChange={e=>rolechange(e.target.value)} className="form-control">
                                                <option value="">Select Role</option>
                                                {rolelist &&
                                                    rolelist.map((item) => (
                                                        <option value={item.code} key={item.code}>{item.name}</option>
                                                    ))}

                                            </select>
                                        </div>

                                        <div className="form-check">
                                            <label>Is Active</label>
                                            <input checked={isactive===true?'checked':''} onChange={e=>activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                        </div>

                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-success" type="submit">Update</button> |
                                        <button onClick={() => { showlistingupdate(true) }} className="btn btn-danger" type="button">Cancel</button>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </form>
                }
            </div>
        </div>


    );
}

export default Userlisting;