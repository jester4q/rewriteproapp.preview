import { ReactElement } from "react";
import { Container, Grid } from "@mui/material";
import RegistrationStepTwo from "components/RegistrationStepTwo/RegistrationStepTwo";

const styles = {
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    margin: "0 auto",
    height: "calc(100vh - 258px)",
  },
  content: {
    position: "absolute",
    top: "25%",
  },
};

const RegistrationStepTwoPage = (): ReactElement => {
  return (
    <Container sx={styles.container}>
      <Grid container sx={styles.content}>
        <RegistrationStepTwo />
      </Grid>
    </Container>
  );
};

export default RegistrationStepTwoPage;
