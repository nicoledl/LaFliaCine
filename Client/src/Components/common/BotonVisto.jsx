import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { blue, grey } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const BotonVisto = ({ contentId, formato }) => {
  const [fueVisto, setFueVisto] = useState(null);
  const [userId, setUserId] = useState(undefined);
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    setUserId(decodedToken.id);

    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:3000/vistos/${formato}/${decodedToken.id}`)
      .then((res) => res.data)
      .then((res) => (formato === "movie" ? res.movieIds : res.tvIds))
      .then((vistos) => {
        setFueVisto(vistos.includes(contentId));
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContent = () => {
    console.log(contentId);
    if (!fueVisto) {
      axios
        .post(`http://localhost:3000/vistos/${formato}/${userId}/${contentId}`)
        .then(() => console.log("Se agregó a la lista de vistos"))
        .catch((error) => console.error(error));

      setFueVisto(!fueVisto);
      return;
    }
    axios
      .delete(`http://localhost:3000/vistos/${formato}/${userId}/${contentId}`)
      .then(() => console.log("Se eliminó de la lista de vistos"))
      .catch((error) => console.error(error));

    setFueVisto(!fueVisto);
  };

  return fueVisto ? (
    <VisibilityIcon
      onClick={handleContent}
      sx={{ color: blue[600], cursor: "pointer" }}
    />
  ) : (
    <VisibilityOffIcon
      onClick={handleContent}
      sx={{ color: grey[900], cursor: "pointer" }}
    />
  );
};

export default BotonVisto;
