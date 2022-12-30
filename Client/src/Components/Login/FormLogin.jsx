import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import fondoPelis from "../../assets/img/fondo-peliculas.jpg";
import "./Fondo-degradado-animado.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";

const theme = createTheme({
  palette: {
    neutral: {
      main: '#131313',
      contrastText: '#131313',
    },
  },
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        La Flia Cine
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const FormLogin = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${fondoPelis})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className="fondo-container">
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
              color: "#131313"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#AB3428" }}>
              <TheaterComedyIcon />
            </Avatar>
            <Typography variant="h3" sx={{ fontFamily: "'Ultra', serif", letterSpacing: "2px" }}>
              La Flia Cine
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <ThemeProvider theme={theme}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  variant="filled"
                  color="neutral"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="filled"
                  color="neutral"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="neutral" />}
                  label="Recordar"
                />
                <Button
                  className="button"
                  fullWidth
                  type="submit"
                  size="medium"
                  sx={{ mt: 5, mb: 8,}}
                >
                  <Typography variant="h5" sx={{ color: "#ddd", fontWeight: "700", fontFamily: "'Fjalla One', sans-serif" }}>
                    Ingresar
                  </Typography>
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2" underline="hover" sx={{ color: "#131313", borderBottom: "#ddd" }}>
                      ¿Olvidaste tu contaseña?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2" underline="hover" sx={{ color: "#131313", borderBottom: "#ddd" }}>
                      {"¿No tenés cuenta? ¡Registrate acá!"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </ThemeProvider>
            </Box>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default FormLogin;
