import React from "react";

const Login = (props) => {
  return (
    <React.Fragment>
      <header
        style={{
          background: "rgb(10, 13, 21)",
          textAlign: "center",
          position: "relative",
        }}
      >
        <h1
          style={{
            color: "rgb(237, 247, 255)",
          }}
        >
          Biblioteca!
        </h1>
      </header>
      <main>
        {Boolean(props.reqFlash.noAuth) && <span>{props.reqFlash.noAuth}</span>}
        <h2>Login:</h2>
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
        <form action="/login" method="POST" autoComplete="off">
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
              required=""
            />
          </div>
          <button type="submit" className="btn btn-primary ml-3">
            Login
          </button>
          <br />
          <a href="/cadastro" className="col-md-4">
            Ainda não tenho uma conta
          </a>
        </form>
      </main>
    </React.Fragment>
  );

};

export default Login;
