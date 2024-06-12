import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carregando from "../../comuns/Carregando";
import {
  cadastraAvaliacaoAPI,
  deleteAvaliacaoPorCodigoAPI,
  getAvaliacaoPorCodigoAPI,
  getAvaliacaoPorProdutoAPI,
  editarAvaliacaoAPI,
} from "../../../servicos/AvaliacaoServico";
import Form from "./Form";
import AvaliacaoContext from "./AvaliacaoContext";
import { getProdutoPorCodigoAPI } from "../../../servicos/ProdutoServico";
import ItensProduto from "./ItensProduto";
import AcordionAvaliacao from "./AcordionAvaliacao";

function Avaliacao() {
  const { id } = useParams();
  let navigate = useNavigate();

  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [listaAvaliacoes, setListaAvaliacoes] = useState([]);
  const [abreDialogo, setAbreDialogo] = useState(false);
  const [editar, setEditar] = useState(false);
  const [objeto, setObjeto] = useState({
    codigo: "",
    nome: "",
    descricao: "",
    sigla: "",
  });

  const [produto, setProduto] = useState({
    codigo: "",
    nome: "",
    descricao: "",
    sigla: "",
  });
  const [carregando, setCarregando] = useState(true);

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({
      codigo: 0,
      autor: "",
      email: "",
      texto: "",
      nota: "",
      data: new Date().toISOString().slice(0, 10),
      produto: id,
    });
    setAbreDialogo(true);
  };

  const editarObjeto = async (codigo) => {
    try {
      setObjeto(await getAvaliacaoPorCodigoAPI(codigo));
      setAbreDialogo(true);
      setEditar(true);
      setAlerta({ status: "", message: "" });
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
  };

  const recuperaProduto = async (codigo) => {
    try {
      setCarregando(true);
      setProduto(await getProdutoPorCodigoAPI(codigo));
      setCarregando(false);
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
  };

  const recuperaAvaliacoesPorProduto = async (codigo) => {
    try {
      setListaAvaliacoes(await getAvaliacaoPorProdutoAPI(codigo));
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
  };

  const acaoCadastrarAvaliacao = async (e) => {
    e.preventDefault();
    const metodo = editar ? "PUT" : "POST";
    try {
      let retornoAPI;
      if (metodo == "PUT") {
        retornoAPI = await editarAvaliacaoAPI(objeto, metodo);
      } else {
        retornoAPI = await cadastraAvaliacaoAPI(objeto, metodo);
      }
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      setObjeto(retornoAPI.objeto);
      if (!editar) {
        setEditar(true);
      }
    } catch (err) {
      console.error(err.message);
      window.location.reload();
      navigate("/login", { replace: true });
    }
    recuperaAvaliacoesPorProduto(id);
  };

  const remover = async (codigo) => {
    if (window.confirm("Deseja remover este objeto?")) {
      try {
        let retornoAPI = await deleteAvaliacaoPorCodigoAPI(codigo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        recuperaAvaliacoesPorProduto(id);
      } catch (err) {
        window.location.reload();
        navigate("/login", { replace: true });
      }
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  };

  useEffect(() => {
    recuperaAvaliacoesPorProduto(id);
    recuperaProduto(id);
  }, []);

  return (
    <AvaliacaoContext.Provider
      value={{
        alerta,
        setAlerta,
        listaObjetos,
        listaAvaliacoes,
        editarObjeto,
        setObjeto,
        objeto,
        acaoCadastrarAvaliacao,
        produto,
        recuperaProduto,
        remover,
        handleChange,
        recuperaAvaliacoesPorProduto,
        novoObjeto,
        abreDialogo,
        setAbreDialogo,
      }}
    >
      <Carregando carregando={carregando}>
        <ItensProduto />
        <AcordionAvaliacao />
      </Carregando>
      <Form />
    </AvaliacaoContext.Provider>
  );
}

export default Avaliacao;
