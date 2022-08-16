import React from 'react'
import Title from '../components/Title/Title'
import {Col,Row,Container} from 'react-bootstrap';
import Textfield from '../components/Fields/Textfield';
import {Formik, Form} from'formik';
import {Button} from '@mui/material'
import * as Yup from 'yup';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import Location from '../components/LocationAndMap/Location';
// import Map from '../components/LocationAndMap/Map';

const arr=[
    {
        sender:1,
        msg:"HTML5"
    },
    {
        sender:1,
        msg:"CSS3"
    },
    {
        sender:2,
        msg:"BootStrap"
    },
    {
        sender:2,
        msg:"React JS"
    },
    {
        sender:1,
        msg:"Angular JS"
    },
    {
        sender:1,
        msg:"Vue JS"
    },
    {
        sender:2,
        msg:"Material UI"
    },

    {
        sender:2,
        msg:"Tailwind CSS"
    },
    {
        sender:2,
        msg:"T20 World Cup"
    },
    {
        sender:1,
        msg:"Inda, Virat Kohli"
    },
    {
        sender:2,
        msg:"Pakistan, Babar Azam"
    },
    {
        sender:1,
        msg:"Australia, Aaron Finch"
    },
    {
        sender:2,
        msg:"Bangladesh, MehmoodUllah"
    },    
    {
        sender:1,
        msg:"England, Eoin Morgan"
    },    
    {
        sender:2,
        msg:"New Zealand, Kane Williamson"
    },    
]

const Chat = () => {

    const ChatValidationSchema = Yup.object({
        message: Yup.string(),
    })



    return (
        <div>
            <Title title="Chat with User # SADK121JN82"/>
            <Container style={{margin:'auto'}}>
                <Row>
                    <Col  sm={{span:8,offset:2}}
                    style={{height:'65vh',borderTop:'1px solid',overflowY:'scroll'}}                    
                    >
{
                        arr.map((data,index)=>(
                            <div  key={index} style={{display:'block',width:'100%'}}
                            align={data.sender==1 ? 'left' : 'right'}
                            >
                            <p
                            style={data.sender==1 ? {
                                background:'#EFEFEF',
                                color:'#203D88',
                                padding:10,
                                borderRadius:'5%',
                                marginLeft:10,
                                display:'inline-block',
                                
                            } : {
                                background:'#203D88',
                                color:'#fff',
                                padding:10,
                                borderRadius:'5%',
                                marginRight:10,
                                display:'inline-block',

                            }}
                            >
                                {data.msg}
                            </p>
                            </div>
                            ))
                        }
                    </Col>
                </Row>
                <Row style={{margin:0}}>
                    <Col sm={{span:8,offset:2}}>
{/* message here */}

<Formik
                initialValues={{
                    message:''
                }}

                validationSchema={ChatValidationSchema}
                onSubmit={()=>{

                }}
                >
                    {()=>(
                        <Form align="left">
                            <Row  style={{margin:0}}>
                                <Col sm={9} style={{margin:0}}>
                        <Textfield  name="message" label="message" type="text" width={"100%"}
                                />                            
                                </Col >
                                <Col sm={2}  style={{marginTop:20}}>
                        <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SendIcon/>}
                        endIcon
                        >
                            Send 
                        </Button>
                            </Col>
                            <Col sm={1}  style={{marginTop:20}}>
                                <LocationOnIcon
                                style={{borderRadius:'50%',fontSize:30}}
                                />
                            </Col>
                            
    
                        </Row>
                        </Form>
                    )}
                </Formik>

{/* message end */}
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default Chat
