import { useEffect } from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  // useNavigate,
} from "react-router-dom";
import { IUserStore } from "../stores/UserStore";
import { RewriterAppBar } from "components/RewriterAppBar/RewriterAppBar";
import { HomePage } from "pages/HomePage";
import AccountPage from "pages/AccountPage";
import TechnicalWorkPage from "pages/TechnicalWorkPage";
//import LoginOrRegisterPage from "pages/LoginOrRegisterPage";
//import RegistrationStepOnePage from "pages/RegistrationStepOnePage";
//import RegistrationStepTwoPage from "pages/RegistrationStepTwoPage";
import { useUserStore } from "stores/useUserStore";
import { PaymentPage } from "pages/PaymentPage";

const NotFound = () => <Navigate to="" replace />;
const TECHNICAL_WORK_PAGE = () => <TechnicalWorkPage />;
const ACCOUNT_PAGE = () => <AccountPage />;
const PAYMENT_PAGE = () => <PaymentPage />;
//const LOGIN_OR_REGISTRATION_PAGE = () => <LoginOrRegisterPage />;
//const REGISTRATION_STEP_ONE = () => <RegistrationStepOnePage />;
//const REGISTRATION_STEP_TWO = () => <RegistrationStepTwoPage />;

export const AppContainer = observer(() => {
  const userStore: IUserStore = useUserStore();
  console.log(userStore);
  const navigate = useNavigate();
  const location = useLocation();
  const hasAccount = userStore.isAccount();
  const isServerError = userStore.connectionError();

  function checkNavigationPath() {
    const isAccountPage =
      location.pathname.indexOf("/payment") == 0 ||
      location.pathname.indexOf("/account") == 0;

    if (!isAccountPage && userStore.isAccount()) {
      navigate("/account");
    }

    if (
      location.pathname.indexOf("/technical-work") !== 0 &&
      userStore.connectionError()
    ) {
      navigate("/technical-work");
    }

    if (
      location.pathname !== "/" &&
      !userStore.isAccount() &&
      !userStore.connectionError()
    ) {
      navigate("/");
    }
  }

  useEffect(() => {
    console.log(
      "useEffect",
      userStore.connectionError(),
      userStore.isAccount(),
    );
    if (!hasAccount) {
      userStore
        .loadAccount()
        .then(() => {
          //setAccount(userStore.isAccount());
        })
        .catch((error) => {
          console.log(error);
          //setServerError(true);
        })
        .finally(() => {
          checkNavigationPath();
        });
    }
  }, []);

  console.log("-----", hasAccount, isServerError);
  checkNavigationPath();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height:
            "calc(100vh - env(safe-area-inset-bottom, 0) - env(safe-area-inset-top, 0))",
          "@supports (-webkit-touch-callout: none)": {
            /* for ios safari 15, safe-area-inset-bottom is 0, so a special fix apply here */
            height: "-webkit-fill-available",
          },
        }}
      >
        <RewriterAppBar />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/account" element={<ACCOUNT_PAGE />} />
          <Route path="/technical-work" element={<TECHNICAL_WORK_PAGE />} />
          <Route path="/payment/:id" element={<PAYMENT_PAGE />} />
          {/*
          <Route
            path="/login-or-registration"
            element={<LOGIN_OR_REGISTRATION_PAGE />}
          />
          
          <Route
            path="/registration-step-one"
            element={<REGISTRATION_STEP_ONE />}
          />
          <Route
            path="/registration-step-two"
            element={<REGISTRATION_STEP_TWO />}
          />
          */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {/* <RewriterFooter /> */}
      </Box>
    </>
  );
});
