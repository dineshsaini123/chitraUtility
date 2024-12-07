// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const Appheader = () => {
//     const [menuvisible, menuvisiblechange] = useState(true);
//     const [adminuser, adminuserchange] = useState(false);
//     const location = useLocation();
//     const navigate = useNavigate();
//     useEffect(() => {

//         if (location.pathname == '/register' || location.pathname == '/login') {
//             menuvisiblechange(false);
//         } else {
//             let username = localStorage.getItem('username') != null ? localStorage.getItem('username').toString() : '';
//             if (username === '') {
//                 navigate('/login');
//             }
//             menuvisiblechange(true);
//             let userrole = localStorage.getItem('userrole') != null ? localStorage.getItem('userrole').toString() : '';
//             if (userrole === 'admin') {
//                 adminuserchange(true);
//             }else{
//                 adminuserchange(false);
//             }

//         }

//     }, [location]);
//     return (
//         <div>{menuvisible &&
//             <div className="App-header">
//                 <Link to="/">Home</Link>
//                 <Link to="/contact">Contact</Link>
//                 <Link to="/customer">Customer</Link>
//                 <Link to="/associate">Associate</Link>
//                 {adminuser &&
//                     <Link to="/user">User</Link>
//                 }
//                 <Link style={{ float: 'right' }} to="/login">Logout</Link>
//             </div>
//         }
//         </div>
//     );
// }

// export default Appheader;


import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Appheader.css'; // Assuming the CSS file is named Appheader.css

const Appheader = () => {
    const [menuVisible, menuVisibleChange] = useState(true);
    const [adminUser, adminUserChange] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/register' || location.pathname === '/login') {
            menuVisibleChange(false);
        } else {
            let username = localStorage.getItem('username') || '';
            if (username === '') {
                navigate('/login');
            }
            menuVisibleChange(true);
            let userRole = localStorage.getItem('userrole') || '';
            adminUserChange(userRole === 'admin');
        }
    }, [location]);

    return (
        <div>{menuVisible &&
            <div className="app-header">
                <div className="logo">MyApp</div>
                <div className="menu">
                    <Link to="/">Home</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/customer">Customer</Link>
                    <Link to="/associate">Associate</Link>
                    {adminUser && <Link to="/user">User</Link>}
                    <Link to="/login" className="logout">Logout</Link>
                </div>
                <div className="hamburger-menu">
                    <span className="hamburger-icon">&#9776;</span>
                </div>
            </div>
        }
        </div>
    );
}

export default Appheader;
