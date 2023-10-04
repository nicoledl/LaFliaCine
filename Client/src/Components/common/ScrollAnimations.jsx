import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Container, Divider, Grid, Typography } from "@mui/material";
import ReactCardFlip from "react-card-flip";

const Titulo = styled.h1`
  color: #f5ee9e;
  font-family: "Bebas Neue";
  font-size: clamp(2.5rem, 2.7vw + 1.3rem, 3rem);
`;

const titleVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0 },
};

export const MotionTitle = ({ text }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div
      ref={ref}
      variants={titleVariant}
      initial="hidden"
      animate={control}
    >
      <Titulo>{text}</Titulo>
    </motion.div>
  );
};

/////////////////////////////

const Flip = ({ movie }) => {
  const [flip, setFlip] = useState(false);

  let API_IMG = `https://image.tmdb.org/t/p/original/`;
  // const imgNull = "https://canalcocina.es/medias/publicuploads/2015/07/07/147549/846988273559c066aac7193.09884642.png";

  const handleClick = () => {
    setFlip(!flip);
  };

  if (API_IMG === undefined || API_IMG === null) {
    API_IMG =
      "https://canalcocina.es/medias/publicuploads/2015/07/07/147549/846988273559c066aac7193.09884642.png";
  }

  const styleFront = {
    backgroundImage: `url("${API_IMG + movie.poster_path}")`,
    backgroundSize: "cover",
    height: "400px",
    width: "260px",
    position: "relative",
    outline: "8px solid #F5EE9E",
    boxShadow: "0px 10px 13px -7px #000000, 0px 8px 30px -1px rgba(0,0,0,0.39)",
    display: "table",
  };
  const styleBack = {
    background: "#AB3428",
    color: "#fff",
    height: "400px",
    width: "260px",
    lineHeight: 1.3,
    wordSpacing: 2,
    position: "relative",
    display: "table",
    verticalAling: "middle",
    outline: "8px solid #F5EE9E",
    boxShadow: "0px 10px 13px -7px #000000, 0px 8px 30px -1px rgba(0,0,0,0.39)",
  };

  return (
    <Grid item key={movie.id} md={4} sm={12} xs={12}>
      <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
        <motion.div className="item" variants={card}>
          <Container maxWidth="sm" onClick={handleClick} sx={styleFront} />
        </motion.div>

        <motion.div className="item" variants={card}>
          <Container maxWidth="sm" onClick={handleClick} sx={styleBack}>
            <Typography variant="h4" fontFamily="Bebas Neue" sx={{ mt: 2 }}>
              {movie.title}
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography fontFamily="Fjalla One" variant="p">
              Fecha de Estreno {movie.release_date}
            </Typography>
            <br />
            <br />
            <Typography variant="p" fontFamily="'Francois One', sans-serif">
              {movie.overview}
            </Typography>
          </Container>
        </motion.div>
      </ReactCardFlip>
    </Grid>
  );
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const card = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const MotionCards = (arr) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div
      className="container"
      variants={container}
      initial="hidden"
      animate={control}
      ref={ref}
    >
      <Grid container spacing={4}>
        {arr.arr.map((item, i) => (
          <Flip movie={item} key={i} />
        ))}
      </Grid>
    </motion.div>
  );
};
