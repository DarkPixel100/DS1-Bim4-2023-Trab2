import React from "react";
import { Button, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
const PortalHeader = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };
  return (
    <React.Fragment>
      <Navbar bg="dark" expand="lg" className="navbar-dark">
        <Container>
          <Navbar.Brand>Cartuchos!</Navbar.Brand>
          <Nav.Link>
            <Button className="btn-warning" onClick={logout}>
              Logout
            </Button>
          </Nav.Link>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};
export default PortalHeader;
