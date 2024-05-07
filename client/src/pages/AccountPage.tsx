import { ReactElement, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { observer } from "mobx-react";
import Pricing from "components/AccountPage/Pricing/Pricing";
import Rewriter from "components/AccountPage/Rewriter/Rewriter";
// import RewriterHistory from "components/AccountPage/RewriterHistory";
import Title from "components/AccountPage/Title";
import RewriterFooter from "components/RewriterFooter/RewriterFooter";
import { useSearchParams } from "react-router-dom";
import { VkPayload } from "types/VkPayload";
import { IUserStore } from "stores/UserStore";
import { useUserStore } from "stores/useUserStore";
import { RewriteContext } from "stores/useRewriteStore";
import rewriteStoreFactory from "stores/RewriteStore";
import { SubscriptionContext } from "stores/useSubscriptionStore";
import subscriptionStoreFactory from "stores/SubscriptionStore";

const AccountPage = observer((): ReactElement => {
  const userStore: IUserStore = useUserStore();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const handleLogin = (payload: VkPayload) => {
      userStore
        .loginVk(payload)
        .catch((error) => console.log("Registration Error: ", error));
    };

    if (searchParams.has("payload")) {
      const payloadStr = searchParams.get("payload");
      if (payloadStr) {
        try {
          const payload: VkPayload = JSON.parse(payloadStr);
          handleLogin(payload);
        } catch (err) {
          console.log(err);
        }
      }
      searchParams.delete("payload");
      setSearchParams(searchParams);
    }
    if (searchParams.has("state")) {
      searchParams.delete("state");
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <>
      <Container>
        <Box
          sx={{
            pt: "60px",
          }}
        >
          <Title />
          <RewriteContext.Provider value={rewriteStoreFactory()}>
            <Rewriter />

            {/* <RewriterHistory /> */}
          </RewriteContext.Provider>
          <SubscriptionContext.Provider value={subscriptionStoreFactory()}>
            <Pricing />
          </SubscriptionContext.Provider>
        </Box>
      </Container>
      <RewriterFooter />
    </>
  );
});

export default AccountPage;
