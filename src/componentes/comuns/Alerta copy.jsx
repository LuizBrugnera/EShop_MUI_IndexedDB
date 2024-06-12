import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Alerta = ({ alerta }) => {
  const [exibir, setExibir] = useState(false);

  useEffect(() => {
    setExibir(true);
    setTimeout(() => {
      setExibir(false);
    }, 4000);
  }, [alerta]);

  return (
    <>
      {alerta.message.length > 0 && exibir && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity={alerta.status === "error" ? "error" : "success"}>
            {alerta.message}
          </Alert>
        </Stack>
      )}
    </>
  );
};

export default Alerta;
