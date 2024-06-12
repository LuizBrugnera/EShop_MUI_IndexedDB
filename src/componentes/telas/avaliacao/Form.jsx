import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";
import CampoSelect from "../../comuns/CampoSelect";
import MenuItem from "@mui/material/MenuItem";
import AvaliacaoContext from "./AvaliacaoContext";

function Form() {
  const {
    objeto,
    handleChange,
    acaoCadastrarAvaliacao,
    alerta,
    abreDialogo,
    setAbreDialogo,
  } = useContext(AvaliacaoContext);

  const notas = [1, 2, 3, 4, 5];

  return (
    <>
      <Dialogo
        id="modalEdicao"
        titulo="Avalição"
        open={abreDialogo}
        setOpen={setAbreDialogo}
        acaoCadastrar={acaoCadastrarAvaliacao}
        idform="formulario"
        maxWidth="sm"
      >
        <Alerta alerta={alerta} />
        <CampoEntrada
          id="txtCodigo"
          label="Codigo"
          tipo="number"
          name="codigo"
          value={objeto.codigo}
          onchange={handleChange}
          requerido={false}
          readonly={true}
        />
        <CampoEntrada
          id="txtAutor"
          label="Autor"
          tipo="text"
          name="autor"
          value={objeto.autor}
          onchange={handleChange}
          requerido={true}
          readonly={false}
          maxlength={50}
          msgvalido="Autor OK"
          msginvalido="Informe o autor"
        />
        <CampoEntrada
          value={objeto.email}
          id="txtEmail"
          name="email"
          label="Email"
          tipo="text"
          onchange={handleChange}
          msgvalido="OK certo"
          msginvalido="Informe o autor"
          requerido={true}
          readonly={false}
          maxCaracteres={40}
        />
        <CampoEntrada
          id="txtTexto"
          label="Texto"
          tipo="text"
          name="texto"
          value={objeto.texto}
          onchange={handleChange}
          requerido={true}
          readonly={false}
          maxlength={250}
          msgvalido="Texto OK"
          msginvalido="Informe o texto"
        />
        <CampoSelect
          id="selectNota"
          label="Nota"
          idLabel="labelNota"
          name="nota"
          value={objeto.nota}
          onchange={handleChange}
          requerido={true}
          msgvalido="Nota OK"
          msginvalido="Informe a nota"
        >
          {notas.map((nota) => (
            <MenuItem value={nota} key={nota}>
              {nota}
            </MenuItem>
          ))}
        </CampoSelect>
        <CampoEntrada
          value={objeto.data}
          id="txtDataCadastro"
          name="data"
          label="Data de Cadastro"
          tipo="date"
          onchange={handleChange}
          msgvalido="OK certo"
          msginvalido="Informe a data de cadastro"
          requerido={true}
          readonly={false}
          maxCaracteres={12}
        />
      </Dialogo>
    </>
  );
}

export default Form;
