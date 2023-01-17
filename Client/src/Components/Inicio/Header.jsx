import styled from "@emotion/styled";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./animationTitle.css"

const ImagenHeader = styled.div`
  height: 95vh;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0 auto;
  box-shadow: 0px 14px 50px -9px #000000;
`;

const Frases = styled.h1`
font-size: clamp(2rem, 8vw - 2.5rem, 4rem);
width: 80%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
font-family: "Monoton", Helvetica, sans-serif;
letter-spacing: 5px;
`;

const Header = () => {
  const [ultimasPeliculas, setUltimasPeliculas] = useState([]);

  const API_LASTEST_MOVIES = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-MX&page=1`;
  const API_IMG = `https://image.tmdb.org/t/p/original/`;

  useEffect(() => {
    axios
      .get(API_LASTEST_MOVIES)
      .then((res) => res.data.results)
      .then((res) => setUltimasPeliculas(res.splice(0, 4)));
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="containerHeader" maxWidth="100%" style={{ padding: "0" }}>
      <Carousel
        height="95vh"
        navButtonsAlwaysInvisible={true}
        stopAutoPlayOnHover={false}
        interval="5000"
        indicators={false}
      >
        {ultimasPeliculas.map((elem) => {
          const imagenFondo = `${API_IMG}${elem.backdrop_path}`;
          return (
            <ImagenHeader
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(171,52,40,1) 0%, rgba(171,52,40,0.7749300403755253) 52%, rgba(171,52,40,0.267927239255077) 89%), url(${imagenFondo})`,
              }}
              key={elem.id}
            >
              <Frases>
                <span className="header-title">Organizar tus gustos cinéfilos y seriales, nunca fue tan fácil</span>
              </Frases>
            </ImagenHeader>
          );
        })}
      </Carousel>
    </Container>
  );
};

export default Header;
