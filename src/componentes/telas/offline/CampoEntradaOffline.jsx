import TextField from "@mui/material/TextField";

const CampoEntradaOffline = ({ id, label, tipo, name, value, onchange, requerido, readonly, maxCaracteres, msgvalido, msginvalido }) => (
  <TextField
    id={id}
    label={label}
    type={tipo}
    name={name}
    value={value}
    onChange={onchange}
    required={requerido}
    InputProps={{ readOnly: readonly }}
    inputProps={{ maxLength: maxCaracteres }}
    helperText={value ? msgvalido : msginvalido}
    fullWidth
    margin="normal"
  />
);

export default CampoEntradaOffline;
