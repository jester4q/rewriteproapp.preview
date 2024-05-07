import { ReactElement } from "react";
import { Grid, Container } from "@mui/material";
import RegistrationStepOne from "components/RegistrationStepOne/RegistrationStepOne";

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

const RegistrationStepOnePage = (): ReactElement => {
  return (
    <Container sx={styles.container}>
      <Grid container sx={styles.content}>
        <RegistrationStepOne />
      </Grid>
    </Container>
  );
};

export default RegistrationStepOnePage;
