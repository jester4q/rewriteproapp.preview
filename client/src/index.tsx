import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { unregister } from "registerServiceWorker";
import { AppContainer } from "components/AppContainer";
import userStoreFactory from "stores/UserStore";
import theme from "theme";
import "index.css";
import { UserContext } from "stores/useUserStore";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter basename={baseUrl || undefined}>
      <UserContext.Provider value={userStoreFactory()}>
        <AppContainer></AppContainer>
      </UserContext.Provider>
    </BrowserRouter>
  </ThemeProvider>,
);

unregister();
