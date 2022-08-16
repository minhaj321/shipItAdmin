import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

const DirectToLoginPage1 = () => {
    var navigate = useNavigate();

    var user = localStorage.getItem('admin');
useEffect(()=>{

    navigate(`/login`);

},[])

    return (
        <div>
            Hellow
        </div>
    )
}

export default DirectToLoginPage1
