import CardActions from "@mui/material/CardActions";
import axios from "axios";
import { useEffect, useState } from "react";
import BotonFavorito from "./BotonFavorito";
import BotonVisto from "./BotonVisto";

const verifyToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_VERIFY_URL}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.error("Error de verificación de token:", error);
    return false;
  }
};

const BotonesActivos = ({ contentId, formato }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    verifyToken()
      .then((result) => {
        setIsAuthenticated(result);
      })
      .catch((error) => {
        console.error(error);
        setIsAuthenticated(false);
      });
  }, []);

  return (
    isAuthenticated && (
      <CardActions>
        <BotonFavorito contentId={contentId} formato={formato} />
        <BotonVisto contentId={contentId} formato={formato} />
      </CardActions>
    )
  );
};

export default BotonesActivos;
