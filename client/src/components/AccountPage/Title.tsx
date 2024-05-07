import { Typography } from "@mui/material";
import { ReactElement } from "react";

const styles = {
  title: {
    color: "secondary.main",
    fontFamily: "Actay Wide",
    fontSize: "80px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
};

const Title = (): ReactElement => {
  return <Typography sx={styles.title}>RewritePro</Typography>;
};

export default Title;
