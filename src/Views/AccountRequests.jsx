import React,{useState,useEffect} from 'react'
import axios from 'axios';
import AccountRequestCard from './../components/Cards/AccountRequestCard';
import './../styles/accountRequest.css'
import { Col, Row } from "react-bootstrap";
import Title from './../components/Title/Title';
import {Root} from '../Config/root';

const AccountRequests = () => {

    var [allRequests,setAllRequests] = useState([]);

    useEffect(async()=>{

        var {data} = await axios.get(`${Root.production}/accountRequest/getAllAccountRequests`);
        setAllRequests(data.message)
        console.log(allRequests)
    },[])

    return (
        <div className='account-req-page' >
            <Title title="Account Requests" />
            <Row>

            {allRequests &&
            allRequests.map((v,i)=>{
                return(
                    <Col xl={3} md={6} className="account-card">
                    <AccountRequestCard
                        myData={v}
                        route={`/account-requests-details/${v._id}`}
                        />
                    </Col>
                )
            })}
            </Row>
        </div>
    )
}

export default AccountRequests
