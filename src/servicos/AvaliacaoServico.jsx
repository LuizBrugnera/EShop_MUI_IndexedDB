import Autenticacao from "../componentes/seguranca/Autenticacao";

export const getAvaliacoesAPI = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/avaliacao`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const getAvaliacaoPorCodigoAPI = async (codigo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/avaliacao/${codigo}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: Autenticacao.pegaAutenticacao().token,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const getAvaliacaoPorProdutoAPI = async (codigo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/avaliacao/produto/${codigo}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const deleteAvaliacaoPorCodigoAPI = async (codigo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/avaliacao/${codigo}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: Autenticacao.pegaAutenticacao().token,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const cadastraAvaliacaoAPI = async (objeto, metodo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/avaliacao`,
    {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objeto),
    }
  );
  const data = await response.json();
  return data;
};

export const editarAvaliacaoAPI = async (objeto, metodo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/avaliacao`,
    {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        authorization: Autenticacao.pegaAutenticacao().token,
      },
      body: JSON.stringify(objeto),
    }
  );
  const data = await response.json();
  return data;
};
