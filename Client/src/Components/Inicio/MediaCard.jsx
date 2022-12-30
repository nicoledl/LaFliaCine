import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from '@mui/material/Modal';
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: "500px",
  bgcolor: '#ddd',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// const styles = theme => ({
//   root: {
//     padding: theme.spacing.unit,
//     [theme.breakpoints.down('sm')]: {
//       backgroundColor: theme.palette.secondary.main,
//     },
//     [theme.breakpoints.up('md')]: {
//       backgroundColor: theme.palette.primary.main,
//     },
//     [theme.breakpoints.up('lg')]: {
//       backgroundColor: green[500],
//     },
//   },
// });

const MediaCard = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const imgNull =
    "https://canalcocina.es/medias/publicuploads/2015/07/07/147549/846988273559c066aac7193.09884642.png";


  function modal(name, detail) {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{
          overflow: "scroll"
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {detail}
          </Typography>
        </Box>
      </Modal>
    )
  }

  return (
    <ImageList
      sx={{
        gridAutoFlow: "column",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr)) !important",
        gridAutoColumns: "minmax(160px, 1fr)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        paddingTop: "13px",
        paddingBottom: "13px"
      }}
    >
      <Grid container gap={2}>
        {props.contenido.map((elem) => (
          <Grid item key={elem.id}>
            <ImageListItem
              sx={{
                width:"180px"
              }}
              key={elem.id}
            >
              <img
                onClick={handleOpen}
                src={
                  elem.poster_path !== null
                    ? props.apiImg + elem.poster_path
                    : imgNull
                }
                alt={elem.title}
                loading="lazy"
                style={{ objectFit: "cover", borderRadius: "10px", cursor: "pointer" }}
              />
              {modal((elem.original_title || elem.original_name), elem.overview)}
            </ImageListItem>
          </Grid>
        ))}
      </Grid>
    </ImageList>
  );
};

export default MediaCard;
