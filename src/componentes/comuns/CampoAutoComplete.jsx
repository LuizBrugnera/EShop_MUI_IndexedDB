import TextField from '@mui/material/TextField';
import Autocomplete , { createFilterOptions } from '@mui/material/Autocomplete';

function CampoAutoComplete(props) {

    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        limit: 200,
      });

    return (
        <>
            <Autocomplete
            filterOptions={filterOptions}
                id={props.id}
                options={props.options}
                value={props.value}
                onChange={props.onchange}
                getOptionLabel={props.getOptionLabel}
                renderOption={props.renderOption}                
                renderInput={(params) => <TextField {...params} label={props.label}                                        
                    required={props.requerido}
                    helperText={props.value === "" && props.requerido === true ? props.msginvalido : ' '}
                    error={props.readonly || props.requerido === false ? false : props.value === ""} />}
            />

        </>
    )
}

export default CampoAutoComplete;