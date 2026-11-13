import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Card,
} from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";  #for  axios.post api call instead we use API
import API from "../../axiosConfig";
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [messsage, setMessage] = useState("");
  const [show, changeshow] = useState("fa fa-eye-slash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleClose = () => setMessage(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    // token: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    // token: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
    validateField(name, value);
  };
  const getValidationClass = (name) => {
    if (formValues[name] === "") return "";
    return formErrors[name] ? "is-invalid" : "is-valid";
  };
  const clearForm = () => {
    setFormValues({
      email: "",
      password: "",
      token: "",
    });
  };
  const validateField = (name, value) => {
    let errorMessage = null;

    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = "Invalid email format..";
        }
        break;

      case "password":
        if (value.length < 6) {
          errorMessage = "Password must be at least 6 characters";
        }
        break;
      // case "token":
      //   if (value.length < 6) {
      //     errorMessage = "otp must be at least 6 characters";
      //   }
      //   break;

      default:
        break;
    }

    setFormErrors({
      ...formErrors,
      [name]: errorMessage,
    });
  };
  const isFormValid = () => {
    return (
      Object.values(formErrors).every((error) => error === null) &&
      Object.values(formValues).every(
        (value) => value !== "" && value !== false,
      )
    );
  };

  // const showPassword = () => {
  //   var x = document.getElementById("pass1");
  //   if (x.type === "password") {
  //     x.type = "text";
  //     changeshow(`fa fa-eye`);
  //   } else {
  //     x.type = "password";
  //     changeshow(`fa fa-eye-slash`);
  //   }
  // };
  const showPassword = () => {
  var x = document.getElementById("pass1");

  if (x.type === "password") {
    x.type = "text";
    changeshow("fa fa-eye");
  } else {
    x.type = "password";
    changeshow("fa fa-eye-slash");
  }
};
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setMessage("Please fill out the form correctly.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setError(null);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // const { data } = await axios.post("/api/auth/login", formValues, config);
      const { data } = await API.post("/api/auth/login", formValues, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
      clearForm();
      navigate("/profile");
    window.location.reload();

    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response?.data?.message
          : error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  
      useEffect(()=>{
        const userInfo=localStorage.getItem("userInfo")
        if(userInfo){
          navigate("/profile")
        }
      },[navigate])
  return (
    <>
      <Container>
        <Row>
          <Col md="3"></Col>

          {loading ? (
            <Loader />
          ) : (
            <Col md="6" >
              <Form onSubmit={submitHandler} >
                <br />

                <h3 className="text-center">Login Here</h3>

                {messsage && (
                  <Message variant="success" onClose={handleClose}>
                    {messsage}
                  </Message>
                )}
                {error && (
                  <Message variant="danger" onClose={handleClose}>
                    {error}
                  </Message>
                )}

                <Form.Group controlId="email" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your Email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    isInvalid={!!formErrors.email}
                    className={getValidationClass("email")}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    {" "}
                    <span>
                      <i className={show}></i>
                    </span>{" "}
                    Password
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox onClick={showPassword} />{" "}
                    <Form.Control
                      required
                      type={show === "fa fa-eye" ? "text" : "password"}
                      name="password"
                      id="pass1"
                      value={formValues.password}
                      placeholder="Enter your Password"
                      isInvalid={!!formErrors.password}
                      className={getValidationClass("password")}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    {" "}
                    {/* <span>
                      <i className={show}></i>
                    </span>{" "} */}
                    Passcode
                  </Form.Label>
                    <Form.Control
                      
                      type="text"
                      name="token"
                      // id="pass2"
                      value={formValues.token}
                      placeholder="Enter your 2FA OTP if Enabled or Optional"
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.token}
                    </Form.Control.Feedback>
                    
                
                </Form.Group>

                <Button
                  className="btn btn-outline-secondary"
                  variant="secondary"
                  disabled={!isFormValid()}
                  type="submit"
                >
                  Login
                </Button>
              </Form>

              <Row className="py-3">
                <Col>
                  New User? 
                  <Link to="/signup">  Signup</Link>
                </Col>
              </Row>
            </Col>
          )}
          <Col md="3"></Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
