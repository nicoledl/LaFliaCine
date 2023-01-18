import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import Checkboxes from './Checkboxes'

const Form = () => {

  return (
    <Container component="main" maxWidth="md" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom:"20px"}}>
      <Box sx={{ pt:2, pb:2, pl:4, pr:4, background: "#fff", borderRadius: "50px", width: "inherit", height: "auto", mt: 3, "gap": 5 }} >
        <Container component="div" maxWidth="md" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Avatar sx={{ m: 2, bgcolor: "#AB3428" }}>
            <LockOutlinedIcon />
          </Avatar>
        </Container>
        <Typography variant='h4' sx={{ textAlign: "center", mb: "4vh", fontWeight: "700", fontFamily: "'Fjalla One', sans-serif" }}>Registrate</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              inputProps={{ style: { fontFamily: 'Arial', color: 'white' } }}
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="Nombre/s"
              autoFocus
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Apellido"
              name="lastName"
              autoComplete="family-name"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Mail"
              name="email"
              autoComplete="email"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <Checkboxes />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox name="drama" />
              }
              label="Subscribite para recibir novedades sobre nuevas peliculas y series."
            />
          </Grid>
          <Grid item xs={12}>
            <Button className="button" type="submit" fullWidth sx={{ mb: 2, pl: 5, pr: 5 }} >
              <Typography variant="h5" sx={{ color: "#ddd", fontWeight: "700", fontFamily: "'Fjalla One', sans-serif" }}>
                Registrarse
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Form;