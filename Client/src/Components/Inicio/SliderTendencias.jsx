import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@mui/system";
import Carousel from "react-material-ui-carousel";
import MediaCard from "./MediaCard";
import "./animationTitle.css"
import { MotionTitle } from "../common/ScrollAnimations";

const SliderTendencias = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  const API_TRENDING_MOVIES = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
  const API_TRENDING_TV = `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  useEffect(() => {
    axios.get(API_TRENDING_MOVIES)
      .then((res) => {
        const moviesData = res.data.results;
        const divideArr = []
        moviesData.forEach((elem, i) => {
          if (i > 15) {
            return;
          }
          if (i % 5 === 0) {
            const secction = moviesData.slice(i, i + 5)
            divideArr.push(secction)
          }
        });
        setMovies(divideArr)
      })
      .catch(() => console.error("Not Found"))
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios.get(API_TRENDING_TV).then((res) => {
      const seriesData = res.data.results;
      const divideArr = []
      seriesData.forEach((elem, i) => {
        if (i > 15) {
          return;
        }
        if (i % 5 === 0) {
          const secction = seriesData.slice(i, i + 5)
          divideArr.push(secction)
        }
      });
      setSeries(divideArr)
    })
      .catch(() => console.error("Not Found"))
    // eslint-disable-next-line
  }, []);

  function carousel(array) {
    return (
      <Carousel
        height={340}
        autoPlay={true}
        topAutoPlayOnHover={true}
        animation="slide"
        indicators={false}
        swipe={true}
        sx={{ margin: 2, boxShadow: "-1px 1px 17px 8px rgba(0,0,0,1) inset" }}
      >
        {array.map((content, i) => (
          <MediaCard key={i} contenido={content} />
        ))}
      </Carousel>)
  }

  return (
    <Container maxWidth="lg" >
      <MotionTitle text="PELICULAS EN TENDENCIA" />
      {carousel(movies)}
      <MotionTitle text="SERIES EN TENDENCIA" />
      {carousel(series)}
    </Container>
  );
};

export default SliderTendencias;
