import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
function DialogoSimples(props) {
    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)}
            fullWidth={true}
            maxWidth={props.maxWidth}
            // maxWidth pode ser 'xs' 'sm' 'md' 'lg' 'xl'
            id={props.id}>
            <DialogTitle>{props.titulo}</DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '97%' },
                        maxWidth: '100%',
                    }}
                    autoComplete="off"
                >
                    {props.children}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)}>Fechar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogoSimples;