import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";

const verifyToken = async () => {
  try {
    const response = await axios.post("/verify-token");
    if (response.data.message === "Token is valid") {
      return true;
    }
    return false; // Si el token no es válido
  } catch (error) {
    return false; // En caso de error
  }
};

// Este componente verifica si el usuario tiene un token válido
const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Llama a verifyToken cuando se monta el componente
    verifyToken()
      .then((result) => {
        setIsAuthenticated(result);
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
        setIsAuthenticated(false); // En caso de error
      });
  }, []);

  return isAuthenticated ? element : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
