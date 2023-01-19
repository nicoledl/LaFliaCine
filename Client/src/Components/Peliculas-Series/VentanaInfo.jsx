import { useEffect, useState } from "react";
import axios from "axios";
//import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import BotonesActivos from "../common/BotonesActivos";
import InfoIcon from "@mui/icons-material/Info";
import { grey } from "@mui/material/colors";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { Container } from "@mui/system";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { Divider, ImageList } from "@mui/material";

const InfoContainer = styled.button`
  decoration: none;
  background: none;
  border: none;
  color: #131313;
  cursor: pointer;
  padding: 0;
  padding-top: 5px;
  margin: 0 auto;
  `;

const StyleBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90wh",
  background: "#F49E4C",
  boxShadow: 24,
  color: "#131313",
  maxHeight: "inherit",
  padding: "0",
  margin: "0 auto",
  marginTop: "1%",
};

const StyleInsideBox = {
  padding: "30px",
  paddingTop: "5vh",
};

const VentanaInfo = ({ id, formato }) => {
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState();
  const [data, setData] = useState([])
  const [credits, setCredits] = useState([])
  const [loading, setLoading] = useState(true)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const urlData = `https://api.themoviedb.org/3/${formato}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-MX`
  const movieCredits = `https://api.themoviedb.org/3/${formato}/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-MX`
  const API_VIDEO_EN = `https://api.themoviedb.org/3/${formato}/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
  const VIDEO_YOUTUBE = `https://www.youtube.com/watch?v=${video}`;
  let API_IMG = `https://image.tmdb.org/t/p/original/`;
  const imgNull =
    "https://canalcocina.es/medias/publicuploads/2015/07/07/147549/846988273559c066aac7193.09884642.png";

  useEffect(() => {
    if (open) {
      axios.get(API_VIDEO_EN)
        .then(res => setVideo(res.data.results[0].key))
        .catch(() => console.error("Not Found"))
    }
    // eslint-disable-next-line
  }, [open]);

  useEffect(() => {
    axios.get(urlData)
      .then(res => setData(res.data))
      .catch(() => console.error("Not Found"))
    // eslint-disable-next-line

    axios.get(movieCredits)
      .then(res => setCredits(res.data.cast.splice(0, 8)))
      .catch(() => console.error("Not Found"))
    // eslint-disable-next-line
  }, [])

  if (loading) {
    setTimeout(() => { setLoading(false) }, 1000)
    return (
      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        <LinearProgress color="warning" />
        <LinearProgress color="warning" />
        <LinearProgress color="warning" />
      </Stack>
    )
  } else {
    const releaseDate = formato === "movie" ? new Date(data.release_date) : new Date(data.first_air_date)
    const year = releaseDate.getFullYear()
    const limiteTexto = data.overview.slice(0, 160);

    if (data.backdrop_path === undefined) {
      API_IMG = imgNull
    }

    const ImgFondo = {
      left: 0,
      top: 0,
      position: "absolute",
      width: "100%",
      backgroundImage: `linear-gradient(180deg,rgba(244,158,76,0) 80%,  rgba(244,158,76,0.90) 100%), url(${API_IMG + data.backdrop_path})`,
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      height: "300px",
      opacity: "0.2",
      zIndex: "-1",
      filter: "saturate(130%)",
    };

    return (
      <div>
        <InfoContainer onClick={handleOpen}>
          <Typography
            align="left"
            sx={{ fontSize: "clamp(0.8rem, 0vw + 0.8rem, 0.80rem)", fontFamily: "'M PLUS Rounded 1c', sans-serif", fontWeight: "700" }}
          >
            {data.overview !== undefined && data.overview.length < 160 ? limiteTexto : limiteTexto + "..."}
            <InfoIcon
              fontSize="small"
              sx={{ color: grey[900], padding: "0", margin: "0 auto" }}
            />
          </Typography>
        </InfoContainer>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          // BackdropComponent={Backdrop}
          // Backdrop{{
          //   timeout: 500,
          // }}
          sx={{
            overflow: "scroll",
          }}
        >
          <Fade in={open}>
            <Container maxWidth="md" sx={StyleBox}>
              <Container sx={StyleInsideBox}>
                <div style={ImgFondo} ></div>
                <Typography id="transition-modal-title" variant="h2" sx={{ fontFamily: "'Francois One', sans-serif" }}>
                  <p style={{ margin: "0", fontSize: "clamp(2rem, 7.5vw - 1.3rem, 3.4rem)" }}>{data.title}</p>
                  <p style={{ margin: "0", fontSize: "0.5em", }}>
                    <Divider textAlign="left">{year}</Divider>
                  </p>
                </Typography>
                <Typography
                  id="transition-modal-description"
                  sx={{ mt: 2, fontSize: "1em", fontFamily: "'M PLUS Rounded 1c', sans-serif", fontWeight: "400", height: "auto", paddingBottom: "20px" }}
                >
                  Sinopsis: {data.overview}
                  <Container>
                    <ReactPlayer
                      playing={true}
                      loop={false}
                      controls={true}
                      width="100%"
                      url={VIDEO_YOUTUBE}
                      style={{ height: "auto" }}
                    /></Container>
                  <Container maxWidth="md">
                    <Divider textAlign="left"><h3>CASTING</h3></Divider>
                    <ImageList cols={8} gap="8px" sx={{ textAlign: "center", alignItems: "center", display: "flex", padding:"auto" }}>
                      {
                        credits.map((person, i) => {
                          //{person.name} as {person.character}
                          return (
                            <img size="lg" alt={person.id} src={API_IMG + person.profile_path} style={{ height: "80px", width: "80px", objectFit: "cover", borderRadius: "50%" }} />
                          )
                        })
                      }
                    </ImageList>
                  </Container>
                </Typography>
                <BotonesActivos />
              </Container>
            </Container>
          </Fade>
        </Modal>
      </div>
    );
  }
};
export default VentanaInfo;
