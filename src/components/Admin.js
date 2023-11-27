import React from "react";

const Admin = (props) => {
  return (
    <React.Fragment>
      <header>
        <h3>Conectado como: {props.user.nome}</h3>
        <h1>Biblioteca!</h1>
        <nav>
          <a href="/">
            <button className="btn btn-primary">Home</button>
          </a>
          <a href="/logout">
            <button className="btn btn-primary">Logout</button>
          </a>
        </nav>
      </header>
      <main>
        <section id="personal">
          <h2>UsuÃ¡rios:</h2>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Data de cadastro</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {props.usuarios.map((item, i) => (
                  <React.Fragment key={i}>
                    {" "}
                    <tr className="livro">
                      <td scope="row">{item.id}</td>
                      <td scope="row">{item.nome}</td>
                      <td scope="row">{item.email}</td>
                      <td scope="row">{item.createdAt}</td>
                      <td scope="row">
                        <form action="/deletarUser" method="POST">
                          <button
                            className="btn btn-danger"
                            type="submit"
                            name="userID"
                            value={item.id}
                          >
                            Deletar
                          </button>
                        </form>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}{" "}
              </tbody>
            </table>
          </div>
        </section>
        <section id="general">
          <div id="sectionHeader">
            <h2>Procurar cartuchos:</h2>
            <form action="" method="POST">
              <input
                type="search"
                className="form-control"
                id="searchQuery"
                name="searchQuery"
                placeholder="Pesquise por t\xC3\xADtulo ou ano de publi."
                size="35"
              />
              <button type="submit" className="btn btn-primary">
                Pesquisar
              </button>
            </form>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">TÃ­tulo</th>
                  <th scope="col">Autores</th>
                  <th scope="col">Ano de Publi.</th>
                  <th scope="col">Editora</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {Boolean(props.searchCartuchos.count) ? (
                  props.searchCartuchos.rows.map((item, i) => (
                    <React.Fragment key={i}>
                      {" "}
                      <tr className="livro">
                        <td scope="row">{item.titulo}</td>
                        <td scope="row">{item.autores}</td>
                        <td scope="row">{item.ano}</td>
                        <td scope="row">{item.editora}</td>
                        <td scope="row">{item.quantidade}</td>
                        <td scope="row">
                          <form action="/deletarLivro" method="POST">
                            <button
                              className="btn btn-danger"
                              type="submit"
                              name="livroID"
                              value={item.id}
                            >
                              Deletar
                            </button>
                          </form>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <React.Fragment>
                    {" "}
                    <tr>
                      <td colSpan="5">
                        <span>
                          <b>Sem cartuchos disponÃ­veis.</b>
                        </span>
                      </td>
                    </tr>
                  </React.Fragment>
                )}{" "}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};

export default Admin;
