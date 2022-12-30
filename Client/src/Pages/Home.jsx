import Header from "../Components/Inicio/Header";
import Navbar from "../Components/Navbar/Navbar"
import SliderTendencias from "../Components/Inicio/SliderTendencias";
import Game from "../Components/Inicio/Game"

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <SliderTendencias/>
      <Game />
    </>
  );
};

export default Home;
