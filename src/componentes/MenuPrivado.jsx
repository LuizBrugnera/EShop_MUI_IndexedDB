import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider } from "@mui/material";
import Autenticacao from "./seguranca/Autenticacao";
import WithAuth from "./seguranca/WithAuth";

function MenuPrivado() {
  const [anchorEl, setAnchorEl] = useState(null);

  const autenticacao = Autenticacao.pegaAutenticacao();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElMenuManutencoes, setAnchorElMenuManutencoes] = useState(null);

  const handleOpenMenuManutencoes = (event) => {
    setAnchorElMenuManutencoes(event.currentTarget);
  };

  const handleCloseMenuManutencoes = () => {
    setAnchorElMenuManutencoes(null);
  };

  const handleCloseNavMenuManutencoes = () => {
    setAnchorElNav(null);
    setAnchorElMenuManutencoes(null);
  };

  const [anchorElMenuUser, setAnchorElMenuUser] = useState(null);

  const handleOpenMenuUser = (event) => {
    setAnchorElMenuUser(event.currentTarget);
  };

  const handleCloseMenuUser = () => {
    setAnchorElMenuUser(null);
  };

  const handleCloseNavMenuUser = () => {
    setAnchorElNav(null);
    setAnchorElMenuUser(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Menu barras pequeno */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Box sx={{ flexGrow: 0 }}>
                  <MenuItem>
                    <Button
                      textAlign="center"
                      component={NavLink}
                      to="/privado"
                    >
                      Home
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button textAlign="center" component={NavLink} to="sobre">
                      Sobre
                    </Button>
                  </MenuItem>
                  {autenticacao && (
                    <MenuItem onClick={handleOpenMenuManutencoes}>
                      <Button textAlign="center">Manutenções</Button>
                    </MenuItem>
                  )}
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-manutencoes"
                    anchorEl={anchorElMenuManutencoes}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={anchorElMenuManutencoes}
                    onClose={handleCloseMenuManutencoes}
                  >
                    <MenuItem
                      onClick={handleCloseNavMenuManutencoes}
                      component={NavLink}
                      to="produtos"
                    >
                      <Typography textAlign="center">Produtos</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNavMenuManutencoes}
                      component={NavLink}
                      to="categorias"
                    >
                      <Typography textAlign="center">Categorias</Typography>
                    </MenuItem>
                  </Menu>

                  <MenuItem onClick={handleOpenMenuUser}>
                    <Button textAlign="center">
                      {autenticacao
                        ? "Usuário: " + autenticacao.nome_usuario
                        : "Usuário"}
                    </Button>
                  </MenuItem>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-user"
                    anchorEl={anchorElMenuUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={anchorElMenuUser}
                    onClose={handleCloseMenuUser}
                  >
                    <MenuItem
                      onClick={handleCloseNavMenuUser}
                      component={NavLink}
                      to="/"
                    >
                      {autenticacao ? (
                        <Typography
                          textAlign="center"
                          exact
                          to="/"
                          onClick={() => Autenticacao.logout()}
                        >
                          Logout
                        </Typography>
                      ) : (
                        <Button exact to="login" textAlign="center">
                          Login
                        </Button>
                      )}
                    </MenuItem>
                  </Menu>
                </Box>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              EShop
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              EShop
            </Typography>

            {/* Opçoes tela grande */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                component={NavLink}
                to="/privado"
              >
                Home
              </Button>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Manutenções
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={handleClose}
                  component={NavLink}
                  to="produtos"
                >
                  Produtos
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={handleClose}
                  component={NavLink}
                  to="categorias"
                >
                  Categorias
                </MenuItem>
              </Menu>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleOpenMenuUser}
              >
                {autenticacao
                  ? "Usuário: " + autenticacao.nome_usuario
                  : "Usuário"}
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                component={NavLink}
                to="sobre"
              >
                Sobre
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
export default WithAuth(MenuPrivado);
