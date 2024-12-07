
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Addcustomer from './AddCustomer';
import './App.css';
import Appheader from './AppHeader';
import Contact from './Contact';
import Customer from './Customer';
import Editcustomer from './EditCustomer';
import Error from './Error';
import Home from './Home';
import {ToastContainer} from 'react-toastify'
import Registeration from './Registeration';
import Login from './Login';
import Userlisting from './Userlisting';
import Associate from './Associate';

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
      <Appheader></Appheader>
      <Routes>
       <Route path='/' element={<Home/>}></Route>
       <Route path='contact' element={<Contact/>}></Route>
       <Route path='customer' element={<Customer/>}></Route>
       <Route path='customer/create' element={<Addcustomer/>}></Route>
       <Route path='customer/edit/:code' element={<Editcustomer/>}></Route>
       <Route path='register' element={<Registeration/>}></Route>
       <Route path='login' element={<Login/>}></Route>
       <Route path='user' element={<Userlisting/>}></Route>
       <Route path='associate' element={<Associate/>}></Route>
       <Route path='*' element={<Error></Error>}></Route>
      </Routes>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
