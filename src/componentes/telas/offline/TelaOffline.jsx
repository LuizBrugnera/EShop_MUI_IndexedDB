import { useEffect, useState } from "react";
import { getCategoriasAPI } from "../../../servicos/CategoriaServico";
import Carregando from "../../comuns/Carregando";
import TabelaOffline from "./TabelaOffline";
import Dialogo from "../../comuns/Dialogo";
import AlertaOffline from "./AlertaOffline";
import CampoEntradaOffline from "./CampoEntradaOffline";
import CampoSelectOffline from "./CampoSelectOffline";
import MenuItem from "@mui/material/MenuItem";
import { IndexedDB } from "../../../offline/IndexedDB";

function TelaOffline() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [abreDialogo, setAbreDialogo] = useState(false);
  const [editar, setEditar] = useState(false);
  const [objeto, setObjeto] = useState({
    codigo: "",
    nome: "",
    descricao: "",
    quantidade_estoque: null,
    valor: null,
    ativo: null,
    data_cadastro: new Date().toISOString().slice(0, 10),
    categoria: "",
  });
  const [carregando, setCarregando] = useState(true);

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({
      codigo: 0,
      nome: "",
      categoria_nome: "",
      descricao: "",
      quantidade_estoque: null,
      valor: null,
      ativo: null,
      data_cadastro: new Date().toISOString().slice(0, 10),
      categoria: "",
    });
    setAbreDialogo(true);
  };

  const editarObjeto = async (codigo) => {
    setObjeto(await IndexedDB.getOneProdutosOffline(codigo));
    setAbreDialogo(true);
    setEditar(true);
    setAlerta({ status: "", message: "" });
  };

  const acaoCadastrar = async (e) => {
    e.preventDefault();
    const metodo = editar ? "PUT" : "POST";
    try {
      objeto.categoria_nome = listaCategorias.find(
        (c) => c.codigo === objeto.categoria
      ).nome;

      if (metodo === "PUT") {
        if (+objeto.codigo === +0) {
          setAlerta({ status: "error", message: "Código inválido" });
          return;
        }
        console.log("atualizando");
        await IndexedDB.updateProdutoOffline(objeto.codigo, objeto);
      } else {
        console.log("criando");
        await IndexedDB.addProdutoOffline(objeto);
      }
      if (!editar) {
        setEditar(true);
      }
      recuperaProdutos();
      setAbreDialogo(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  };

  const recuperaProdutos = async () => {
    try {
      const produtos = await IndexedDB.getProdutosOffline();
      setCarregando(true);
      setListaObjetos(produtos);
      setCarregando(false);
    } catch (err) {}
  };

  const recuperaCategorias = async () => {
    try {
      setListaCategorias([
        {
          codigo: 1,
          nome: "Eletrônicos",
        },
        {
          codigo: 2,
          nome: "Eletrodomésticos",
        },
        {
          codigo: 3,
          nome: "Informática",
        },
      ]);
    } catch (err) {}
  };

  const remover = async (codigo) => {
    if (window.confirm("Deseja remover este objeto?")) {
      try {
        let retornoAPI = await IndexedDB.deleteProdutoOffline(codigo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        recuperaProdutos();
      } catch (err) {}
    }
  };

  useEffect(() => {
    recuperaCategorias();
    recuperaProdutos();
  }, []);

  return (
    <>
      <Carregando carregando={carregando}>
        <TabelaOffline
          listaObjetos={listaObjetos}
          remover={remover}
          editarObjeto={editarObjeto}
          novoObjeto={novoObjeto}
        />
      </Carregando>
      <Dialogo
        id="modalEdicao"
        titulo="Produto"
        open={abreDialogo}
        setOpen={setAbreDialogo}
        acaoCadastrar={acaoCadastrar}
        idform="formulario"
        maxWidth="sm"
      >
        <AlertaOffline alerta={alerta} />
        <CampoEntradaOffline
          id="txtCodigo"
          label="Codigo"
          tipo="number"
          name="codigo"
          value={objeto.codigo}
          onchange={handleChange}
          requerido={false}
          readonly={true}
        />
        <CampoEntradaOffline
          id="txtNome"
          label="Nome"
          tipo="text"
          name="nome"
          value={objeto.nome}
          onchange={handleChange}
          requerido={true}
          readonly={false}
          maxlength={50}
          msgvalido="Nome OK"
          msginvalido="Informe o nome"
        />
        <CampoEntradaOffline
          value={objeto.descricao}
          id="txtDescricao"
          name="descricao"
          label="Descricao"
          tipo="text"
          onchange={handleChange}
          msgvalido="OK certo"
          msginvalido="Informe a descricao"
          requerido={true}
          readonly={false}
          maxCaracteres={40}
        />
        <CampoEntradaOffline
          value={objeto.quantidade_estoque}
          id="txtEstoque"
          name="quantidade_estoque"
          label="Estoque"
          tipo="number"
          onchange={handleChange}
          msgvalido="OK certo"
          msginvalido="Informe a quantidade em estoque"
          requerido={true}
          readonly={false}
          maxCaracteres={5}
        />
        <CampoSelectOffline
          id="selectCategoria"
          label="Categoria"
          idLabel="labelCategoria"
          name="categoria"
          value={objeto.categoria}
          onchange={handleChange}
          requerido={true}
          msgvalido="Nota OK"
          msginvalido="Informe a categoria"
        >
          {listaCategorias.map((categoria) => (
            <MenuItem value={categoria.codigo} key={categoria.codigo}>
              {categoria.nome}
            </MenuItem>
          ))}
        </CampoSelectOffline>
        <CampoEntradaOffline
          value={objeto.valor}
          id="idValor"
          name="valor"
          label="Valor"
          tipo="number"
          onchange={handleChange}
          msgvalido="OK certo"
          msginvalido="Informe o valor"
          requerido={true}
          readonly={false}
          maxCaracteres={12}
        />
        <CampoSelectOffline
          value={objeto.ativo}
          id="txtAtivo"
          name="ativo"
          label="Ativo"
          onchange={handleChange}
          msgvalido="OK certo"
          msginvalido="Informe se está ativo"
          requerido={true}
        >
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </CampoSelectOffline>
        <CampoEntradaOffline
          value={objeto.data_cadastro}
          id="txtDataCadastro"
          name="data"
          label="Data de Cadastro"
          tipo="date"
          onchange={handleChange}
          msgvalido="OK certo"
          msginvalido="Informe a data de cadastro"
          requerido={true}
          readonly={false}
          maxCaracteres={12}
        />
      </Dialogo>
    </>
  );
}

export default TelaOffline;
