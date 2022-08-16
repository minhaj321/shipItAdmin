import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Col, Row } from "react-bootstrap";
import './../styles/VehiclesList.css';
import ComplaintCard from '../components/Cards/ComplaintCard';
import Title from './../components/Title/Title';
import {Root} from '../Config/root';

const Complaints = () => {

    var [complaintList,setComplaintList] =useState([]);

    useEffect(async()=>{
            var {data} = await axios.post(`${Root.production}/complaint/viewComplaint`);
        if(data.status==200){
            setComplaintList(data.message);
        }else{

        }

    },[])

    return (
        <div className='complaint-page' >
        <Title title="Complaints" />
        <Row>
        {complaintList &&
            complaintList.map((v,i)=>{
                if(v.status == 'Open'){                  
              return(                    
            <Col xl={3} md={6} className="vehicle-card">
                <ComplaintCard myData={v} route={`/complaint-details/${v._id}`}/>
            </Col>
              )
                }
            })
        }
        </Row>

    </div>
    )
}

export default Complaints
