import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import fondoPelis from "../../assets/img/fondo-peliculas.jpg";
import "./Fondo-degradado-animado.css";
import { ThemeProvider } from "@mui/material/styles";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  createTheme,
  styled,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#131313",
      contrastText: "#131313",
    },
  },
});

const BotonEnviar = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#ba2113"),
  backgroundColor: "#ba2113",
  "&:hover": {
    backgroundColor: "#912218",
  },
}));

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
              color: "#131313",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#AB3428" }}>
              <TheaterComedyIcon />
            </Avatar>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Ultra', serif",
                letterSpacing: "2px",
                mb: 5,
                textAlign: "center",
              }}
            >
              La Flia Cine
            </Typography>
            <ThemeProvider theme={theme}>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "grid", gap: 2 }}
              >
                <TextField
                  id="outlined-multiline-flexible"
                  label="Mail"
                  type="text"
                  placeholder="mail"
                  {...register("mail", { required: true })}
                  multiline
                  maxRows={4}
                  color="neutral"
                />
                <TextField
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  {...register("contraseña", { required: true })}
                  placeholder="contraseña"
                  label="Contraseña"
                  color="neutral"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <BotonEnviar
                  variant="contained"
                  type="submit"
                  sx={{ width: 1 / 4, mb: 2 }}
                >
                  Enviar
                </BotonEnviar>
              </Box>
            </ThemeProvider>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default FormLogin;
