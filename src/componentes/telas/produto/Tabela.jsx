import { useContext, useEffect, useState } from "react";
import Alerta from "../../comuns/Alerta";
import {
  Box,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import ProdutoContext from "./ProdutoContext";
import { formatoMoeda } from "../../comuns/Uteis";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IndexedDB } from "../../../offline/IndexedDB";
import {
  cadastraProdutoAPI,
  getProdutosAPI,
} from "../../../servicos/ProdutoServico";

function Tabela() {
  const {
    alerta,
    setAlerta,
    recuperaProdutos,
    listaObjetos,
    remover,
    editarObjeto,
    novoObjeto,
  } = useContext(ProdutoContext);
  const [offlineProdutos, setOfflineProdutos] = useState([]);
  const [differences, setDifferences] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDiff, setSelectedDiff] = useState(null);
  const [produtosNovosCriadosOffline, setProdutosNovosCriadosOffline] =
    useState([]);

  useEffect(() => {
    const fetchOfflineProdutos = async () => {
      const produtos = await IndexedDB.getProdutosOffline();
      setOfflineProdutos(produtos);
      const produtosCriadosOffline = produtos.filter(
        (produto) => +produto.codigo > +9000
      );
      setProdutosNovosCriadosOffline(produtosCriadosOffline);
    };
    fetchOfflineProdutos();
  }, []);

  const handleVerOffline = async (produto) => {
    const produtoAchado = await IndexedDB.getOneProdutosOffline(produto.codigo);
    if (produtoAchado) {
      await IndexedDB.deleteProdutoOffline(produto.codigo);
    } else {
      await IndexedDB.addProdutoOffline(produto);
    }
    // Atualiza a lista de produtos offline
    const produtos = await IndexedDB.getProdutosOffline();
    setOfflineProdutos(produtos);
  };

  const isProdutoOffline = (codigo) => {
    return offlineProdutos.some((produto) => produto.codigo === codigo);
  };

  const syncProdutosOfflineOnline = async () => {
    const onlineProdutos = await getProdutosAPI();
    const offlineProdutos = await IndexedDB.getProdutosOffline();

    offlineProdutos.forEach((element) => {
      element.id = undefined;
    });

    const differences = IndexedDB.findDifferences(
      offlineProdutos,
      onlineProdutos
    );

    console.log("Differences");
    console.log(differences);

    setDifferences(differences);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdicionarNoOnline = async (produto) => {
    try {
      const codigo = produto.codigo;
      produto.codigo = undefined;
      let retornoAPI = await cadastraProdutoAPI(produto, "POST");
      handleApagarProdutoOffline(codigo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
    } catch (err) {
      console.error(err.message);
      window.location.reload();
    }
    recuperaProdutos();
  };

  const handleAtualizarNoOnline = async (produto) => {
    try {
      let retornoAPI = await cadastraProdutoAPI(produto, "PUT");
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
    } catch (err) {
      console.error(err.message);
      window.location.reload();
    }
    recuperaProdutos();
  };

  const handleApagarProdutoOffline = async (codigo) => {
    await IndexedDB.deleteProdutoOffline(codigo);
    const produtos = await IndexedDB.getProdutosOffline();
    setOfflineProdutos(produtos);
    const produtosCriadosOffline = produtos.filter(
      (produto) => +produto.codigo > +9000
    );
    setProdutosNovosCriadosOffline(produtosCriadosOffline);
    setOpen(false);
  };

  const handleUpdate = async (option, offlineProduto, onlineProduto) => {
    if (option === "offlineToOnline") {
      handleAtualizarNoOnline(offlineProduto);
    } else if (option === "onlineToOffline") {
      await IndexedDB.deleteProdutoOffline(offlineProduto.codigo);
      await IndexedDB.addProdutoOffline(onlineProduto);
    } else if (option === "addToOnline") {
      await handleAdicionarNoOnline(offlineProduto);
    }
    const produtos = await IndexedDB.getProdutosOffline();
    setOfflineProdutos(produtos);
    setDifferences(
      differences.filter(
        (diff) => diff.offlineProduto.codigo !== offlineProduto.codigo
      )
    );
    setOpen(differences.length > 0);
  };

  return (
    <Box sx={{ padding: "3%" }}>
      <Button
        variant="contained"
        aria-label="Sincronizar Produtos"
        onClick={syncProdutosOfflineOnline}
        sx={{ margin: "5px" }}
      >
        Sincronizar Produtos
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Button
                  variant="contained"
                  aria-label="Novo Produto"
                  onClick={() => novoObjeto()}
                  sx={{ margin: "5px" }}
                >
                  Novo produto
                </Button>
              </TableCell>
              <TableCell>Ver Offline</TableCell>
              <TableCell>Codigo</TableCell>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">Descricao</TableCell>
              <TableCell align="left">Valor</TableCell>
              <TableCell align="left">Quantidade</TableCell>
              <TableCell align="left">Ativo</TableCell>
              <TableCell align="left">Cadastro</TableCell>
              <TableCell align="left">Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaObjetos.map((row) => (
              <TableRow
                key={row.codigo}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Button
                    item
                    key="editar"
                    onClick={() => editarObjeto(row.codigo)}
                    title="Editar"
                    aria-label="Editar"
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    item
                    key="remover"
                    onClick={() => remover(row.codigo)}
                    title="Deletar"
                    aria-label="Deletar"
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
                <TableCell component="th" scope="row">
                  <input
                    type="checkbox"
                    checked={isProdutoOffline(row.codigo)}
                    onChange={() => handleVerOffline(row)}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.codigo}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.nome}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.descricao}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatoMoeda(row.valor)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.quantidade_estoque}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.ativo ? "Sim" : "Nao"}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.data_cadastro}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.categoria_nome}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Diferenças Encontradas</DialogTitle>
        <DialogContent>
          {differences.map((diff, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="h6">
                Produto Código: {diff.offlineProduto.codigo}
              </Typography>
              <Typography variant="body1">Diferenças:</Typography>
              <pre>{JSON.stringify(diff.diff, null, 2)}</pre>
              <Button
                onClick={() =>
                  handleUpdate(
                    "offlineToOnline",
                    diff.offlineProduto,
                    diff.onlineProduto
                  )
                }
                variant="contained"
                color="primary"
                sx={{ marginRight: 1 }}
              >
                Atualizar Online com Offline
              </Button>
              <Button
                onClick={() =>
                  handleUpdate(
                    "onlineToOffline",
                    diff.offlineProduto,
                    diff.onlineProduto
                  )
                }
                variant="contained"
                color="secondary"
              >
                Atualizar Offline com Online
              </Button>
              {diff.offlineProduto.id === 0 && (
                <Button
                  onClick={() =>
                    handleUpdate(
                      "addToOnline",
                      diff.offlineProduto,
                      diff.onlineProduto
                    )
                  }
                  variant="contained"
                  color="success"
                >
                  Adicionar ao Online
                </Button>
              )}
            </Box>
          ))}
        </DialogContent>
        {produtosNovosCriadosOffline.length > 0 && (
          <DialogContent>
            {produtosNovosCriadosOffline.map((produto, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <Typography variant="h6">
                  Produto Código: {produto.codigo}
                </Typography>
                <Typography variant="h6">
                  Produto Nome: {produto.nome}
                </Typography>
                <Typography variant="h6">
                  Produto Categoria: {produto.categoria_nome}
                </Typography>
                <Typography variant="h6">
                  Data Cadastro: {produto.data_cadastro}
                </Typography>
                <Typography variant="h6">
                  Produto Quantidade: {produto.quantidade_estoque}
                </Typography>
                <Typography variant="h6">
                  Produto Valor: R$ {produto.valor}
                </Typography>

                <Button
                  onClick={() => handleAdicionarNoOnline(produto)}
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: 1 }}
                >
                  Adicionar ao Online
                </Button>
                <Button
                  onClick={() => handleApagarProdutoOffline(produto.codigo)}
                  variant="contained"
                  color="secondary"
                >
                  Apagar Produto Offline
                </Button>
              </Box>
            ))}
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Tabela;
