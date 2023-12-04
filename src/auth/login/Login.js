import axios from "axios";
import React, { useState } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  FormLabel,
  Nav,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const loginAPI = "http://localhost:3000/api/login";
  const navigate = useNavigate();
  const [regErrors, setRegErrors] = useState([]);

  const submitLoginForm = async (event) => {
    event.preventDefault();

    const formElement = document.querySelector("#loginForm");
    const formData = new FormData(formElement);
    const formDataJSON = Object.fromEntries(formData);

    const btnPointer = document.querySelector("#login-btn");
    btnPointer.innerHTML = "Aguarde...";
    btnPointer.setAttribute("disabled", true);

    try {
      const response = await axios.post(loginAPI, formDataJSON);
      const data = response.data;
      const token = data.token;

      if (!token) {
        alert("Unable to login. Please try after some time.");
        return;
      }

      localStorage.clear();
      localStorage.setItem("authToken", token);

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.log(error.response.data);
      btnPointer.innerHTML = "Login";
      btnPointer.removeAttribute("disabled");
      setRegErrors(error.response.data);
    }
  };

  return (
    <Container>
      <main>
        <h2>Login:</h2>
        {regErrors.errors && (
          <small className="text-danger">
            {regErrors.errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </small>
        )}
        <Form id="loginForm" onSubmit={submitLoginForm} autoComplete="off">
          <FormGroup className="col-md-4">
            <FormLabel htmlFor={"login-email"}>Email:</FormLabel>
            <input
              type={"email"}
              className="form-control"
              id={"login-email"}
              name="email"
              required
            />
          </FormGroup>
          <FormGroup className="col-md-4">
            <FormLabel htmlFor={"login-password"}>Password:</FormLabel>
            <input
              type={"password"}
              className="form-control"
              id={"login-password"}
              name="password"
              required
            />
          </FormGroup>
          <Button type="submit" className="btn-success mt-2" id="login-btn">
            Login
          </Button>
          <Nav.Link href="/auth/cadastro">Ainda não tenho uma conta</Nav.Link>
        </Form>
      </main>
    </Container>
  );
};

export default Login;