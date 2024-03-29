import React, { useEffect, useState } from "react";
import TabelaCartuchos from "../components/TabelaCartuchos";
import AddCartucho from "../components/AddCartucho";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [updateTable, setUpdateTable] = useState(false);

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

  useEffect(() => {
    fetchData();
  }, [updateTable]);

  return (
    <>
      {isLoggedIn && (
        <main>
          <AddCartucho
            userData={userData}
            updateTable={() => setUpdateTable(!updateTable)}
          />
          <TabelaCartuchos userData={userData} updateTable={updateTable} />
        </main>
      )}
    </>
  );
};

export default Home;
