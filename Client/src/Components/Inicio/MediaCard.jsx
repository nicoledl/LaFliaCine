import ImageListItem from "@mui/material/ImageListItem";
import {
  Container,
  Hidden,
  ImageList,
  ImageListItemBar,
  Typography,
  Paper,
  Popper,
  Fade,
} from "@mui/material";
import { useState } from "react";

const MediaCard = ({ contenido }) => {
  const imgNull =
    "https://canalcocina.es/medias/publicuploads/2015/07/07/147549/846988273559c066aac7193.09884642.png";
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [hoveredElement, setHoveredElement] = useState(null);

  const handleMouseEnter = (newPlacement, elem) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
    setPlacement(newPlacement);
    setHoveredElement(elem);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ justifyContent: "center" }}>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        sx={{ zIndex: "tooltip" }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              sx={{
                width: 300,
                height: "100%",
                backgroundColor: "#070708a7",
                mb: 1,
                backdropFilter: "blur(30px)",
              }}
              elevation={6}
            >
              <Typography
                sx={{
                  p: 2,
                  color: "#F5EE9E",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {hoveredElement.media_type === "tv"
                  ? hoveredElement.name
                  : hoveredElement.title}
              </Typography>
              <Typography sx={{ p: 2, color: "#F5EE9E" }}>
                {hoveredElement.overview === undefined ||
                hoveredElement.overview === null
                  ? "Sin descripción"
                  : hoveredElement.overview}
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Hidden mdDown>
        <ImageList variant="standard" cols={5} gap={6} rowHeight={300}>
          {contenido.map((elem) => {
            const img =
              `https://image.tmdb.org/t/p/original/` + elem.poster_path;

            return (
              <ImageListItem key={elem.id}>
                <img
                  src={elem.poster_path === undefined ? imgNull : img}
                  alt={elem.title}
                  loading="lazy"
                  style={{
                    objectFit: "cover",
                    borderRadius: 20,
                    height: "inherit",
                  }}
                  onMouseEnter={handleMouseEnter("top", elem)}
                  onMouseLeave={handleMouseLeave}
                />
                <ImageListItemBar
                  title={elem.media_type === "tv" ? elem.name : elem.title}
                  subtitle={`${elem.vote_average.toFixed(1)}⭐`}
                  sx={{ borderRadius: "0 0 20px 20px" }}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Hidden>

      <Hidden mdUp smDown>
        <ImageList variant="standard" cols={4} gap={6} rowHeight={250}>
          {contenido.map((elem) => {
            const img =
              `https://image.tmdb.org/t/p/original/` + elem.poster_path;

            return (
              <ImageListItem key={elem.id}>
                <img
                  src={elem.poster_path === undefined ? imgNull : img}
                  alt={elem.title}
                  loading="lazy"
                  style={{
                    objectFit: "cover",
                    borderRadius: 20,
                    height: "inherit",
                  }}
                  onMouseEnter={handleMouseEnter("top", elem)}
                  onMouseLeave={handleMouseLeave}
                />
                <ImageListItemBar
                  title={elem.media_type === "tv" ? elem.name : elem.title}
                  subtitle={`${elem.vote_average.toFixed(1)}⭐`}
                  sx={{ borderRadius: "0 0 20px 20px" }}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Hidden>

      <Hidden smUp>
        <ImageList variant="standard" cols={1} gap={30} rowHeight={200}>
          {contenido.map((elem) => {
            const img =
              `https://image.tmdb.org/t/p/original/` + elem.poster_path;

            return (
              <ImageListItem key={elem.id}>
                <img
                  src={elem.poster_path === undefined ? imgNull : img}
                  alt={elem.title}
                  loading="lazy"
                  style={{
                    objectFit: "cover",
                    borderRadius: 20,
                    height: "inherit",
                  }}
                  onMouseEnter={handleMouseEnter("top", elem)}
                  onMouseLeave={handleMouseLeave}
                />
                <ImageListItemBar
                  title={elem.media_type === "tv" ? elem.name : elem.title}
                  subtitle={`${elem.vote_average.toFixed(1)}⭐`}
                  sx={{ borderRadius: "0 0 20px 20px" }}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Hidden>
    </Container>
  );
};

export default MediaCard;
