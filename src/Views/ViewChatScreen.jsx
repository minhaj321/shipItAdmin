import React , {useEffect, useState} from 'react'
import Title from '../components/Title/Title'
import {Col,Row,Container} from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import {Root} from '../Config/root';

const ViewChatScreen = () => {

    const { id } = useParams()
    const [chats , setChats] = useState()

    useEffect( async ()=> {
        const {data} = await axios.post(`${Root.production}/chat/getChatById` , {chatId: id})
        setChats(data.message)
        console.log(data);
    } , [])


    return (
        <div>
            <Title title="Chat between Shipper and Carrier"/>
            <Container style={{margin:'auto'}}>
                {
                    chats && (
                        <Row>
                        <Col  sm={{span:8,offset:2}}                    
                        >
    {
                            chats.chats.map((data,index)=>(
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
                                    overflowWrap:'break-word',
                                    width:'40%'
    
                                }}
                                >
                                    <span style={{
                                        fontSize:10
                                    }}>{data.senderId}</span><br />
                                    {data.message}
                                </p>
                                </div>
                                ))
                            }
                        </Col>
                    </Row>
                    )
                }
            </Container>
        </div>
    )
}

export default ViewChatScreen
