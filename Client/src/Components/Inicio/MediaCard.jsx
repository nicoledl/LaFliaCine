import ImageListItem from "@mui/material/ImageListItem";
import { Container, Hidden, ImageList, ImageListItemBar } from "@mui/material";

const MediaCard = ({ contenido }) => {
  const imgNull = "https://canalcocina.es/medias/publicuploads/2015/07/07/147549/846988273559c066aac7193.09884642.png";


  return (
    <Container maxWidth="lg" style={{ justifyContent: "center" }}>
      <Hidden mdDown>
        <ImageList variant="standard" cols={5} gap={6} rowHeight={300}>
          {contenido.map((elem) => {
            const img = `https://image.tmdb.org/t/p/original/` + elem.poster_path;

            return (
              <ImageListItem key={elem.id}>
                <img
                  src={
                    elem.poster_path !== null
                      ? img
                      : imgNull
                  }
                  alt={elem.title}
                  loading="lazy"
                  style={{ objectFit: "fill", borderRadius: 20, height: "inherit" }}
                />
                <ImageListItemBar
                  title={elem.media_type === "tv" ? elem.name : elem.title}
                  subtitle={`${elem.vote_average}⭐`}
                  sx={{ borderRadius: "0 0 20px 20px" }}
                />
              </ImageListItem>)
          }
          )}
        </ImageList>
      </Hidden>

      <Hidden mdUp smDown>
        <ImageList variant="standard" cols={4} gap={6} rowHeight={250}>
          {contenido.map((elem) => {
            const img = `https://image.tmdb.org/t/p/original/` + elem.poster_path;

            return (
              <ImageListItem key={elem.id}>
                <img
                  src={
                    elem.poster_path !== null
                      ? img
                      : imgNull
                  }
                  alt={elem.title}
                  loading="lazy"
                  style={{ objectFit: "fill", borderRadius: 20, height: "inherit" }}
                />
                <ImageListItemBar
                  title={elem.media_type === "tv" ? elem.name : elem.title}
                  subtitle={`${elem.vote_average}⭐`}
                  sx={{ borderRadius: "0 0 20px 20px" }}
                />
              </ImageListItem>)
          }
          )}
        </ImageList>
      </Hidden>

      <Hidden smUp>
        <ImageList variant="standard" cols={2} gap={6} rowHeight={200}>
          {contenido.map((elem) => {
            const img = `https://image.tmdb.org/t/p/original/` + elem.poster_path;

            return (
              <ImageListItem key={elem.id}>
                <img
                  src={
                    elem.poster_path !== null
                      ? img
                      : imgNull
                  }
                  alt={elem.title}
                  loading="lazy"
                  style={{ objectFit: "fill", borderRadius: 20, height: "inherit" }}
                />
                <ImageListItemBar
                  title={elem.media_type === "tv" ? elem.name : elem.title}
                  subtitle={`${elem.vote_average}⭐`}
                  sx={{ borderRadius: "0 0 20px 20px" }}
                />
              </ImageListItem>)
          }
          )}
        </ImageList>
      </Hidden>
    </Container>
  );
};

export default MediaCard;
