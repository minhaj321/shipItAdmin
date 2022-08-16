import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

const DirectToHomePage1 = () => {
    var navigate = useNavigate();

    var user = JSON.parse(localStorage.getItem('admin'));
useEffect(()=>{

    navigate(`/dashboard/${user._id}`);

},[])

    return (
        <div>
            Hellow
        </div>
    )
}

export default DirectToHomePage1
