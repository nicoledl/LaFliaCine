import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Peliculas from "./Pages/Peliculas";
import Register  from "./Pages/Register";
import Series from "./Pages/Series";
import Profile from "./Pages/Profile";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/movies" element={<Peliculas />}></Route>
          <Route path="/series" element={<Series />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
