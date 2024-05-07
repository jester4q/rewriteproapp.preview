import { Box, Button, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import OutputArea from "./OutputArea";
import TextArea from "./TextArea";
import { observer } from "mobx-react";
import { useUserStore } from "stores/useUserStore";
import { useRewriteStore } from "stores/useRewriteStore";
import { RequestState } from "types/RequestState";

const styles = {
  container: {
    pt: "42px",
    pb: "53px",
  },
  subtitle: {
    mb: "8px",
    ml: "32px",
  },
  textAreas: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  bottom: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    padding: "8px 36px",
    borderRadius: "40px",
    backgroundColor: "secondary.main",
    fontSize: "14px",
    color: "primary.light",
    textTransform: "none",
  },
};

const Rewriter = observer((): ReactElement => {
  const userStore = useUserStore();
  const rewriteStore = useRewriteStore();
  const [text, setText] = useState("");
  const [outText, setOutText] = useState("");
  const requestCount = userStore.amountAvailableRequests();

  const onRequest = () => {
    rewriteStore.request(text).then((txt) => {
      console.log(txt);
      setOutText(txt);
    });
  };

  const inProgress = rewriteStore.state == RequestState.LOADING;

  const disabled = text.length < 15 || requestCount < 1 || inProgress;

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.subtitle} variant="subtitle1">
        Осталось запросов: {requestCount}
      </Typography>
      <Box sx={styles.textAreas}>
        <TextArea text={text} setText={setText} />
        <OutputArea output={outText} loading={inProgress} />
      </Box>
      <Box sx={styles.bottom}>
        <Button sx={styles.button} disabled={disabled} onClick={onRequest}>
          Рерайт
        </Button>
      </Box>
    </Box>
  );
});

export default Rewriter;
