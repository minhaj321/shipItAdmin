import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Title from './../components/Title/Title';
import { Col, Row } from "react-bootstrap";
import VehicleCard from '../components/Cards/VehicleCard';
import './../styles/vehicleRequest.css'
import {Root} from '../Config/root';

const Requests = () => {

    const [vehiclesArray,setVehiclesArray] = useState('');
    const [isError,setIsError] = useState(false);
    const [alertText, setAlertText] = useState("");

    useEffect( async ()=>{

        var {data} = await axios.get(`${Root.production}/vehicle/getAllVehicle`);
        if(data.status==200){
            setVehiclesArray(data.message.vehicles);
        }
        else{
            setIsError(true);
            setAlertText(data.message)

        }

    },[])

    return (
        <div className='vehicle-page' >
            <Title title="Vehicles Requests" />
            { isError &&
                  <Col lg={12}>
                    <Alert severity="error">
                      <AlertTitle>Login Error</AlertTitle>
                      {alertText}
                    </Alert>
                  </Col>
}
            <Row>
            {vehiclesArray &&
                vehiclesArray.map((v,i)=>{
                    if(v.status == 'Pending'){                  
                  return(                    
                <Col xl={3} md={6} className="vehicle-card">
                    <VehicleCard myData={v} route={`/vehicle-details/${v._id}`}/>
                </Col>
                  )
                    }
                })
            }
            </Row>

        </div>
    )
}

export default Requests
