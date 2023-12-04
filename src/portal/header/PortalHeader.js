import React, { useEffect, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PortalHeader = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get("/api/userData", {
        headers: { authorization: token },
      });

      setIsLoggedIn(true);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching secure data:", error);
      navigate("/auth/login");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isInAdminPage = window.location.href.includes("/admin");

  return (
    <>
      {isLoggedIn && (
        <Navbar bg="dark" expand="lg" className="navbar-dark">
          <Container>
            <Navbar.Text>Conectado como: {userData.nome}</Navbar.Text>
            <Navbar.Brand>Cartuchos!</Navbar.Brand>
            {userData.isAdmin && (
              <Nav.Link href={isInAdminPage ? "/" : "/admin"}>
                <Button className="btn-warning">
                  {isInAdminPage ? "Home" : "Admin"}
                </Button>
              </Nav.Link>
            )}
            <Nav.Link>
              <Button className="btn-warning" onClick={logout}>
                Logout
              </Button>
            </Nav.Link>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default PortalHeader;
