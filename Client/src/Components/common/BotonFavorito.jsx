import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const BotonFavorito = ({ contentId, formato }) => {
  const [esFavorito, setEsFavorito] = useState(null);
  const [userId, setUserId] = useState(undefined);
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    setUserId(decodedToken.id);

    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:3000/favoritos/${formato}/${decodedToken.id}`)
      .then((res) => res.data)
      .then((res) => formato === "movie" ? res.movieIds : res.tvIds)
      .then((favoritos) => {
        setEsFavorito(favoritos.includes(contentId));
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [esFavorito]);

  const handleContent = () => {
    if (!esFavorito) {
      axios
        .post(
          `http://localhost:3000/favoritos/${formato}/${userId}/${contentId}`
        )
        .then(() => console.log("Se agregó a la lista de favoritos"))
        .catch((error) => console.error(error));

      setEsFavorito(!esFavorito);
      return;
    }
    axios
      .delete(
        `http://localhost:3000/favoritos/${formato}/${userId}/${contentId}`
      )
      .then(() => console.log("Se eliminó de la lista de favoritos"))
      .catch((error) => console.error(error));

    setEsFavorito(!esFavorito);
  };

  return esFavorito ? (
    <FavoriteIcon
      onClick={handleContent}
      sx={{ color: red[900], cursor: "pointer" }}
    />
  ) : (
    <FavoriteBorderIcon
      onClick={handleContent}
      sx={{ color: "#fff", cursor: "pointer" }}
    />
  );
};

export default BotonFavorito;
