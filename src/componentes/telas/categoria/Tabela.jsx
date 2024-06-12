import { useContext, useMemo } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CategoriaContext from "./CategoriaContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Tabela() {
  const { alerta, listaObjetos, remover, editarObjeto, novoObjeto } =
    useContext(CategoriaContext);

  return (
    <Box sx={{ padding: "5%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Button
                  variant="contained"
                  onClick={() => novoObjeto()}
                  sx={{ margin: "5px" }}
                  aria-label="Nova avaliação"
                >
                  Nova Avaliação
                </Button>
              </TableCell>
              <TableCell align="left">Codigo</TableCell>
              <TableCell align="left">Nome</TableCell>
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
                    title="Apagar"
                    aria-label="Deletar"
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.codigo}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.nome}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Tabela;
