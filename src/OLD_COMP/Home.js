import React from "react";

const Home = (props) => {
  return (
    <React.Fragment>
      <header>
        <h3>Conectado como: {props.user.nome}</h3>
        <h1>Biblioteca!</h1>
        <nav>
          {Boolean(props.admin) && (
            <a href="/admin">
              <button className="btn btn-primary">Admin</button>
            </a>
          )}
          <a href="/logout">
            <button className="btn btn-primary">Logout</button>
          </a>
        </nav>
      </header>
      <main>
        <section id="personal">
          <h2>Meus cartuchos:</h2>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Título</th>
                  <th scope="col">Autores</th>
                  <th scope="col">Ano de Publi.</th>
                  <th scope="col">Editora</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {Boolean(props.meusCartuchos.count) ? (
                  props.meusCartuchos.rows.map((item, i) => (
                    <React.Fragment key={i}>
                      {" "}
                      <tr className="livro">
                        <td scope="row">{item.titulo}</td>
                        <td scope="row">{item.autores}</td>
                        <td scope="row">{item.ano}</td>
                        <td scope="row">{item.editora}</td>
                        <td scope="row">{item.quantidade}</td>
                        <td scope="row">
                          <form action="/devolverLivro" method="POST">
                            <button
                              className="btn btn-warning"
                              type="submit"
                              name="livroID"
                              value={item.id}
                            >
                              Devolver
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
                          <b>Sem cartuchos disponíveis.</b>
                        </span>
                      </td>
                    </tr>
                  </React.Fragment>
                )}{" "}
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
                placeholder="Pesquise por t\xEDtulo ou ano de publi."
                size="35"
              />
              <button type="submit" className="btn btn-primary">
                Pesquisar
              </button>
            </form>
            <button
              id="addLivro"
              className="btn btn-primary"
              onClick="\n                document.getElementById('popup').style.display = 'flex';\n                "
            >
              Add Livro
            </button>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Título</th>
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
                        {Boolean(item.meusCartuchos.rows) && (
                          <React.Fragment>
                            {" "}
                            <td scope="row">
                              <form action="/alugarLivro" method="POST">
                                <button
                                  className="btn btn-warning"
                                  type="submit"
                                  name="livroID"
                                  value={item.id}
                                >
                                  Alugar
                                </button>
                              </form>
                            </td>
                          </React.Fragment>
                        )}{" "}
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <React.Fragment>
                    {" "}
                    <tr>
                      <td colSpan="5">
                        <span>
                          <b>Sem cartuchos disponíveis.</b>
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
      <div id="popup">
        <form action="/addLivro" method="POST" autoComplete="off">
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">
              Título:
            </label>
            <input
              type="text"
              className="form-control"
              name="titulo"
              id="titulo"
              placeholder="Dom Casmurro"
              required=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="autores" className="form-label">
              Autores:
            </label>
            <input
              type="text"
              className="form-control"
              name="autores"
              id="autores"
              placeholder="Machado de Assis"
              required=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ano" className="form-label">
              Ano de publi.:
            </label>
            <input
              type="number"
              className="form-control"
              name="ano"
              id="ano"
              placeholder="1899"
              step="1"
              required=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editora" className="form-label">
              Editora:
            </label>
            <input
              type="text"
              className="form-control"
              name="editora"
              id="editora"
              placeholder="Livraria Garnier"
              required=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantidade" className="form-label">
              Quantidade:
            </label>
            <input
              type="number"
              className="form-control"
              name="quantidade"
              id="quantidade"
              placeholder="5"
              step="1"
              required=""
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Adicionar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick="\n            document.getElementById('popup').style.display = 'none';\n            "
          >
            Cancelar
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Home;
