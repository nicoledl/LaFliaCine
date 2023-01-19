import Copyright from "../Components/common/Copyright";
import Navbar from "../Components/Navbar/Navbar";
import ListaContenido from "../Components/Peliculas-Series/ListaContenido";

const Peliculas = () => {
  return (
    <>
      <Navbar />
      <ListaContenido formato="movie" />
      <Copyright color="#fff" />
    </>
  );
};

export default Peliculas;
