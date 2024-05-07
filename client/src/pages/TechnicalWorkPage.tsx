import { ReactElement } from "react";
import { Container, Box } from "@mui/material";
import TechnicalWorkImage from "images/technicalWorks.svg";
import Title from "components/TechnicalWorkPage/Title";

const styles = {
  container: {
    position: "relative",
  },
  image: {
    position: "absolute",
    bottom: "-45%",
    right: 0,
    zIndex: -1,
  },
};

const TechnicalWorkPage = (): ReactElement => {
  return (
    <Container>
      <Box sx={styles.container}>
        <Title>На сайте ведутся технические работы</Title>
        <Box sx={styles.image}>
          <img src={TechnicalWorkImage} />
        </Box>
      </Box>
    </Container>
  );
};

export default TechnicalWorkPage;
