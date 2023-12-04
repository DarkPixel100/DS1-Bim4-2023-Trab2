import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, FormLabel } from "react-bootstrap";

const FormCartucho = ({ userData, updateTable }) => {
  const addAPI = "http://localhost:3000/api/addCartucho";

  const [formValues, setFormValues] = useState({
    nome: "",
    sistema: "",
    ano: "",
  });

  const [errorMessages, setErrorMessages] = useState("");

  const handleInputChange = (e, field) => {
    setFormValues({ ...formValues, [field]: e.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formElement = document.querySelector("#addForm");
    const formData = new FormData(formElement);
    const formDataJSON = Object.fromEntries(formData);

    const btnPointer = document.querySelector("#add-btn");
    btnPointer.innerHTML = "Aguarde...";
    btnPointer.setAttribute("disabled", true);

    const token = localStorage.getItem("authToken");

    axios
      .post(
        addAPI,
        { ...formDataJSON, usuarioId: userData.id },
        { headers: { authorization: token } }
      )
      .then((response) => {
        btnPointer.innerHTML = "Adicionar";
        btnPointer.removeAttribute("disabled");
        updateTable();
      })
      .catch((error) => {
        btnPointer.innerHTML = "Adicionar";
        btnPointer.removeAttribute("disabled");
        setErrorMessages(JSON.stringify(error.response.data.errors));
      });
  };

  return (
    <Container>
      <main>
        <h2>Adicionar Cartucho:</h2>
        <span id="errors">{errorMessages}</span>
        <Form id="addForm" onSubmit={handleFormSubmit} autoComplete="off">
          {["nome", "sistema", "ano"].map((field) => (
            <FormGroup key={field} className="col-md-4">
              <FormLabel htmlFor={`add-${field}`}>
                {field === "ano"
                  ? "Ano de Lançamento:"
                  : field.charAt(0).toUpperCase() + field.slice(1) + ":"}
              </FormLabel>
              <input
                type={field === "ano" ? "number" : "text"}
                className="form-control"
                id={`add-${field}`}
                name={field}
                placeholder={
                  field === "nome"
                    ? "The Legend of Zelda: Majora's Mask"
                    : field === "sistema"
                    ? "Nintendo 64"
                    : "2000"
                }
                value={formValues[field]}
                onChange={(e) => handleInputChange(e, field)}
                required
              />
            </FormGroup>
          ))}
          <Button type="submit" className="btn-success mt-2" id="add-btn">
            Adicionar
          </Button>
        </Form>
      </main>
    </Container>
  );
};

export default FormCartucho;