import { useContext } from "react";
import Autenticacao from "../../seguranca/Autenticacao";
import AvaliacaoContext from "./AvaliacaoContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Rating,
  Typography,
} from "@mui/material";
import { Tune } from "@mui/icons-material";

function AcordionAvaliacao(props) {
  const { novoObjeto, listaAvaliacoes, editarObjeto, remover } =
    useContext(AvaliacaoContext);

  let mediaAvaliacao = 0;
  if (listaAvaliacoes.length > 0) {
    listaAvaliacoes.map((objeto) => (mediaAvaliacao += objeto.nota));
    mediaAvaliacao = mediaAvaliacao / listaAvaliacoes.length;
  }

  const autenticacao = Autenticacao.pegaAutenticacao();

  return (
    <Accordion
      sx={{
        marginLeft: "11%",
        marginRight: "11%",
        padding: "10px",
        height: "30%",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="avaliacoes-content"
        id="avaliacoes-header"
      >
        <Typography>Avaliacoes</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ textAlign: "center" }}>
        <Button variant="contained" onClick={() => novoObjeto()}>
          Nova Avaliação
        </Button>
      </AccordionDetails>
      {listaAvaliacoes.map((objeto) => (
        <Box sx={{ padding: "5px" }} key={objeto.codigo}>
          <AccordionDetails
            sx={{
              border: 1,
              borderColor: "gray",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <Grid item xs={12} sm container>
              <Grid
                item
                xs
                container
                direction="column"
                spacing={2}
                sx={{ padding: "5px" }}
              >
                <Grid container spacing={3} sx={{ padding: "5px" }}>
                  <Grid item xs>
                    <Typography>{objeto.autor}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Rating name="nota" value={objeto.nota} readOnly />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <Typography sx={{ padding: "5px" }}>{objeto.texto}</Typography>
            <Divider />
            <Grid
              item
              xs
              container
              direction="column"
              spacing={2}
              sx={{ padding: "5px", textAlign: "right" }}
            >
              <Grid container spacing={3} sx={{ padding: "5px" }}>
                {autenticacao && (
                  <Grid item>
                    <Button
                      item
                      key="editar"
                      onClick={() => editarObjeto(objeto.codigo)}
                      title="Editar"
                      aria-label="Editar"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      item
                      key="remover"
                      onClick={() => remover(objeto.codigo)}
                      title="Apagar"
                      aria-label="Apagar"
                    >
                      <DeleteIcon />
                    </Button>
                  </Grid>
                )}
                <Grid item xs sx={{ padding: "5px" }}>
                  <Typography sx={{ padding: "5px" }}>{objeto.data}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Box>
      ))}
    </Accordion>
  );
}

export default AcordionAvaliacao;
