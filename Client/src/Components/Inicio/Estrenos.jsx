import styled from "@emotion/styled";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { MotionTitle, MotionCards } from "../common/ScrollAnimations";

const ContainerMovies = styled.div`
  background: #f49e4c;
  width: 100wh;
  height: inherit;
  padding-top: 50px;
  padding-bottom: 90px;
  margin-top: 10%;
  margi-bottom: 10%;
`;

const Estrenos = () => {
  const [movies, setMovies] = useState([]);

  const API_UPCOMING_MOVIES = `${process.env.REACT_APP_BASE_URL}movie/upcoming?language=es-AR&page=1`;

  useEffect(() => {
    axios
      .get(API_UPCOMING_MOVIES, {
        headers: {
          accept: "application/json",
          Authorization: process.env.REACT_APP_TMDB_API_KEY,
        },
      })
      .then((res) => {
        setMovies(res.data.results.splice(0, 3));
      })
      .catch(() => console.error("NOT FOUND"));
    // eslint-disable-next-line
  }, []);

  if (movies.length > 0) {
    return (
      <ContainerMovies>
        <Container maxWidth="md">
          <MotionTitle text="ÚLTIMOS ESTRENOS" />
          <p
            style={{
              padding: 0,
              marginBottom: "15px",
              color: "#fff",
              fontFamily: "monospace",
            }}
          >
            (clickea para más información)
          </p>
          <MotionCards arr={movies} />
        </Container>
      </ContainerMovies>
    );
  }
};

export default Estrenos;
