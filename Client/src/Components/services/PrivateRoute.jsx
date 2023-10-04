import { Navigate, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      setIsAuthenticated(false);
    } else {
      axios
        .post(`http://localhost:3000/auth/verify-token`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setLoading(false);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error("Error de verificación de token:", error);
          setLoading(false);
          setIsAuthenticated(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <div
        className="absolute top-0 bottom-0 left-0 right-0 m-auto h-screen justify-center flex items-center"
        style={{ alignItems: "center", zIndex: "-2" }}
      >
        <div className="grid">
          <p className="text-center mt-2 text-xl text-stone-950/60 dark:text-white">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}
