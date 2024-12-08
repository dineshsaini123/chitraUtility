// // import { useEffect, useState } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";

// // const Appheader = () => {
// //     const [menuvisible, menuvisiblechange] = useState(true);
// //     const [adminuser, adminuserchange] = useState(false);
// //     const location = useLocation();
// //     const navigate = useNavigate();
// //     useEffect(() => {

// //         if (location.pathname == '/register' || location.pathname == '/login') {
// //             menuvisiblechange(false);
// //         } else {
// //             let username = localStorage.getItem('username') != null ? localStorage.getItem('username').toString() : '';
// //             if (username === '') {
// //                 navigate('/login');
// //             }
// //             menuvisiblechange(true);
// //             let userrole = localStorage.getItem('userrole') != null ? localStorage.getItem('userrole').toString() : '';
// //             if (userrole === 'admin') {
// //                 adminuserchange(true);
// //             }else{
// //                 adminuserchange(false);
// //             }

// //         }

// //     }, [location]);
// //     return (
// //         <div>{menuvisible &&
// //             <div className="App-header">
// //                 <Link to="/">Home</Link>
// //                 <Link to="/contact">Contact</Link>
// //                 <Link to="/customer">Customer</Link>
// //                 <Link to="/associate">Associate</Link>
// //                 {adminuser &&
// //                     <Link to="/user">User</Link>
// //                 }
// //                 <Link style={{ float: 'right' }} to="/login">Logout</Link>
// //             </div>
// //         }
// //         </div>
// //     );
// // }

// // export default Appheader;


// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import './Appheader.css'; // Assuming the CSS file is named Appheader.css

// const Appheader = () => {
//     const [menuVisible, menuVisibleChange] = useState(true);
//     const [adminUser, adminUserChange] = useState(false);
//     const location = useLocation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (location.pathname === '/register' || location.pathname === '/login') {
//             menuVisibleChange(false);
//         } else {
//             let username = localStorage.getItem('username') || '';
//             if (username === '') {
//                 navigate('/login');
//             }
//             menuVisibleChange(true);
//             let userRole = localStorage.getItem('userrole') || '';
//             adminUserChange(userRole === 'admin');
//         }
//     }, [location]);

//     return (
//         <div>{menuVisible &&
//             <div className="app-header">
//                 <div className="logo text-bold">MyApp</div>
//                 <div className="menu">
//                     <Link to="/">Home</Link>
//                     <Link to="/contact">Contact</Link>
//                     <Link to="/customer">Customer</Link>
//                     <Link to="/associate">Associate</Link>
//                     {adminUser && <Link to="/user">User</Link>}
//                     <Link to="/login" className="logout">Logout</Link>
//                 </div>
//                 <div className="hamburger-menu">
//                     <span className="hamburger-icon">&#9776;</span>
//                 </div>
//             </div>
//         }
//         </div>
//     );
// }

// export default Appheader;

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
    const [menuvisible, menuvisiblechange] = useState(true);
    const [adminuser, adminuserchange] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/register' || location.pathname === '/login') {
            menuvisiblechange(false);
        } else {
            let username = localStorage.getItem('username') || '';
            if (username === '') {
                navigate('/login');
            }
            menuvisiblechange(true);
            let userrole = localStorage.getItem('userrole') || '';
            adminuserchange(userrole === 'admin');
        }
    }, [location, navigate]);

    //    <!<Link to="/associate" className="hover:text-gray-400">Associate</Link>*!>
    // <Link to="/contact" className="hover:text-gray-400">Contact</Link>

    return (
        <div>
            {menuvisible && (
                <header className="bg-gray-800 text-white">
                    <div className="max-w-screen-xl mx-auto px-2 py-2 mb-[3rem] flex justify-between items-center">
                        {/* Logo or Home Link */}
                        <Link to="/" className="text-2xl font-bold">Home</Link>

                        {/* Desktop Links */}
                        <nav className="hidden md:flex space-x-8">
                           
                            <Link to="/customer" className="hover:text-gray-400">Customer</Link>
                        
                            {adminuser && (
                                <Link to="/user" className="hover:text-gray-400">User</Link>
                            )}
                            <Link to="/login" className="float-right hover:text-gray-400">Logout</Link>
                        </nav>

                        {/* Mobile Hamburger Icon */}
                        <button 
                            className="md:hidden text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Dropdown Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden bg-gray-800 p-4">
                            <Link to="/contact" className="block text-white py-2 hover:bg-gray-700">Contact</Link>
                            <Link to="/customer" className="block text-white py-2 hover:bg-gray-700">Customer</Link>
                            <Link to="/associate" className="block text-white py-2 hover:bg-gray-700">Associate</Link>
                            {adminuser && (
                                <Link to="/user" className="block text-white py-2 hover:bg-gray-700">User</Link>
                            )}
                            <Link to="/login" className="block text-white py-2 hover:bg-gray-700">Logout</Link>
                        </div>
                    )}
                </header>
            )}
        </div>
    );
};

export default Appheader;
