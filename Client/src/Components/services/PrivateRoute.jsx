import { Navigate, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PrivateRoute({ children, path }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .post(`${process.env.REACT_APP_VERIFY_URL}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error("Error de verificación de token:", error);
          setIsAuthenticated(false);
        });
    }
  }, []);

  if (isAuthenticated && path === "profile") {
    return children;
  } else if (isAuthenticated) {
    return <Navigate to="/profile" replace={true} />;
  }

  return children;
}
