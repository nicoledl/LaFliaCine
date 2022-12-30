import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@mui/system";
import Carousel from "react-material-ui-carousel";
import MediaCard from "./MediaCard";
import styled from "@emotion/styled";
import "./home.css"
import { Grid } from "@mui/material";


const ContainerWords = styled.div`
z-index:2;
width: 700px;
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
margin-left: auto;
margin-right: auto;
height: 500px;
`;

const SliderTendencias = () => {
  const [contentMovies, setContentMovies] = useState([]);
  const [contentTv, setContentTv] = useState([]);


  const API_TRENDING_MOVIES = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
  const API_TRENDING_TV = `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
  const API_IMG = `https://image.tmdb.org/t/p/original/`;

  useEffect(() => {
    axios.get(API_TRENDING_MOVIES).then((res) => setContentMovies(res.data.results));
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    axios.get(API_TRENDING_TV).then((res) => setContentTv(res.data.results));
    // eslint-disable-next-line
  }, []);

  const arregloContenidoMovie = [];
  const arregloContenidoTv = [];
  contentMovies.forEach((array, index) => {
    if (index >= 18) {
      return;
    }
    if (index % 5 === 0) {
      arregloContenidoMovie.push(contentMovies.slice(index, index + 5));
      arregloContenidoTv.push(contentTv.slice(index, index + 5));
    }
  });

  function carousel(array) {
    return (
      <Carousel
        autoPlay={true}
        topAutoPlayOnHover={true}
        animation="slide"
        indicators={false}
        swipe={true}
        sx={{ maxHeight: "50%" }}
      >
        {array.map((item) => (
          <MediaCard contenido={item} apiImg={API_IMG} key="" />
        ))}
      </Carousel>)
  }



  return (
    <div className="containerTendencias">
      <Grid container spacing={4} maxHeight="100vh" sx={{ pt: 20 }}>
        <Grid item md={12} lg={5} sx={{ verticalAlign: "middle" }}>
          <ContainerWords>
            <Container className="words">
              <div className="words-line">
                <p></p>
                <p>peliculas</p>
              </div>
              <div className="words-line ">
                <p>peliculas</p>
                <p>y series</p>
              </div>
              <div className="words-line ">
                <p>y series</p>
                <p>en</p>
              </div>
              <div className="words-line ">
                <p>en</p>
                <p>tendencias</p>
              </div>
              <div className="words-line ">
                <p>tendencias</p>
                <p></p>
              </div>
            </Container>
          </ContainerWords>
        </Grid>
        <Grid item md={12} lg={7}>
          <Container disableGutters={true} style={{ flexWrap: "wrap", padding: 30 }}>
            {carousel(arregloContenidoMovie)}
            {carousel(arregloContenidoTv)}
          </Container>
        </Grid>

      </Grid>
    </div>
  );
};

export default SliderTendencias;
