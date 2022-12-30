import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        neutral: {
            main: '#131313',
            color: '#131313',
        }
    },
});

const CheckboxesGroup = () => {
    const [state, setState] = useState({
        accion: true,
        aventuras: true,
        cienciaFiccion: false,
        drama: false,
        fantasia: false,
        musical: false,
        suspenso: false,
        terror: false
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { accion, aventuras, cienciaFiccion, drama, fantasia, musical, suspenso, terror } = state;
    const error = [accion, aventuras, cienciaFiccion, drama, fantasia, musical, suspenso, terror].filter((v) => v).length !== 2;

    return (
        <Box sx={{ display: 'flex' }}>
            <ThemeProvider theme={theme}>
                <Grid container spacing={2}>
                    <FormControl
                        required
                        error={error}
                        component="fieldset"
                        sx={{ ml: 3, mr: 3, mt: 2 }}
                        variant="standard"
                    >
                        <FormLabel component="legend">Elige dos géneros</FormLabel>
                        <FormGroup>
                            <Box sx={{ width: '100%' }}>
                                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: "0" }}>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={accion} color="neutral" onChange={handleChange} name="accion" />
                                            }
                                            label="Acción"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={aventuras} color="neutral" onChange={handleChange} name="aventuras" />
                                            }
                                            label="Aventuras"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={cienciaFiccion} color="neutral" onChange={handleChange} name="cienciaFiccion" />
                                            }
                                            label="Ciencia Ficción"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={drama} color="neutral" onChange={handleChange} name="drama" />
                                            }
                                            label="Drama"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={fantasia} color="neutral" onChange={handleChange} name="fantasia" />
                                            }
                                            label="Fantasía"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={musical} color="neutral" onChange={handleChange} name="musical" />
                                            }
                                            label="Musical"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={suspenso} color="neutral" onChange={handleChange} name="suspenso" />
                                            }
                                            label="Suspenso"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={terror} color="neutral" onChange={handleChange} name="terror" />
                                            }
                                            label="Terror"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </FormGroup>
                        <FormHelperText>Elige 2 géneros que te gusten.</FormHelperText>
                    </FormControl>
                </Grid>
            </ThemeProvider>
        </Box>
    );
}

export default CheckboxesGroup;