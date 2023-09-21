import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";

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

const PrivateRoute = ({ element }) => {
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

  return isAuthenticated ? element : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
