import { ReactElement } from "react";
import { Box } from "@mui/material";
import SectionTitle from "./SectionTitle";
import PricingList from "./PricingList";

const styles = {
  title: {
    mb: "100px",
  },
  pricing: {
    display: "flex",
    justifyContent: "center",
  },
};

const Pricing = (): ReactElement => {
  return (
    <Box>
      <Box sx={styles.title}>
        <SectionTitle>Получить больше запросов</SectionTitle>
      </Box>
      <Box sx={styles.pricing}>
        <PricingList />
      </Box>
    </Box>
  );
};

export default Pricing;
