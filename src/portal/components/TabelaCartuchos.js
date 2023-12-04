import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// CartuchoRow Component
const CartuchoRow = ({ item, onDelete }) => (
  <tr className="cartucho" id={item.id}>
    <td>{item.nome}</td>
    <td>{item.sistema}</td>
    <td>{item.ano}</td>
    <td>
      <button
        className="btn btn-danger"
        type="submit"
        onClick={() => onDelete(item.id)}
      >
        Remover
      </button>
    </td>
  </tr>
);

// EmptyCartuchosRow Component
const EmptyCartuchosRow = () => (
  <tr>
    <td colSpan="4">
      <span>
        <b>Sem cartuchos disponíveis.</b>
      </span>
    </td>
  </tr>
);

// ListaCartuchos Component
const ListaCartuchos = ({ queryRes, onDelete }) => (
  <>
    {queryRes.count ? (
      queryRes.rows.map((item, key) => (
        <CartuchoRow key={key} item={item} onDelete={onDelete} />
      ))
    ) : (
      <EmptyCartuchosRow />
    )}
  </>
);

// TabelaCartuchos Component
const TabelaCartuchos = ({ userData, updateTable, selectedUserId }) => {
  const navigate = useNavigate();
  const [queryRes, setQueryRes] = useState([]);
  const [deletion, setDeletion] = useState({});

  // Fetch cartridge data from the API
  const fetchCartridges = async () => {
    try {
      const response = await axios.get("/api/cartuchos", {
        params: {
          userID: selectedUserId || userData.id,
        },
      });

      setQueryRes(response.data);
    } catch (error) {
      console.error("Error fetching cartridge data:", error);
      if (error.response?.status === 500) navigate("/auth/login");
    }
  };

  // Handle cartridge deletion
  const handleDeletion = async (itemId) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.post(
        "/api/deletarCartucho",
        { id: itemId },
        {
          headers: { authorization: token },
        }
      );
      setDeletion(response);
    } catch (error) {
      console.error("Error deleting cartridge:", error);
      if (error.response?.status === 500) navigate("/auth/login");
    }
  };

  // Fetch cartridges on component mount and when deletion occurs
  useEffect(() => {
    fetchCartridges(selectedUserId || userData.id);
  }, [deletion, updateTable, selectedUserId, userData.id]);

  return (
    <Container>
      <h2>Cartuchos{selectedUserId?` de userID(${selectedUserId})`:""}:</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Sistema</th>
              <th scope="col">Ano de Publi.</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <ListaCartuchos queryRes={queryRes} onDelete={handleDeletion} />
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default TabelaCartuchos;