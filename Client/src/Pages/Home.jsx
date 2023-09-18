import Header from "../Components/Inicio/Header";
import Navbar from "../Components/Navbar/Navbar";
import SliderTendencias from "../Components/Inicio/SliderTendencias";
import Game from "../Components/Inicio/Game";
import Estrenos from "../Components/Inicio/Estrenos";
import Copyright from "../Components/common/Copyright";
import ReactScrollIntoViewIfNeeded from "react-scroll-into-view-if-needed";
import { useState } from "react";

const Home = () => {
  const [isScrolling, setScrolling] = useState(false);

  return (
    <>
      <Navbar />
      <Header setState={setScrolling} />
      <ReactScrollIntoViewIfNeeded active={isScrolling}>
        <SliderTendencias />
      </ReactScrollIntoViewIfNeeded>
      <Estrenos />
      <Game />
      <Copyright color="#fff" />
    </>
  );
};

export default Home;
