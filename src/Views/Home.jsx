import {Root} from '../Config/root';
import React,{useState,useEffect} from 'react'
import Title from '../components/Title/Title';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import './../styles/home.css';



const Home = () => {

  var [getAllUsers,setGetAllUsers] = useState(0);
  var [getAllCarriers,setGetAllCarriers] = useState(0);
  var [getAllActiveAuction,setGetAllActiveAuction] = useState(0);
  var [getAllActiveTrip,setGetAllActiveTrip] = useState(0);
  var [getAllShipment,setGetAllShipment] = useState(0);
  var [getAllActiveShipment,setGetAllActiveShipment] = useState(0);
  var [cancelShipment,setCancelShipment] = useState(0);
  var [countGetAllVehicle,setCountGetAllVehicle] = useState(0);
  var [countAccountRequest,setCountAccountRequest] = useState(0);
  var [cond,setCond] = useState(false)

useEffect(async()=>{

  var {data} = await axios.get(`${Root.production}/admin/getAllUsers`);
  setGetAllUsers(data.message.totalUserCount);

  var {data} = await axios.get(`${Root.production}/admin/getAllCarriers`);
  setGetAllCarriers(data.message.totalCarrierCount);

  var {data} = await axios.get(`${Root.production}/admin/getAllActiveAuction`);
  setGetAllActiveAuction(data.message.totalActiveAuctionCount);

  var {data} = await axios.get(`${Root.production}/admin/getAllActiveTrip`);
  setGetAllActiveTrip(data.message.totalActiveTripCount);

  var {data} = await axios.get(`${Root.production}/admin/getAllShipment`);
  setGetAllShipment(data.message.totalShipmentCount);

  var {data} = await axios.get(`${Root.production}/admin/getAllActiveShipment`);
  setGetAllActiveShipment(data.message.totalActiveShipmentCount);

  var {data} = await axios.get(`${Root.production}/admin/cancelShipment`);
  setCancelShipment(data.message);

  var {data} = await axios.get(`${Root.production}/admin/countGetAllVehicle`);
  setCountGetAllVehicle(data.message);


  var {data} = await axios.get(`${Root.production}/admin/countAccountRequest`);
  setCountAccountRequest(data.message);

  setCond(true)

},[])

  return (

    cond != false ? (
      <div className="home_main">
      {cond &&
        <div>
            <Title title="Welcome Back Admin" />
            <Row>
        <Col sm={{ span: 4 }}>
          <h5>All Users</h5>
          <p>{getAllUsers}</p>
        </Col>
        <Col
        className="changeBorder"
          sm={4}
          style={{
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
          }}
        >
          <h5>All Carriers</h5>
          <p>{getAllCarriers}</p>
        </Col>
        <Col sm={4}>
          <h5>All Active Auction</h5>
          <p>{getAllActiveAuction}</p>
        </Col>
      </Row>
      <Row>
        <Col sm={{ span: 4 }}>
          <h5>All Active Trip</h5>
          <p>{getAllActiveTrip}</p>
        </Col>

        <Col
          sm={4}
          className="changeBorder"
          style={{
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
          }}
        >
          <h5>All Shipment</h5>
          <p>{getAllShipment}</p>
        </Col>
        <Col sm={4}>
          <h5>All Active Shipment</h5>
          <p>{getAllActiveShipment}</p>
        </Col>
      </Row>
      <Row>
        <Col sm={{ span: 4 }}>
          <h5>Cancelled Shipment</h5>
          <p>{cancelShipment}</p>
        </Col>

        <Col
        className="changeBorder"
        sm={4}
          style={{
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
          }}
        >
          <h5>All Vehicle</h5>
          <p>{countGetAllVehicle}</p>
        </Col>
        <Col sm={4}>
          <h5>Account Requests</h5>
          <p>{countAccountRequest}</p>
        </Col>
      </Row>
        </div>
      }
    </div>
    ) : ('Loading...')
    )
}

export default Home
