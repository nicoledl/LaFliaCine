import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography'

function Copyright(props) {
    return (
      <Typography
        variant="body2"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="/">
          La Flia Cine
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

export default Copyright;