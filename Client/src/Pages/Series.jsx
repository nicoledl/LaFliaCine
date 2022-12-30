import Navbar from "../Components/Navbar/Navbar";
import ListaContenido from "../Components/Peliculas-Series/ListaContenido";

const Series = () => {
  return (
    <>
      <Navbar />
      <ListaContenido formato="tv"/>
    </>
  );
};

export default Series;
