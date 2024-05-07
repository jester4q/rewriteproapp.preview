import { ReactElement, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSubscriptionStore } from "stores/useSubscriptionStore";
import { Tariff } from "stores/SubscriptionStore";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    padding: "70px 48px 64px",
    maxWidth: "780px",
    width: "100%",
    border: "4px solid #022754",
    borderRadius: "40px",
    backgroundColor: "secondary.main",
    color: "primary.light",
  },
  list: {
    display: "flex",
    flexDirection: "column",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px 17px 34px",
    borderBottom: "2px solid #FFFFFF",
  },
  itemValue: {
    fontFamily: "Actay Wide",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "primary.light",
    fontSize: "14px",
    color: "secondary.main",
    textTransform: "none",
  },
};

const PricingList = observer((): ReactElement => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const ssStore = useSubscriptionStore();
  const navigate = useNavigate();
  useEffect(() => {
    ssStore.tariffs().then((result) => {
      setTariffs(result);
    });
  });
  const onPay = (item: Tariff) => {
    navigate("/payment/" + item.id);
  };
  return (
    <Box sx={styles.container}>
      <Box sx={styles.list}>
        {tariffs.map((item) => (
          <Box sx={styles.item}>
            <Typography sx={styles.itemValue} variant="subtitle1">
              {item.name}
            </Typography>
            <Typography sx={styles.itemValue} variant="subtitle1">
              {item.price} рублей
            </Typography>
            <Button sx={styles.button} onClick={() => onPay(item)}>
              Оплатить
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default PricingList;
