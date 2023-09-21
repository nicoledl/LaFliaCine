import CardActions from "@mui/material/CardActions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { red, grey } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useEffect, useState } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const verifyToken = async () => {
  try {
    const response = await axios.post("/verify-token");
    if (response.data.message === "Token is valid") {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const BotonesActivos = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    verifyToken()
      .then((result) => {
        setIsAuthenticated(result);
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
        setIsAuthenticated(false);
      });
  }, []);

  const handleFavorito = () => {
    
  };

  const handleVisto = () => {};

  return (
    isAuthenticated && (
      <CardActions>
        <Checkbox
          {...label}
          icon={<FavoriteBorderIcon sx={{ color: grey[900] }} />}
          checkedIcon={<FavoriteIcon sx={{ color: red[900] }} />}
        />
        <Checkbox
          {...label}
          icon={<VisibilityOffIcon sx={{ color: grey[900] }} />}
          checkedIcon={<VisibilityIcon sx={{ color: grey[100] }} />}
        />
      </CardActions>
    )
  );
};

export default BotonesActivos;
