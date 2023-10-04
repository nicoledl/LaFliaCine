import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import VentanaInfo from "./VentanaInfo";
import BotonesActivos from "../common/BotonesActivos";
import { Container } from "@mui/system";
import { Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const CardContainer = styled.div`
  position: relative;
  height: 370px;
  color: #131313;
  -webkit-box-shadow: 0px 15px 16px -12px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 15px 16px -12px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 15px 16px -12px rgba(0, 0, 0, 0.75);
  background: #f49e4c;
  & {
    transition: all 0.5s ease-in-out;
  }
`;

const ImgContainer = styled.div`
  .card-media {
    height: 10rem;
  }
  &:hover .card-media {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
    transition: all 0.5s ease-in-out;
    filter: saturate(180%);
  }
  & {
    overflow: hidden;
  }
`;

const MediaCard = ({ id, formato }) => {
  const [data, setData] = useState("");

  const urlData = `${process.env.REACT_APP_BASE_URL}${formato}/${id}?language=es-AR`;
  const API_IMG = `https://image.tmdb.org/t/p/original/`;
  const imgNull =
    "https://canalcocina.es/medias/publicuploads/2015/07/07/147549/846988273559c066aac7193.09884642.png";

  const releaseDate =
    formato === "movie"
      ? new Date(data.release_date)
      : new Date(data.first_air_date);
  const year = releaseDate.getFullYear();

  useEffect(() => {
    axios
      .get(urlData, {
        headers: {
          accept: "application/json",
          Authorization: process.env.REACT_APP_TMDB_API_KEY,
        },
      })
      .then((res) => setData(res.data))
      .catch(() => console.error("Not Found"));
    // eslint-disable-next-line
  }, []);

  return (
    <CardContainer>
      <ImgContainer>
        <CardMedia
          className="card-media"
          component="img"
          image={
            data.backdrop_path === undefined || data.backdrop_path === null
              ? imgNull
              : API_IMG + data.backdrop_path
          }
          alt={data.title === undefined ? data.name : data.title}
          sx={{
            transition: "all .5s ease-in-out",
          }}
        />
      </ImgContainer>
      <CardContent>
        <Typography
          variant={data.title?.length < 18 && "h6"}
          fontSize={data.title?.length > 18 && 15}
          color={"#fff"}
          sx={{
            fontWeight: "500",
            lineHeight: "90%",
            fontFamily: "'Francois One', sans-serif",
          }}
        >
          {data.title === undefined ? data.name : data.title}
        </Typography>
        <Divider textAlign="right">
          <Typography
            color={"#fff"}
            sx={{ fontWeight: "600", fontStyle: "oblique" }}
          >
            {isNaN(year) ? "" : year}
          </Typography>
        </Divider>
        <VentanaInfo id={id} formato={formato} />
      </CardContent>
      <Container
        style={{ padding: "0", display: "flex", justifyContent: "end" }}
      >
        <BotonesActivos contentId={data.id} formato={formato} />
      </Container>
    </CardContainer>
  );
};

export default MediaCard;
