import Header from "../Components/Inicio/Header";
import Navbar from "../Components/Navbar/Navbar"
import SliderTendencias from "../Components/Inicio/SliderTendencias";
import Game from "../Components/Inicio/Game"
import Estrenos from "../Components/Inicio/Estrenos";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <SliderTendencias />
      <Estrenos />
      <Game />
    </>
  );
};

export default Home;
