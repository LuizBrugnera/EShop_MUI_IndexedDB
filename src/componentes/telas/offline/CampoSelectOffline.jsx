import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

const CampoSelectOffline = ({ id, label, idLabel, name, value, onchange, requerido, msgvalido, msginvalido, children }) => (
  <FormControl fullWidth margin="normal">
    <InputLabel id={idLabel}>{label}</InputLabel>
    <Select
      labelId={idLabel}
      id={id}
      name={name}
      value={value}
      onChange={onchange}
      required={requerido}
      label={label}
    >
      {children}
    </Select>
    <FormHelperText>{value ? msgvalido : msginvalido}</FormHelperText>
  </FormControl>
);

export default CampoSelectOffline;
