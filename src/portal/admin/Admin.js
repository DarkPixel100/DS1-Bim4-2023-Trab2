import React, { useEffect, useState } from "react";
import TabelaUsuarios from "../components/TabelaUsuarios";
import TabelaCartuchos from "../components/TabelaCartuchos";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  if (isLoggedIn) {
    if (userData.isAdmin)
      return (
        <main>
          <TabelaUsuarios
            userData={userData}
            onSelect={(userId) => setSelectedUserId(userId)}
            updateTable={() => setUpdateTable(!updateTable)}
          />
          <TabelaCartuchos
            userData={userData}
            selectedUserId={selectedUserId}
            updateTable={updateTable}
          />
        </main>
      );
    else console.error("Error 403: Forbidden");
  } else return null;
};
export default Admin;
