import React from 'react';
import { Button } from '@mui/material'
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    
    const navigate = useNavigate();

    return ( 
        <div className="navBar">
            <h1 className='shipit-h1' >ShipIt</h1>
            <div className="button-section">
                <Button variant='outlined' color='secondary' className="btn login_btn"
                 onClick={()=>navigate('/login')}>Log In</Button>
            </div>
        </div>
     );
}
 
export default NavBar;