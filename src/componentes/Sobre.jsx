import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Sobre = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container alignContent={"center"} justifyContent={"center"}>
          <Grid item xs={12} sm={12} md={6}>
            <Card sx={{ minWidth: 50 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Sobre o sistema...
                </Typography>
                <Typography variant="h5" component="div">
                  Sistema desenvolvido para estudo no projeto de pesquisa
                  intitulado: Estudo Comparativo entre Bibliotecas de
                  Componentes de Interface de Usuário para ReactJS.
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  IFSUL - Passo Fundo
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Início da Execução: 01/09/2023 Término da Execução: 31/08/2024
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Número de registro do projeto na PROPESP: PE08230723/059
                </Typography>
                <Typography variant="h5" component="div">
                  Data da versão
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  18/09/2023
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Sobre;
