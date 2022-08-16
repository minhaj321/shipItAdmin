import shipments from "./../Assets/shipments.png";
import React,{useState} from "react";
import NavBar from "../components/Navbar/Navbar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../components/Fields/Textfield";
import { Button} from "@mui/material";
import {Row,Col} from 'react-bootstrap';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from "axios";
import './../styles/EmailVerificationForPassword.css';
import {Root} from '../Config/root';



const VerifyEmail = () => {

  const [disable,setDisable] = useState(false);
  const [spinner,setSpinner] = useState(false);
  const navigate = useNavigate();
  const {state} = useLocation();
  const loginValidationSchema = Yup.object({
    email: Yup.string().email().required('required'),

  });

  return (
    <div className={spinner ? "changeToBlur" : null}>
      <NavBar />

      <Row style={{display:'flex' , alignItems:'center'}}>
        <Col md={6} align="center">
          <div className="headings">
          <br/>
          <h3>Please Enter Your email</h3>
          </div>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={loginValidationSchema}
            onSubmit={async(values) => {
              setSpinner(true);
              setDisable(true);
              console.log(values);
              try{
                const {data} = await axios.post(`${Root.production}/user/forgetPassword`,values);
                if(data.status===200){
                  // navigate(`/reset-password/${data.message}`)
                  // localStorage.setItem('verificationId',data.message)
                  console.log(`"${data.message}"`)
                  navigate('/check-email')
                }
              }
              catch(err){
                console.log(err.message)
              }
              setSpinner(false);
              setDisable(false);

            }}
          > 

            {({ dirty, isValid }) => (
                <Form>
                <Row style={{margin:'auto'}}>
                <Col>
                  <Textfield name="email" label="Enter Your Email" type="email" width={'60%'} />
                </Col>
                  </Row>
                  <br /><br />
                  <Col style={{margin:0}}>
                  <Button variant="contained" color="primary" type="submit" style={{width:'35%'}}
                  disabled={disable}
                  >
                    Submit
                  </Button>
                  </Col>
                </Form>
            )}
          </Formik>
        </Col>
        <Col md={6}>
              <img src={shipments} alt="forgot-password" 
              width="90%"/>
        </Col>
      </Row>
    </div>
  );
};

export default VerifyEmail;
