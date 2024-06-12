import { useContext } from "react";
import HomeContext from "./HomeContext";
import { formatoMoeda } from "../../comuns/Uteis";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CardActionArea, CardHeader, Divider } from "@mui/material";
import { Padding } from "@mui/icons-material";

const CardProd = () => {
  const { listaObjetos } = useContext(HomeContext);

  return (
    <Box
      sx={{
        flexWrap: "wrap",
      }}
    >
      <Grid container spacing={5} sx={{ padding: "7%", textAlign: "center" }}>
        {listaObjetos.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="h4">Nenhum objeto encontrado</Typography>
          </Grid>
        )}
        {listaObjetos.map((objeto) => (
          <>
            {objeto.ativo && (
              <Grid item xs={12} sm={6} md={4} lg={3} key={objeto.codigo}>
                <Card variant="outlined" sx={{ maxWidth: 345 }}>
                  <CardActionArea
                    component={NavLink}
                    to={`produto/${objeto.codigo}`}
                  >
                    <CardHeader
                      title={objeto.nome}
                      subheader={formatoMoeda(objeto.valor)}
                    />
                    <Divider />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {objeto.descricao}
                      </Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ padding: "5px" }}
                      >
                        Estoque: {objeto.quantidade_estoque}
                      </Typography>
                      <Divider />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ padding: "5px" }}
                      >
                        {objeto.categoria_nome}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )}
          </>
        ))}
      </Grid>
    </Box>
  );
};

export default CardProd;
