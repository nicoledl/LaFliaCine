import { useEffect, useState } from "react";
import axios from "axios";
import MediaCard from "./MediaCard";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    nocturno: {
      main: "#fff",
    },
    brillante: {
      main: "#000",
    },
  },
});

const PaginationContainer = styled.div`
  width: 100%;
  height: 140px;
  margin: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const ListaContenido = (props) => {
  const [busqueda, setBusqueda] = useState([]);
  const [populares, setPopulares] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);

  const API_POPULARES = `https://api.themoviedb.org/3/${props.formato}/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-MX&page=${page}`;
  const API_BUSQUEDA = `https://api.themoviedb.org/3/search/${props.formato}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-MX&query=${input}&page=${page}&include_adult=false`;

  const API_IMG = `https://image.tmdb.org/t/p/original/`;
  const imgNull =
    "https://trek.scene7.com/is/image/TrekBicycleProducts/default-no-image?fmt=pjpeg&qlt=80,1&iccEmbed=0&cache=on,on";

  useEffect(() => {
    axios
      .get(input.length > 0 ? API_BUSQUEDA : API_POPULARES)
      .then((res) =>
        input.length > 0
          ? setBusqueda(res.data.results)
          : setPopulares(res.data.results)
      );
    // eslint-disable-next-line
  }, [input || page]);

  function handleChange(e) {
    setInput(e.target.value);
    setVisible(true);
  }

  function paginationControlled(api) {
    const handleChange = (event, value) => {
      setPage(value);
    };
    return (
      <ThemeProvider theme={theme}>
        <Stack spacing={2}>
          <Pagination
            count={api.length}
            page={page}
            onChange={handleChange}
            color="nocturno"
            size="large"
          />
        </Stack>
      </ThemeProvider>
    );
  }

  function contenido(array) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
          {array?.map((elem) => {
            return (
              <Grid item xs={12} sm={4} md={4} lg={3} key={elem.id}>
                <MediaCard
                  key={elem.id}
                  titulo={elem.title || elem.name}
                  lanzamiento={props.formato === "movie" ? elem.release_date : elem.first_air_date}
                  imagen={
                    elem.backdrop_path !== null
                      ? API_IMG + elem.backdrop_path
                      : imgNull
                  }
                  detalle={elem.overview || "Sin descripción..."}
                  id={elem.id}
                  formato={props.formato}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  }

  return (
    <>
      <Container sx={{ mt: 5, color: "white", fontFamily: "Fjalla One", bgcolor: "#fff", ml: 0, borderRadius: "0 30px 30px 0", height: "60px", width: "80vh", display: "table-cell", verticalAlign: "middle" }}>
        <input type="text" placeholder="BÚSQUEDA" name="name" onChange={handleChange} size="5" style={{ border: "none", float: "right", height: "25px", width: "50%", fontSize: "1em" }} />
      </Container>
      <Container maxWidth="xl" style={{ marginTop: "80px" }}>
        {visible ? contenido(busqueda) : contenido(populares)}
        {visible ? (
          <PaginationContainer>
            {paginationControlled(API_BUSQUEDA)}
          </PaginationContainer>
        ) : (
          <PaginationContainer>
            {paginationControlled(API_POPULARES)}
          </PaginationContainer>
        )}
      </Container>
    </>
  );
};

export default ListaContenido;
