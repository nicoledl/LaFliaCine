import CardActions from "@mui/material/CardActions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { red, grey } from "@mui/material/colors";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const BotonesActivos = () => {

  return (
    <CardActions>
      <Checkbox {...label} icon={<FavoriteBorderIcon sx={{ color: grey[900] }} />} checkedIcon={<FavoriteIcon sx={{ color: red[900] }} />} />
      <Checkbox {...label} icon={<VisibilityOffIcon sx={{ color: grey[900] }} />} checkedIcon={<VisibilityIcon sx={{ color: grey[100] }} />} />
    </CardActions>
  );
};

export default BotonesActivos;
