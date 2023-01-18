import styled from "@emotion/styled";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { MotionTitle, MotionCards } from "../common/ScrollAnimations";

const ContainerMovies = styled.div`
background: #F49E4C; 
width: 100wh;
height: inherit; 
padding-top:50px; 
padding-bottom:90px; 
margin-top:10%; 
margi-bottom:10%
`;

const Estrenos = () => {
    const [movies, setMovies] = useState([]);

    const API_UPCOMING_MOVIES = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-MX&page=1`

    useEffect(() => {
        axios.get(API_UPCOMING_MOVIES)
            .then(res => {
                setMovies(res.data.results.splice(0, 3))
            })
            .catch(() => console.error("NOT FOUND"))
        // eslint-disable-next-line
    }, [])

    if (movies.length > 0) {
        return (
            <ContainerMovies>
                <Container maxWidth="md">
                    <MotionTitle text="ÚLTIMOS ESTRENOS" />
                    <MotionCards arr={movies} />
                </Container>
            </ContainerMovies >
        )
    }
}

export default Estrenos;