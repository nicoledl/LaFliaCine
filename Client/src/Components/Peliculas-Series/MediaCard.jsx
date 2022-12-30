import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import VentanaInfo from "./VentanaInfo";
import BotonesActivos from "../common/BotonesActivos";
import { Container } from "@mui/system";
import { Divider } from "@mui/material";

const CardContainer = styled.div`
  position: relative;
  height: 430px;
  color: #131313;
  -webkit-box-shadow: 0px 15px 16px -12px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 15px 16px -12px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 15px 16px -12px rgba(0, 0, 0, 0.75);
  background: #F49E4C;
  & {
    transition: all 0.5s ease-in-out;
  }
`;

const ImgContainer = styled.div`
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

const MediaCard = (props) => {
  return (
    <CardContainer>
      <ImgContainer>
        <CardMedia
          className="card-media"
          component="img"
          image={props.imagen}
          alt={props.titulo}
          style={{ transition: "all .5s ease-in-out" }}
        />
      </ImgContainer>
      <CardContent>
        <Typography
          sx={{ fontWeight: "600", fontSize:"clamp(1rem, 9.6vw - 4.4rem, 1.6rem)", lineHeight:"90%",
          fontFamily: "'Francois One', sans-serif" }}
        >
          {props.titulo}
        </Typography>
        <Divider textAlign="right">
          <Typography
            component="body1"
            sx={{ fontWeight: "600", fontStyle: "oblique" }}
          >
            {props.lanzamiento.slice(0, 4)}
          </Typography>{" "}
        </Divider>
        <VentanaInfo
          detalle={props.detalle}
          titulo={props.titulo}
          imagen={props.imagen}
          id={props.id}
          formato={props.formato}
          lanzamiento={props.lanzamiento.slice(0, 4)}
        />
      </CardContent>
      <Container style={{ position: "absolute", bottom: "0", padding: "0" }}>
        <BotonesActivos />
      </Container>
    </CardContainer>
  );
};

export default MediaCard;
