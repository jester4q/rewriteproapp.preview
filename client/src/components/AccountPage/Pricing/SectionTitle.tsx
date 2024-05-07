import { Box, Typography } from "@mui/material";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    pt: "100px",
  },
  title: {
    maxWidth: "421px",
    fontSize: "40px",
    fontWeight: "700",
    color: "secondary.main",
    fontFamily: "Actay Wide",
    textAlign: "center",
  },
};

type Props = {
  children: string;
};

const SectionTitle: React.FC<Props> = ({ children }) => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>{children}</Typography>
    </Box>
  );
};

export default SectionTitle;
