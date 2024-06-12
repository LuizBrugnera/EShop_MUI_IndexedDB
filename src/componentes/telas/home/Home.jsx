import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeContext from "./HomeContext";
import { getCategoriasAPI } from "../../../servicos/CategoriaServico";
import { getProdutosAPI } from "../../../servicos/ProdutoServico";
import Carregando from "../../comuns/Carregando";
import CardProd from "./CardProd";

function Home() {
  let navigate = useNavigate();

  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [objeto, setObjeto] = useState({
    codigo: "",
    nome: "",
    descricao: "",
    sigla: "",
  });
  const [carregando, setCarregando] = useState(true);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  };

  const recuperaProdutos = async () => {
    try {
      setCarregando(true);
      setListaObjetos(await getProdutosAPI());
      setCarregando(false);
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
  };

  const recuperaCategorias = async () => {
    try {
      setListaCategorias(await getCategoriasAPI());
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    recuperaCategorias();
    recuperaProdutos();
  }, []);

  return (
    <HomeContext.Provider
      value={{
        alerta,
        setAlerta,
        listaObjetos,
        objeto,
        handleChange,
        listaCategorias,
      }}
    >
      <Carregando carregando={carregando}>
        <CardProd />
      </Carregando>
    </HomeContext.Provider>
  );
}

export default Home;
