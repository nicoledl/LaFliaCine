import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Peliculas from "./Pages/Peliculas";
import Register from "./Pages/Register";
import Series from "./Pages/Series";
import Profile from "./Pages/Profile";
import PrivateRoute from "../src/Components/utils/PrivateRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Peliculas />} />
          <Route path="/series" element={<Series />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          {/* Utiliza PrivateRoute para proteger la ruta */}
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
