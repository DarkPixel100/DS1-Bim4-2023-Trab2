import axios from "axios";
import React, { useState } from "react";
import { Button, Form, FormGroup, FormLabel, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const registerAPI = "http://localhost:3000/api/cadastro";
  const navigate = useNavigate();
  const [regErrors, setRegErrors] = useState([]);

  const submitRegisterForm = async (event) => {
    event.preventDefault();

    const formElement = document.querySelector("#registerForm");
    const formData = new FormData(formElement);
    const formDataJSON = Object.fromEntries(formData);

    const btnPointer = document.querySelector("#register-btn");
    btnPointer.innerHTML = "Aguarde...";
    btnPointer.setAttribute("disabled", true);

    try {
      const response = await axios.post(registerAPI, formDataJSON);
      btnPointer.innerHTML = "Cadastrar";
      btnPointer.removeAttribute("disabled");
      setTimeout(() => {
        navigate("/auth/login");
      }, 500);
    } catch (error) {
      btnPointer.innerHTML = "Cadastrar";
      btnPointer.removeAttribute("disabled");
      setRegErrors(error.response?.data?.errors || []);
    }
  };

  return (
    <main>
      <h2>Cadastro:</h2>
      {regErrors.errors && (
        <small className="text-danger">
          {regErrors.errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </small>
      )}
      <Form id="registerForm" onSubmit={submitRegisterForm} autoComplete="off">
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
            title="A senha deve ter: 1 letra maiúscula e ao menos 8 caracteres."
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
  );
};

export default Cadastro;