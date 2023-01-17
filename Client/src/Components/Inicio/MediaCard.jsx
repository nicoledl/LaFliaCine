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

const MediaCard = ({ contenido, apiImg }) => {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const imgNull =
    "https://canalcocina.es/medias/publicuploads/2015/07/07/147549/846988273559c066aac7193.09884642.png";


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
    <Container maxWidth="lg" style={{  justifyContent: "center" }}>
      <ImageList variant="standard" cols={5} gap={6} rowHeight={300}>
        {contenido.map((item) => (
          <ImageListItem key={item.id}>
            <img
              // onClick={handleOpen}
              src={
                item.poster_path !== null
                  ? apiImg + item.poster_path
                  : imgNull
              }
              alt={item.title}
              loading="lazy"
              style={{ objectFit: "fill", borderRadius: 20, height: "inherit" }}
            />
            {/* {modal(item)} */}
            <ImageListItemBar
              title={item.media_type === "tv" ? item.name : item.title}
              subtitle={`${item.vote_average}⭐`}
              // actionIcon={
              //   <IconButton
              //     onClick={handleOpen}
              //     sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              //     aria-label={`info about ${item.media_type === "tv" ? item.name : item.title}`}
              //   >
              //     <InfoIcon />
              //   </IconButton>
              // }
              sx={{borderRadius:"0 0 20px 20px"}}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};

export default MediaCard;
