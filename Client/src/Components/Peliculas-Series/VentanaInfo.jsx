import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import BotonesActivos from "../common/BotonesActivos";
import InfoIcon from "@mui/icons-material/Info";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { Container } from "@mui/system";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { Fab, ImageList } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

const VentanaInfo = ({ id, formato }) => {
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState();
  const [data, setData] = useState([]);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mouseHover, setMouseHover] = useState(false);
  const [photoHover, setPhotoHover] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMouseHover = (id) => {
    setMouseHover(true);
    setPhotoHover(id);
  };
  const handleMouseLeave = () => {
    setMouseHover(false);
    setPhotoHover(null);
  };

  const urlData = `${process.env.REACT_APP_BASE_URL}${formato}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-AR`;
  const movieCredits = `${process.env.REACT_APP_BASE_URL}${formato}/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-AR`;
  const API_VIDEO_EN = `${process.env.REACT_APP_BASE_URL}${formato}/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
  const VIDEO_YOUTUBE = `https://www.youtube.com/watch?v=${video}`;
  let API_IMG = `https://image.tmdb.org/t/p/original/`;
  const imgNull =
    "https://canalcocina.es/medias/publicuploads/2015/07/07/147549/846988273559c066aac7193.09884642.png";

  useEffect(() => {
    if (open) {
      axios
        .get(API_VIDEO_EN, {
          headers: {
            accept: "application/json",
            Authorization: process.env.REACT_APP_TMDB_API_KEY,
          },
        })
        .then((res) => setVideo(res.data.results[0].key))
        .catch(() => console.error("Not Found"));
    }
    // eslint-disable-next-line
  }, [open]);

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

    axios
      .get(movieCredits, {
        headers: {
          accept: "application/json",
          Authorization: process.env.REACT_APP_TMDB_API_KEY,
        },
      })
      .then((res) => setCredits(res.data.cast.splice(0, 8)))
      .catch(() => console.error("Not Found"));
    // eslint-disable-next-line
  }, []);

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return (
      <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
        <LinearProgress color="warning" />
        <LinearProgress color="warning" />
        <LinearProgress color="warning" />
      </Stack>
    );
  } else {
    const releaseDate =
      formato === "movie"
        ? new Date(data.release_date)
        : new Date(data.first_air_date);
    const year = releaseDate.getFullYear();
    const conditionImg =
      data.backdrop_path === undefined || data.backdrop_path === null
        ? imgNull
        : API_IMG + data.backdrop_path;

    const StyleBox = {
      position: "relative",
      background: "#F49E4C",
      color: "#ffff",
      fontFamily: "'Francois One', sans-serif",
      display: "grid",
      justifyItems: "center",
      backgroundImage: `linear-gradient(to bottom, rgba(244,158,76, 0), rgba(244,158,76, 1) 50%),
      url(${conditionImg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      mx: 0.5,
    };

    return (
      <div>
        <InfoContainer onClick={handleOpen}>
          <Typography
            color={"#fff"}
            align="left"
            fontSize={14}
            sx={{
              fontFamily: "'M PLUS Rounded 1c', sans-serif",
              lineHeight: 1.2,
            }}
          >
            {data.overview === undefined || data.overview === null
              ? "Sín sinópsis"
              : data.overview.length < 156
              ? data.overview
              : data.overview.slice(0, 156) + "..."}
            <InfoIcon
              color={"#fff"}
              fontSize="small"
              sx={{
                position: "absolute",
              }}
            />
          </Typography>
        </InfoContainer>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Fade in={open}>
            <Container maxWidth="md" sx={StyleBox}>
              <Fab
                onClick={() => {
                  setOpen(false);
                }}
                size="small"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  m: 1,
                  cursor: "pointer",
                }}
              >
                <CloseIcon />
              </Fab>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 10,
                  width: "100%",
                  marginTop: 10,
                }}
              >
                <Typography
                  fontFamily={"'Francois One', sans-serif"}
                  variant="h3"
                >
                  {data.title === undefined ? data.name : data.title}
                </Typography>
                <Typography variant="p">({year})</Typography>
              </div>
              <Typography
                id="transition-modal-description"
                fontFamily={"'M PLUS Rounded 1c', sans-serif"}
                variant="p"
                sx={{
                  mt: 2,
                  fontWeight: "400",
                  pb: "10px",
                }}
              >
                Sinopsis:{" "}
                {data.overview === undefined || data.overview === null
                  ? "Sin descripción"
                  : data.overview}
              </Typography>
              <ReactPlayer
                playing={false}
                loop={false}
                width="100%"
                controls={true}
                url={VIDEO_YOUTUBE}
                style={{ maxWidth: "70%" }}
              />
              <Typography
                variant="h5"
                fontFamily={"'M PLUS Rounded 1c', sans-serif"}
                fontWeight={500}
                sx={{ width: "100%" }}
              >
                Casting
              </Typography>
              <ImageList
                sx={{
                  display: "flex",
                  padding: "auto",
                  overflow: "scroll-x",
                  width: "100%",
                }}
              >
                {credits.map((person, i) => {
                  return (
                    <div
                      style={{
                        width: "80px",
                        height: "fit-content",
                        position: "relative",
                        margin: 0,
                      }}
                      key={i}
                    >
                      <img
                        key={i}
                        size="lg"
                        alt={person.name}
                        src={API_IMG + person.profile_path}
                        style={{
                          height: "auto",
                          width: "80px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                        onMouseEnter={() => handleMouseHover(i)}
                      />
                      {mouseHover && i === photoHover && (
                        <Typography
                          fontSize={12}
                          fontFamily={"'M PLUS Rounded 1c', sans-serif"}
                          align="center"
                          sx={{
                            position: "absolute",
                            width: "80px",
                            display: "flex",
                            alignItems: "center",
                            zIndex: "2",
                            top: 0,
                            left: 0,
                            m: 0,
                            backgroundColor: "rgba(0,0,0,0.5872724089635855)",
                            backdropFilter: "blur(5px)",
                            borderRadius: "10px",
                            height: "96%",
                            flexWrap: "wrap",
                          }}
                          onMouseLeave={() => handleMouseLeave(i)}
                        >
                          {person.name}
                        </Typography>
                      )}
                    </div>
                  );
                })}
              </ImageList>
              <BotonesActivos contentId={data.id} formato={formato} />
            </Container>
          </Fade>
        </Modal>
      </div>
    );
  }
};
export default VentanaInfo;
