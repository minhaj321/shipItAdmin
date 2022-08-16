import React,{useState,useEffect} from 'react';
import {Button,Modal,Typography,Box} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Col,Row} from 'react-bootstrap';
import Title from './../components/Title/Title';
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import '../styles/VehicleDetails.css';
import {Root} from '../Config/root';


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };


const VehicleDetails = () => {

    var {id} = useParams();

    var [vehicle,setVehicle] =useState({});
    const Navigate = useNavigate();


    useEffect( async ()=>{
        var {data} = await axios.post(`${Root.production}/vehicle/getVehicleById`,{vehicleId:id});
        console.log(data)
        if(data.status==200){
            vehicle=data.message;
            setVehicle(vehicle);
        }
    },[])

    const acceptVehicle =async () =>{
        const {data} = await axios.post(`${Root.production}/admin/approveVehicleRequest`,{vehicleId:id})
        if(data.status==200){
            alert('accepted successfully')
            Navigate(`/vehicle-requests`);
        }else{
            console.log(data)
        }
    }

    const rejectVehicle =async () =>{
        const {data} = await axios.post(`${Root.production}/admin/declineVehicleRequest`,{vehicleId:id})
        if(data.status==200){
            alert('rejected successfuly')
            console.log(data.message)
            Navigate(`/vehicle-requests`);
        }
    }
    return (
        <div className="main-vehicle-details">
            {/* confirmation of deletion start */}



            {/* confirmation of deletion end */}
            <Title title="Vehicle Details"/>
            <Row>
                <Col md={{span :10}} xs={12} align="left" style={{marginLeft:10}}>
                    <h5>Vehicle Id # {vehicle._id}</h5>
                    </Col>
                <Col md={{span : 2 , offset : 5 }} lg={{span:1,offset:6}} xl={{span:1,offset:7}}
                xs={{span:4,offset:2}}
                >
                    <Button color="success" style={{color:'#fff'}} variant="contained"
                    onClick={()=>acceptVehicle()}
                    className="accpetBtn"
                    >
                        Accept
                    </Button>
                </Col>
                <Col md={{span:2,offset:1}} 
                    xl={1}
                    xs={4}
                    >
                    <Button color="google" style={{color:'#fff'}} variant="contained"
                    onClick={()=>rejectVehicle()}
                    className="rejectBtn"
                    >
                        Reject
                    </Button>
                </Col>
            </Row>
            <Row style={{textDecoration:'underline'}}>
                <Col xs={{offset:1,span:5}} md={{offset : 2 , span : 3}}>Number Plate :</Col>
                <Col xs={5} md={{offset : 1 , span : 4}}>{vehicle.licensePlate}</Col>
            </Row>
            <Row style={{textDecoration:'underline'}}>
                <Col  xs={{offset:1,span:5}} md={{offset : 2 , span : 3}}>Manufacturer :</Col>
                <Col  xs={5} md={{offset : 1 , span : 4}}>{vehicle.manufacturer}</Col>
            </Row>
            <Row style={{textDecoration:'underline'}}>
                <Col  xs={{offset:1,span:5}} md={{offset : 2 , span : 3}}>Model :</Col>
                <Col  xs={5} md={{offset : 1 , span : 4}}>{vehicle.model}</Col>
            </Row>
            <Row style={{textDecoration:'underline'}}>
                <Col  xs={{offset:1,span:5}} md={{offset : 2 , span : 3}}>Model Year :</Col>
                <Col xs={5} md={{offset : 1 , span : 4}}>{vehicle.year}</Col>
            </Row>
            <Row style={{textDecoration:'underline'}}>
                <Col  xs={{offset:1,span:5}} md={{offset : 2 , span : 3}}>Color :</Col>
                <Col xs={5} md={{offset : 1 , span : 4}}>{vehicle.color}</Col>
            </Row>

        </div>
    )
}

export default VehicleDetails
