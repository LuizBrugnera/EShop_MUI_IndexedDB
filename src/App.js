import { createBrowserRouter, RouterProvider, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuPublico from "./componentes/MenuPublico";
import NotFound from "./componentes/telas/NotFound";
import Home from "./componentes/telas/home/Home";
import MenuPrivado from "./componentes/MenuPrivado";
import Avaliacao from "./componentes/telas/avaliacao/Avaliacao";
import Login from "./componentes/telas/login/Login";
import Sobre from "./componentes/Sobre";
import Categoria from "./componentes/telas/categoria/Categoria";
import Produto from "./componentes/telas/produto/Produto";
import TelaOffline from "./componentes/telas/offline/TelaOffline";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPublico />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "produto/:id",
        element: <Avaliacao />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sobre",
        element: <Sobre />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/privado",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "produto/:id",
        element: <Avaliacao />,
      },
      {
        path: "categorias",
        element: <Categoria />,
      },
      {
        path: "produtos",
        element: <Produto />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sobre",
        element: <Sobre />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/offline",
    element: <TelaOffline />,
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <ConnectionHandler />
    </RouterProvider>
  );
}

function ConnectionHandler() {
  const [isOffline, setIsOffline] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true);
      navigate("/offline");
    };

    const handleOnline = () => {
      setIsOffline(false);
      navigate("/");
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    const checkOnlineStatus = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
          setIsOffline(false);
        } else {
          setIsOffline(true);
          navigate("/offline");
        }
      } catch (error) {
        setIsOffline(true);
        navigate("/offline");
      }
    };

    checkOnlineStatus();

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [navigate]);

  return null; // Este componente não precisa renderizar nada
}

export default App;
