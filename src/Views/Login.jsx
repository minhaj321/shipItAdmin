import React, { useState } from "react";
import NavBar from "./../components/Navbar/Navbar.jsx";
import shipments from "./../Assets/shipments.png";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../components/Fields/Textfield";
import { Button } from "@mui/material";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {Root} from '../Config/root';

const Login = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [spinner,setSpinner] = useState(false);
  const [isError,setIsError] = useState(false);

  const loginValidationSchema = Yup.object({
    email: Yup.string().email("Invalid Email Address").required(),
    password: Yup.string().required("Required"),
  });



  return (
    <div className={spinner ? 'changeOpacity' : null}>
      <NavBar />
      <div className="row">
        <div className="col-md-6  col-12 text-center">
          <div className="col-md-12">
            <h3>Welcome Back</h3>
            <p>Please login to continue</p>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginValidationSchema}
            onSubmit={async (values) => {
              setDisable(true);
              setSpinner(true);
              try {
                var { data } = await axios.post(
                  `${Root.production}/admin/adminLogin`,
                  values
                );
                if (data.status === 200) {
                    localStorage.setItem("admin", JSON.stringify(data.message));
                    navigate(`/dashboard/${data.message._id}`);
                    window.location.reload();
                }else if(data.status==404){
                  setIsError(true);
                  setAlertText('Admin not found')
              } 
                else {
                  setIsError(true);
                  setAlertText(data.message)
              }
              } catch (err) {
                  setIsError(true);
                  setAlertText(err.message)
              }
          
              setDisable(false);
              setSpinner(false);
            }}
          >
            {() => (
              <Form
                style={{ width: "90%", margin: "auto" }}
                className="loginForm"
              >
                <Row style={{ margin: 0 }}>
{ isError &&
                  <Col lg={12}>
                    <Alert severity="error">
                      <AlertTitle>Login Error</AlertTitle>
                      {alertText}
                    </Alert>
                  </Col>
}
                  <Col lg={12}>
                    <Textfield
                      name="email"
                      label="Email"
                      type="email"
                      width={"100%"}
                    />
                  </Col>
                </Row>
                <Row style={{ margin: 0 }}>
                  <Col lg={12}>
                    <Textfield
                      className="passwordInput"
                      name="password"
                      label="Password"
                      type="password"
                      width={"100%"}
                    />
                  </Col>
                </Row>
                <p
                className="applyHover"
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                    textDecoration:'underline'
                  }}
                  onClick={() => navigate("/forget-password")}
                >
                  Forgot Password ?
                </p>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ width: "45%" }}
                  disabled={disable}
                >
                    LogIn
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-6 mt-4">
          <img
            className="loginImg"
            src={shipments}
            width="550px"
            height="500px"
            alt="shipments"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
