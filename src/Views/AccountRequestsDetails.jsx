import {Root} from '../Config/root';
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Col,Row} from 'react-bootstrap';
import {Button} from '@mui/material';
import Title from './../components/Title/Title';
import './../styles/accountrequestsdetails.css'

const AccountRequestsDetails = () => {

    var {id} =useParams();
    var [loading,setLoading] = useState(true);
    var [userData,setUserData]=useState({})

    useEffect(async()=>{

    var {data} = await axios.post(`${Root.production}/accountRequest/getAccountRequestById`,{
        requestId:id
    })
    if(data.status==200){
        console.log('success ==>',data)

        var {data} = await axios.post(`${Root.production}/user/getUserById`,{
            accountId:data.message.accountId
        })
        if(data.status==200){
            console.log('success again==>',data)
            setUserData(data.message)
            setLoading(false)
            
        } 
       }

},[])

const handleAccept=async()=>{

    var {data} = await axios.post(`${Root.production}/accountRequest/approveAccountRequest`,{
        accountId:userData._id
    })
    if(data.status==200){
        alert('success')
        console.log(data)
    }
    else{
        console.log(data)
    }

}


const handleReject=async()=>{
    
    var {data} = await axios.post(`${Root.production}/accountRequest/rejectAccountRequest`,{
        accountId:userData._id
    })
    if(data.status==200){
        alert('success')
    }
    else{
        console.log(data)
    }

}
    return (
        <div className="account_request_details_main">
            {/* complaint data */}           
            <Title title="Carrier Account Request"/>
            <Row style={{marginTop:0}}>
            <Col  md={{span : 2 , offset : 6 }} lg={{span:1,offset:7}} xl={{span:1,offset:8}}
                xs={{span:4,offset:2}}
                >
                <Button variant="contained" color="success" onClick={()=>handleAccept()}>Accept</Button>
            </Col>
            <Col md={{span:2,offset:1}} 
                    xl={1}
                    xs={4}>
                <Button variant="contained" style={{color:"#fff"}} color="google" onClick={()=>handleReject()}>Reject</Button>
            </Col>
            </Row>         
            <Row style={{marginTop:0}}>
            <Col md={{span:10,offset:1}} align="left" className="user_details_heading">
            <h3>User Details :</h3>
            </Col></Row>
            <Row><Col md={{span:10,offset:1}} align="left">
            <div style={{background : '#E3E3E3',borderRadius:"2%",padding:20}}
            >
                <p>First Name :  {loading ? <div>Loading...</div>  : userData.firstName}</p>
                <p>Last Name :  {loading ? <div>Loading...</div>  : userData.lastName}</p>
                <p>Rating :  {loading ? <div>Loading...</div>  : userData.rating}</p>
                <p>Address :  {loading ? <div>Loading...</div>  : userData.town +" "+ userData.street +" "+ userData.province +" " + userData.city} </p>
                <p>DateOfBirth :  {loading ? <div>Loading...</div>  : userData.dateOfBirth}</p>
                <p>Phone Number :  {loading ? <div>Loading...</div>  : userData.phoneNumber}</p>
                <p>Gender :  {loading ? <div>Loading...</div>  : userData.gender}</p>
            </div>            
            </Col></Row>

            <Row>
                <Col md={{offset:2,span:4}} align="left">Carrier Role :</Col>
                <Col md={5}
                style={userData.carrierRole ? {color:'darkgreen'} : {color:'red'}}
                className="changeOnHover"
                >{userData.carrierRole ? 'Enabled' : 'Disabled '}</Col>
            </Row>
            <Row>
                <Col md={{offset:2,span:4}} align="left">Shipper Role :</Col>
                <Col md={5}
                style={userData.shipperRole ? {color:'darkgreen'} : {color:'red'}}
                className="changeOnHover"
                >{userData.shipperRole ? 'Enabled' : 'Disabled '}</Col>
            </Row>
        </div>
    )
}

export default AccountRequestsDetails
