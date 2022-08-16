import {Root} from '../Config/root';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useParams , useNavigate} from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { Modal, Box, Typography, Button } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Title from './../components/Title/Title';
import '../styles/complaintDetail.css'

const ComplaintDetails = () => {

    var [complaintData, setComplaintData] = useState({});
    var [loading, setLoading] = useState(true);
    var [winnerName, setWinnerName] = useState('');
    var [reason, setReason] = useState('');
    var [winner, setWinner] = useState('true');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    var { id } = useParams();
    var navigate = useNavigate()

    useEffect(async () => {
        var { data } = await axios.post(`${Root.production}/complaint/viewComplaintById`, { complaintId: id });
        if (data.status == 200) {
            setComplaintData(data.message);
            console.log(data)
            setLoading(false)
        }
    }, [])

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


    const handleSubmitResult = async () => {

        if (winner == complaintData.carrier.userId) {
            setWinnerName('Carrier')
        } else if (winner == complaintData.shipper.userId) {
            setWinnerName('Shipper')
        }

        var { data } = await axios.post(`${Root.production}/complaint/giveDecision`, {
            winnerId: winner,
            reason,
            winnerName,
            complaintId: id
        })
        console.log('ueses==>',data)
        if (data.status == 200) {
            alert('success')
            handleClose();
            navigate('/complaints')
        } else {
            alert('failure')
            console.log(data.message)
        }

    }
    return (

        <div className="complaint-detail-page" >
            {/* decision model */}
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <select onChange={(e) => { setWinner(e.target.value) }}>
                        <option disabled selected>Select</option>
                        <option value={complaintData.carrier ? complaintData.carrier.userId : 'Loading'}>Shipper</option>
                        <option value={complaintData.shipper ? complaintData.shipper.userId : 'Loading'}>Carrier</option>
                    </select>
                    <br /><br />
                    <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Enter Reason here"
                        style={{ width: "100%" }}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />

                    <Row>
                        <Col xl={6} md={7} xs={6}>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ width: "100px" }}
                                onClick={() => handleClose()}
                            >
                                Cancel
                            </Button>
                        </Col>
                        <Col xl={{ offset: 2, span: 3 }} md={5}
                            xs={6}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ width: "100px" }}
                                onClick={() => handleSubmitResult()}
                            >
                                Submit
                            </Button>
                        </Col>
                    </Row>

                </Box>
            </Modal>

            <h1 className='main-title' >Complaint #{id} </h1>
            <br /><br />
            <div className='btn-section' >
            <div style={{textAlign:'right'}} >
            <Button
                variant="contained"
                color="primary"
                className='chat-btn'
                onClick={() => handleOpen()}
            >Give Decision</Button>
            </div>
            <div style={{textAlign:'right'}} className='sec-btn-row'  >
             <Button
                variant="contained"
                className='chat-btn'
                color="info"
                onClick={() => navigate(`/view-chat/${complaintData?.shipment.chatRoomId}`)}
            >View Chat</Button>
            </div>
            </div>
            {/* complaint data */}
            <Row style={{ marginTop: 0 }}>
                <Col md={{ span: 10, offset: 1 }}>
                    <h3 style={{textAlign:'left'}} >Complaint Details :</h3>
                </Col>
            </Row>
            <Row><Col md={{ span: 10, offset: 1 }}>
                <div style={{ background: '#E3E3E3', borderRadius: "2%", padding: 20 , textAlign:'left' , width:'100%'}}
                >
                    <p>Title :  {loading ? <div>Loading...</div> : complaintData.complaint.complaintTitle}</p>
                    <p>Description :  {loading ? <div>Loading...</div> : complaintData.complaint.complaintDescription}</p>
                </div>
            </Col></Row>
            {/* carrier data */}
            <Row style={{ marginTop: 0 }}><Col md={{ span: 10, offset: 1 }}>
                <h3 style={{textAlign:'left'}}  >Carrier Details :</h3>
            </Col></Row>
            <Row><Col md={{ span: 10, offset: 1 }}>
                <div style={{ background: '#E3E3E3', borderRadius: "2%", padding: 20 , textAlign:'left' }}
                >
                    {loading ? <div>Loading...</div> : <img src={complaintData.carrier.profilePic} className='sec-img' />}
                    <p>User ID :  {loading ? <div>Loading...</div> : complaintData.carrier.userId}</p>
                    <p>Name :  {loading ? <div>Loading...</div> : complaintData.carrier.firstName}</p>
                    <p>gender :  {loading ? <div>Loading...</div> : complaintData.carrier.gender}</p>
                    <p>cnic :  {loading ? <div>Loading...</div> : complaintData.carrier.cnic}</p>
                    <p>phoneNumber :  {loading ? <div>Loading...</div> : complaintData.carrier.phoneNumber}</p>
                    <p>rating :{loading ? <div>Loading...</div> : complaintData.carrier.rating}</p>
                </div>
            </Col></Row>
            {/* shipper data */}
            <Row style={{ marginTop: 0 }}><Col md={{ span: 10, offset: 1 }}>
                <h3 style={{textAlign:'left'}}  >Shipper Details :</h3>
            </Col></Row>
            <Row><Col md={{ span: 10, offset: 1 }}>
                <div style={{ background: '#E3E3E3', borderRadius: "2%", padding: 20 , textAlign:'left' }}
                >
                    {loading ? <div>Loading...</div> : <img src={complaintData.shipper.profilePic} className='sec-img' />}
                    <p>User ID :  {loading ? <div>Loading...</div> : complaintData.shipper.userId}</p>
                    <p>Name :  {loading ? <div>Loading...</div> : complaintData.shipper.firstName}</p>
                    <p>gender :  {loading ? <div>Loading...</div> : complaintData.shipper.gender}</p>
                    <p>cnic :  {loading ? <div>Loading...</div> : complaintData.shipper.cnic}</p>
                    <p>phoneNumber :  {loading ? <div>Loading...</div> : complaintData.shipper.phoneNumber}</p>
                    <p>rating :{loading ? <div>Loading...</div> : complaintData.shipper.rating}</p>
                </div>
            </Col></Row>
            {/* package data */}
            <Row style={{ marginTop: 0 }}><Col md={{ span: 10, offset: 1 }}>
                <h3 style={{textAlign:'left'}}  >Package Details :</h3>
            </Col></Row>
            <Row><Col md={{ span: 10, offset: 1 }}>
                <div style={{ background: '#E3E3E3', borderRadius: "2%", padding: 20 , textAlign:'left' }}
                >
                    {loading ? <div>Loading...</div> : complaintData.package.packageImageUrl ? <img src={complaintData.package.packageImageUrl} className='sec-img' /> : <div>No image</div>}
                    <p>Package Dimensions :  {loading ? <div>Loading...</div> : complaintData.package.packageHeight}</p>
                    <p>Package Weight :  {loading ? <div>Loading...</div> : complaintData.package.packageWeight}</p>
                    <p>Package Type :  {loading ? <div>Loading...</div> : complaintData.package.packageType}</p>
                    <p>Package Worth :  {loading ? <div>Loading...</div> : complaintData.package.packageWorth}</p>
                    <p>Fragile :  {loading ? <div>Loading...</div> : complaintData.package.fragile}</p>
                    <p>Package Status :  {loading ? <div>Loading...</div> : complaintData.package.packageStatus}</p>
                </div>
            </Col></Row>
            {/* shipment data */}
            <Row style={{ marginTop: 0 }}><Col md={{ span: 10, offset: 1 }}>
                <h3 style={{textAlign:'left'}}  >Shipment Details :</h3>
            </Col></Row>
            <Row><Col md={{ span: 10, offset: 1 }}>
                <div style={{ background: '#E3E3E3', borderRadius: "2%", padding: 20 , textAlign:'left' }}
                >
                    {loading ? <div>Loading...</div> : complaintData.shipment.verificationImage ? <img src={complaintData.shipment.verificationImage} className='sec-img' /> : <div>No image</div>}
                    <p>Pickup City :  {loading ? <div>Loading...</div> : complaintData.shipment.pickupCity}</p>
                    <p>Pickup Address :  {loading ? <div>Loading...</div> : complaintData.shipment.pickupAddress}</p>
                    <p>Destination Address :  {loading ? <div>Loading...</div> : complaintData.shipment.destinationAddress}</p>
                    <p>Destination City :  {loading ? <div>Loading...</div> : complaintData.shipment.destinationCity}</p>
                    <p>DropOff ContactName :  {loading ? <div>Loading...</div> : complaintData.shipment.dropOffContactName}</p>
                    <p>DropOff ContactNumber :  {loading ? <div>Loading...</div> : complaintData.shipment.dropOffContactNumber}</p>
                </div>
            </Col></Row>
        </div>


    )
}

export default ComplaintDetails
