import ImageListItem from "@mui/material/ImageListItem";
// eslint-disable-next-line
import { Container, ImageList, ImageListItemBar, Typography } from "@mui/material";
//import { useState } from "react";
// import Modal from '@mui/material/Modal';
// import { Box } from "@mui/system";
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   height: "500px",
//   bgcolor: '#ddd',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

const MediaCard = ({ contenido }) => {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);


  const imgNull = "https://canalcocina.es/medias/publicuploads/2015/07/07/147549/846988273559c066aac7193.09884642.png";


  // function modal(data) {
  //   console.log(data)
  //   return (
  //     <Modal
  //       aria-labelledby="transition-modal-title"
  //       aria-describedby="transition-modal-description"
  //       open={open}
  //       onClose={handleClose}
  //       closeAfterTransition
  //       sx={{
  //         overflow: "scroll"
  //       }}
  //     >
  //       <Box sx={style}>
  //         <Typography id="modal-modal-title" variant="h6" component="h2">
  //           { data.media_type === "tv" ? data.name : data.title}
  //         </Typography>
  //         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
  //           {data.overview}
  //         </Typography>
  //       </Box>
  //     </Modal>
  //   )
  // }

  return (
    <Container maxWidth="lg" style={{ justifyContent: "center" }}>
      <ImageList variant="standard" cols={5} gap={6} rowHeight={300}>
        {contenido.map((elem) => {
          const img = `https://image.tmdb.org/t/p/original/` + elem.poster_path;

          return (
            <ImageListItem key={elem.id}>
              <img
                // onClick={handleOpen}
                src={
                  elem.poster_path !== null
                    ? img
                    : imgNull
                }
                alt={elem.title}
                loading="lazy"
                style={{ objectFit: "fill", borderRadius: 20, height: "inherit" }}
              />
              {/* {modal(elem)} */}
              <ImageListItemBar
                title={elem.media_type === "tv" ? elem.name : elem.title}
                subtitle={`${elem.vote_average}⭐`}
                // actionIcon={
                //   <IconButton
                //     onClick={handleOpen}
                //     sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                //     aria-label={`info about ${elem.media_type === "tv" ? elem.name : elem.title}`}
                //   >
                //     <InfoIcon />
                //   </IconButton>
                // }
                sx={{ borderRadius: "0 0 20px 20px" }}
              />
            </ImageListItem>)
        }
        )}
      </ImageList>
    </Container>
  );
};

export default MediaCard;
