import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Alerta from "../../comuns/Alerta";
import "./signin.css";
import jwt_decode from "jwt-decode";
import Autenticacao from "../../seguranca/Autenticacao";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Login() {
  const { pegaAutenticacao, gravaAutenticacao } = Autenticacao;

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [autenticado, setAutenticado] = useState(false);

  const acaoLogin = async (e) => {
    e.preventDefault();

    try {
      const body = {
        email: email,
        senha: senha,
      };
      await fetch(`${process.env.REACT_APP_ENDERECO_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.auth === true) {
            setAlerta({ status: "success", message: JSON.stringify(json) });
            setAutenticado(true);
            gravaAutenticacao(json);
          } else {
            setAlerta({ status: "error", message: JSON.stringify(json) });
          }
        });
    } catch (err) {
      console.error(err);
    }

    try {
      const autenticacao = pegaAutenticacao();
      console.log(autenticacao);
      console.log("token: " + autenticacao.token);
      console.log("decoded: " + JSON.stringify(jwt_decode(autenticacao.token)));
    } catch {
      console.error("erro ao pegar usuario");
    }
  };

  useEffect(() => {
    const autenticacao = pegaAutenticacao();
    if (autenticacao != null) {
      console.log("autenticação não é null");
      if (autenticacao.auth === true) {
        setAutenticado(true);
      }
    }
  }, []);

  if (autenticado === true) {
    return <Navigate to="/privado" />;
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login de Usuário
          </Typography>
          <Alerta alerta={alerta} />
          <Box component="form" onSubmit={acaoLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              value={email}
              name="login"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={senha}
              name="password"
              onChange={(e) => setSenha(e.target.value)}
              label="Senha"
              type="password"
              id="password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Efetuar Login
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
