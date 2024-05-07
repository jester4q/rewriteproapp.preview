import { Box, Container } from "@mui/material";
import Title from "components/AccountPage/Title";
import PaymentForm from "components/PaymentPage/PaymentForm";
import { ReactElement } from "react";
import RewriterFooter from "components/RewriterFooter/RewriterFooter";
import { useNavigate, useParams } from "react-router-dom";
import { SubscriptionContext } from "stores/useSubscriptionStore";
import subscriptionStoreFactory from "stores/SubscriptionStore";

// const styles = {};

export const PaymentPage = (): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate("/account");
    return <></>;
  }
  return (
    <>
      <Container>
        <Box
          sx={{
            pt: "60px",
          }}
        >
          <Title />
          <SubscriptionContext.Provider value={subscriptionStoreFactory()}>
            <PaymentForm tariffId={id} />
          </SubscriptionContext.Provider>
        </Box>
      </Container>
      <RewriterFooter />
    </>
  );
};
