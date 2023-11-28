import React from "react";

const Cadastro = (props) => {
  return (
    <React.Fragment>
      <main>
        <h2>Cadastro:</h2>
        {Boolean(props.reqFlash.errAuth) && (
          <span
            style={{
              color: "red",
            }}
            className="col-md-4"
          >
            {props.reqFlash.errAuth}
          </span>
        )}
        <form action="/cadastro" method="POST" autoComplete="off">
          <div className="col-md-4">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              name="nome"
              id="nome"
              placeholder="Jo\xE3o da Silva"
              required=""
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              aria-describedby="emailField"
              placeholder="abc@mail.com"
              required=""
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="@BcdeFg_Hi"
              pattern="^(?=.*[A-Z]).{8,}$"
              title="A senha deve ter: 1 letra mai\xFAscula e ao menos 8 caracteres."
              required=""
            />
            <small id="helpId" className="text-muted">
              A senha deve ter: 1 letra maiúscula e ao menos 8 caracteres.
            </small>
          </div>
          <button type="submit" className="btn btn-primary ml-3">
            Cadastrar
          </button>
          <a href="/login" className="col-md-4">
            Já tenho uma conta
          </a>
        </form>
      </main>
    </React.Fragment>
  );
};

export default Cadastro;
