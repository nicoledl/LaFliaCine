import styled from "@emotion/styled";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { Container } from "@mui/material";

const FooterContainer = styled.section`
  width: 100%;
  height: 80px;
  color: #fff;
  bottom: 0;
  position: relative;
  background: #6b0f1a;
`;

const Footer = () => {
  const date = new Date();

  return (
    <FooterContainer>
      <Container>
        <TheaterComedyIcon />
        La Flia Cine - {date.getFullYear()}
      </Container>
    </FooterContainer>
  );
};

export default Footer;
