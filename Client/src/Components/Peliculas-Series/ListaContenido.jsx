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
import "./animationTitle.css";

const PaginationContainer = styled.div`
  width: 100%;
  height: 140px;
  margin: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const ListaContenido = ({ formato }) => {
  const [busqueda, setBusqueda] = useState([]);
  const [populares, setPopulares] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);

  const API_POPULARES = `https://api.themoviedb.org/3/${formato}/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-MX&page=${page}`;
  const API_BUSQUEDA = `https://api.themoviedb.org/3/search/${formato}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-MX&query=${input}&page=${page}&include_adult=false`;

  const API_IMG = `https://image.tmdb.org/t/p/original/`;
  const imgNull = "https://trek.scene7.com/is/image/TrekBicycleProducts/default-no-image?fmt=pjpeg&qlt=80,1&iccEmbed=0&cache=on,on";

  useEffect(() => {
    axios.get(API_POPULARES)
      .then(res => setPopulares(res.data.results))
      .catch(() => console.error("Not Found"))
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (input === undefined || input === "") {
      return
    }
    axios.get(API_BUSQUEDA)
      .then(res => setBusqueda(res.data.results))
      .catch(() => console.error("Not Found"))
    // eslint-disable-next-line
  }, [input, page])

  const handleChange = (e) => {
    if (e.target.value === "" || e.target.value === undefined) {
      setVisible(false)
      return setInput("")
    }
    setInput(e.target.value)
    setVisible(true)
  }

  const paginationControlled = (api) => {
    const handleChange = (event, value) => {
      setPage(value);
    };
    return (
      <Stack spacing={2} style={{ background: "#fff", borderRadius: "10px", padding: 4 }}>
        <Pagination
          color="error"
          count={Math.floor(api.length / 20)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    );
  }

  const contenido = (array) => {
    const releaseDate = (elem) => formato === "movie" ? new Date(elem.release_date) : new Date(elem.first_air_date)
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
          {array?.map((elem, i) => {
            return (
              <Grid item xs={12} sm={4} md={4} lg={3} key={elem.id}>
                <MediaCard
                  key={i}
                  titulo={elem.title === undefined ? elem.name : elem.title}
                  lanzamiento={releaseDate(elem).getFullYear()}
                  imagen={
                    elem.backdrop_path === undefined || elem.backdrop_path === null ? imgNull : API_IMG + elem.backdrop_path
                  }
                  detalle={elem.overview || "Sin descripción..."}
                  id={elem.id}
                  formato={formato}
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
      <Container sx={{ mt: 5, color: "white", fontFamily: "Fjalla One", bgcolor: "#fff", ml: 0, borderRadius: "0 30px 30px 0", height: "60px", width: { md: "70vh", sm: "50vh", xs: "30vh" }, display: "table-cell", verticalAlign: "middle" }}>
        <input type="text" placeholder="🔎 BÚSQUEDA" value={input} onChange={handleChange} size="5" style={{ border: "none", float: "right", height: "25px", width: "50%", fontSize: "1em", outline: "none" }} />
      </Container>
      <Container maxWidth="xl" style={{ marginTop: "80px" }}>
        {visible ? contenido(busqueda) : contenido(populares)}
        {visible ? (
          <PaginationContainer>
            {busqueda.length === 0 ? <div style={{ marginTop: "20%" }} ><h1 className="not-found">No hay resultados...</h1></div> : paginationControlled(API_BUSQUEDA)}
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
