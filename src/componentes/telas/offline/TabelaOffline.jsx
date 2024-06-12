import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TabelaOffline({ listaObjetos, remover, editarObjeto, novoObjeto }) {
  return (
    <Box sx={{ padding: "5%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Button
                  variant="contained"
                  onClick={novoObjeto}
                  sx={{ margin: "5px" }}
                  aria-label="Novo Produto"
                >
                  Novo Produto
                </Button>
              </TableCell>
              <TableCell align="left">Codigo</TableCell>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">Descrição</TableCell>
              <TableCell align="left">Quantidade em Estoque</TableCell>
              <TableCell align="left">Ativo</TableCell>
              <TableCell align="left">Valor</TableCell>
              <TableCell align="left">Data de Cadastro</TableCell>
              <TableCell align="left">Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaObjetos.map((row) => (
              <TableRow
                key={row.codigo}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" width="30%">
                  <Button
                    onClick={() => editarObjeto(row.codigo)}
                    title="Editar"
                    aria-label="Editar"
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => remover(row.codigo)}
                    title="Apagar"
                    aria-label="Deletar"
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
                <TableCell>{row.codigo}</TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.descricao}</TableCell>
                <TableCell>{row.quantidade_estoque}</TableCell>
                <TableCell>{row.ativo ? "Sim" : "Não"}</TableCell>
                <TableCell>{row.valor}</TableCell>
                <TableCell>{row.data_cadastro}</TableCell>
                <TableCell>{row.categoria_nome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TabelaOffline;
