import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./auth/login/Login";
import Cadastro from "./auth/cadastro/Cadastro";
import Auth from "./auth/Auth";
import Home from "./portal/home/Home";
import Admin from "./portal/admin/Admin";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={"/"}>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="cadastro" element={<Cadastro />} />
        </Route>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />}></Route>
          <Route path="admin" element={<Admin />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
