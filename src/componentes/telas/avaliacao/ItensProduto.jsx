import { useContext } from "react";
import { formatoMoeda } from "../../comuns/Uteis";
import AvaliacaoContext from "./AvaliacaoContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

function ItensProduto() {
  const { produto } = useContext(AvaliacaoContext);

  return (
    <div style={{ padding: "1%" }}>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 1000,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2} sx={{ padding: "5%" }}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{ padding: "10px" }}
                >
                  {produto.nome}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" component="div">
                  {formatoMoeda(produto.valor)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Estoque: {produto.quantidade_estoque}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lançamento: {produto.data_cadastro}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Accordion
        sx={{
          padding: "1%",
          marginLeft: "10%",
          marginRight: "10%",
          marginTop: "2%",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="descricao-content"
          id="descricao-header"
        >
          <Typography>Descrição</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{produto.descricao}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ItensProduto;
