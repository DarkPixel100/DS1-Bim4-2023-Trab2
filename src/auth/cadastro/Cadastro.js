import axios from "axios";
import React from "react";
import { Button, Form, FormGroup, FormLabel, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Cadastro = () => {
  const registerAPI = "http://localhost:3000/api/cadastro";
  const navigate = useNavigate();
  let regErrors = [];
  const submitRegisterForm = (event) => {
    event.preventDefault();
    const formElement = document.querySelector("#registerForm");
    const formData = new FormData(formElement);
    const formDataJSON = Object.fromEntries(formData);
    const btnPointer = document.querySelector("#register-btn");
    btnPointer.innerHTML = "Aguarde...";
    btnPointer.setAttribute("disabled", true);
    axios
      .post(registerAPI, formDataJSON)
      .then((response) => {
        btnPointer.innerHTML = "Cadastrar";
        btnPointer.removeAttribute("disabled");
        setTimeout(() => {
          navigate("/auth/login");
        }, 500);
      })
      .catch((error) => {
        btnPointer.innerHTML = "Cadastrar";
        btnPointer.removeAttribute("disabled");
        regErrors = error.response.data.errors;
        document.getElementById("errors").innerHTML = JSON.stringify(regErrors);
      });
  };

  return (
    <React.Fragment>
      <main>
        <h2>Cadastro:</h2>
        <span id="errors"></span>
        <Form
          id="registerForm"
          onSubmit={submitRegisterForm}
          autoComplete="off"
        >
          <FormGroup className="col-md-4">
            <FormLabel htmlFor={"register-nome"}>Nome:</FormLabel>
            <input
              type={"text"}
              className="form-control"
              id={"register-nome"}
              name="nome"
              placeholder="João da Silva"
              required
            />
          </FormGroup>
          <FormGroup className="col-md-4">
            <FormLabel htmlFor={"register-email"}>Email:</FormLabel>
            <input
              type={"email"}
              className="form-control"
              id={"register-email"}
              name="email"
              placeholder="abc@mail.com"
              required
            />
          </FormGroup>
          <FormGroup className="col-md-4">
            <FormLabel htmlFor={"register-password"}>Password:</FormLabel>
            <input
              type={"password"}
              className="form-control"
              id={"register-password"}
              name="password"
              placeholder="@BcdeFg_Hi"
              pattern="^(?=.*[A-Z]).{8,}$"
              title="A senha deve ter: 1 letra mai\xFAscula e ao menos 8 caracteres."
              required
            />
            <small id="helpId" className="text-muted">
              A senha deve ter: 1 letra maiúscula e ao menos 8 caracteres.
            </small>
          </FormGroup>
          <Button type="submit" className="btn-success mt-2" id="register-btn">
            Cadastrar
          </Button>
          <Nav.Link href="/auth/login">Já tenho uma conta</Nav.Link>
        </Form>
      </main>
    </React.Fragment>
  );
};
export default Cadastro;
