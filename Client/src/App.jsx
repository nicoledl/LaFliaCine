import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Peliculas from "./Pages/Peliculas";
import Register from "./Pages/Register";
import Series from "./Pages/Series";
import Profile from "./Pages/Profile";
import PrivateRoute from "../src/Components/services/PrivateRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Peliculas />} />
          <Route path="/series" element={<Series />} />
          {/* Utiliza PrivateRoute para proteger la ruta */}
          <Route
            path="/signup"
            element={<PrivateRoute children={<Register />} path="register" />}
          />
          <Route
            path="/login"
            element={<PrivateRoute children={<Login />} path="login" />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute children={<Profile />} path="profile" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
