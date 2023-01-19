import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system';

function Copyright(props) {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="body1"
        align="center"
        {...props}
        sx={{margin:"20px", padding:"20px"}}
      >
        {"Copyright © "}
        <Link color="inherit" href="/">
          La Flia Cine
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
}

export default Copyright;