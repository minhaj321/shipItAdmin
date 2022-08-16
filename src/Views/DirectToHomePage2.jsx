import React,{useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const DirectToHomePage2 = () => {

    var navigate = useNavigate();

    var user = JSON.parse(localStorage.getItem('admin'));
    console.log(user.account._id)
useEffect(()=>{

    navigate(`/dashboard/${user._id}`);

},[])

    return (
        <div>
            Hellow
        </div>
    )
}

export default DirectToHomePage2
