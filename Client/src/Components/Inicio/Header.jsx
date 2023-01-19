import styled from "@emotion/styled";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./home.css"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

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

const Titulo = styled.h1`
text-transform: uppercase;
  background-image: linear-gradient(
    -225deg,
    #F5EE9E 0%,
    #AB3428 29%,
    #F49E4C 67%,
    #F5EE9E 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite;
  display: inline-block;
  font-size: clamp(2rem, 10.7vw - 2.7rem, 4rem);
  text-align: center;
  font-family: "Monoton", Helvetica, sans-serif;
  letter-spacing: 5px;
  font-weight: 200;

@keyframes textclip {
to {
background-position: 200% center;
}
}
`

const Frases = styled.div`
font-size: clamp(2rem, 8vw - 2.5rem, 4rem);
width: 70%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`;

const Header = ({ setState }) => {
  const [ultimasPeliculas, setUltimasPeliculas] = useState([]);


  const API_LASTEST_MOVIES = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-MX&page=1`;
  const API_IMG = `https://image.tmdb.org/t/p/original/`;
  const imgNull =
    "https://canalcocina.es/medias/publicuploads/2015/07/07/147549/846988273559c066aac7193.09884642.png";

  useEffect(() => {
    axios
      .get(API_LASTEST_MOVIES)
      .then((res) => res.data.results)
      .then((res) => setUltimasPeliculas(res.splice(0, 4)))
      .catch(() => console.error("Not Found"))
    // eslint-disable-next-line
  }, []);

  const timer = () => {
    setState(true)
    setTimeout(() => { setState(false) }, 2000)
  }

  const styleConteinerArrow = { position: "absolute", height: "90vh", left: "50%", marginLeft: "-50px" }
  const styleIconArrow = { position: "absolute", bottom: 0, zIndex: "2", cursor: "pointer", background: "#00000062", borderRadius: "50%", padding: 1 }

  return (
    <Container className="containerHeader" maxWidth="100%" style={{ padding: "0" }}>
      <Container maxWidth="xs" sx={styleConteinerArrow}>
        <KeyboardDoubleArrowDownIcon color="warning" fontSize="large" onClick={timer} sx={styleIconArrow} />
      </Container >
      <Carousel
        height="95vh"
        navButtonsAlwaysInvisible={true}
        stopAutoPlayOnHover={false}
        interval="5000"
        indicators={false}
      >
        {ultimasPeliculas.map((elem) => {
          let imagenFondo = `${API_IMG}${elem.backdrop_path}`;
          if (imagenFondo === undefined || imagenFondo === "") {
            imagenFondo = imgNull
          }
          return (
            <ImagenHeader
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(17,19,22,1) 9%, rgba(18,21,26,0.8533614129245448) 56%, rgba(34,48,83,0.39117653897496496) 100%), url(${imagenFondo})`,
              }}
              key={elem.id}
            >
              <Frases>
                <Titulo>Organizar tus gustos cinéfilos y seriales, nunca fue tan fácil</Titulo>
              </Frases>
            </ImagenHeader>
          );
        })}
      </Carousel>
    </Container>
  );
};

export default Header;
