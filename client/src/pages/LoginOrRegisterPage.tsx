// import React from 'react'
import { Container, Grid } from "@mui/material";
import LoginOrRegister from "components/common/LoginOrRegister";

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

const LoginOrRegisterPage = () => {
  return (
    <Container sx={styles.container}>
      <Grid container sx={styles.content}>
        <LoginOrRegister titleFz={40} />
      </Grid>
    </Container>
  );
};

export default LoginOrRegisterPage;
