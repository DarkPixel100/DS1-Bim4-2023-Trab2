import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// UserRow Component
const UserRow = ({ user, onDelete, onSelect }) => (
  <tr className="usuario" id={user.id} onClick={() => onSelect(user.id)}>
    <td>{user.id}</td>
    <td>{user.nome}</td>
    <td>{user.email}</td>
    <td>
      <button
        className="btn btn-danger"
        type="submit"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(user.id);
        }}
      >
        Deletar
      </button>
    </td>
  </tr>
);

// ListaUsers Component
const ListaUsers = ({ queryRes, onDelete, onSelect }) => (
  <>
    {queryRes.map((user, key) => (
      <UserRow key={key} user={user} onSelect={onSelect} onDelete={onDelete} />
    ))}
  </>
);

// TabelaUsuarios Component
const TabelaUsuarios = ({ userData, updateTable, onSelect }) => {
  const navigate = useNavigate();
  const [queryRes, setQueryRes] = useState([]);
  const [deletion, setDeletion] = useState({});

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("/api/usuarios", {
        headers: { authorization: token },
      });

      setQueryRes(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response?.status === 500) navigate("/auth/login");
    }
  };

  // Handle user deletion
  const handleDeletion = async (userId) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.post(
        "/api/deletarUsuario",
        { id: userId },
        {
          headers: { authorization: token },
        }
      );
      setDeletion(response);
      updateTable();
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.response?.status === 500) navigate("/auth/login");
    }
  };

  // Fetch users on component mount and when deletion occurs
  useEffect(() => {
    fetchUsers();
  }, [deletion]);

  return (
    <Container>
      <h2>Usuários:</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <ListaUsers
              queryRes={queryRes}
              onDelete={handleDeletion}
              onSelect={onSelect}
            />
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default TabelaUsuarios;
