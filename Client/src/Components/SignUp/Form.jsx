import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
  Radio,
  RadioGroup,
  TextField,
  createTheme,
  styled,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import Copyright from "../common/Copyright";

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

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "http://localhost:3000/auth/register",
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
    <Container component="main" maxWidth="sm" sx={{ py: 10 }}>
      <Container className="register-form">
        <Typography
          variant="h5"
          sx={{
            my: 2,
            color: "#ba2113",
            fontWeight: "700",
            fontFamily: "'Fjalla One', sans-serif",
          }}
        >
          Registrate
        </Typography>
        <ThemeProvider theme={theme}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "grid", gap: 2 }}
          >
            <TextField
              id="outlined-multiline-flexible"
              label="Nombre"
              type="text"
              placeholder="nombre"
              {...register("nombre", { required: true })}
              multiline
              maxRows={4}
              color="neutral"
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Nombre de usuario"
              type="text"
              placeholder="usuario"
              {...register("usuario", { required: true, max: 13, min: 5 })}
              multiline
              maxRows={4}
              color="neutral"
            />
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
            <FormLabel id="demo-radio-buttons-group-label">
              Subcribirte a nuestro newstle
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="no"
                name="newstle"
                {...register("newstle", { required: true })}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                />
                <FormControlLabel value={true} control={<Radio />} label="Si" />
              </RadioGroup>
            </FormLabel>
            <BotonEnviar
              variant="contained"
              type="submit"
              sx={{ width: 1 / 4, mb: 2 }}
            >
              Enviar
            </BotonEnviar>
          </Box>
        </ThemeProvider>
      </Container>
      <Typography
        color="#fff"
        sx={{ textAlign: "center", mt: 5, display: "grid" }}
      >
        ¿Ya tienes una cuenta?
        <Link color="primary" href="/login">
          Inicia sesion aquí
        </Link>
      </Typography>
      <Copyright color="#fff" />
    </Container>
  );
};

export default Form;
