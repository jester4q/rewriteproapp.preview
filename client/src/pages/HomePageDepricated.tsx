import { Button, Container, Grid, TextField } from "@mui/material";
import { HistoryList } from "components/HomePage/HistoryList";
import { ReactElement, useState } from "react";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  textFields: {
    display: "flex",
    flexGrow: 1,
  },
  button: {
    marginTop: 2,
  },
};

export const HomePage = (): ReactElement => {
  const [input, setInput] = useState("");
  const [rewritedText, setRewritedText] = useState("");

  const onRewriteButtonClick = () => {
    console.log(input);
    fetch("http://localhost:4444/api/rewrite", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicRequest: input,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRewritedText(data.rewritedText || "error");
      })
      .catch((err) => {
        setRewritedText(`error: ${err}`);
        console.log(err);
      });
  };

  return (
    <Container sx={styles.container}>
      <Grid container>
        <Grid item sm={4}>
          <HistoryList />
        </Grid>
        <Grid sm={8}>
          <Grid item>
            {/* 2800 tokens  restriction */}
            <TextField
              sx={styles.textFields}
              placeholder="MultiLine with rows: 2 and rowsMax: 4"
              multiline
              rows={20}
              maxRows={Infinity}
              value={rewritedText}
            />
          </Grid>
          <Grid item>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              rows={3}
              maxRows={Infinity}
              sx={styles.textFields}
              value={input}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInput(event.target.value);
              }}
            />
          </Grid>
          <Grid item sm={3}>
            <Button
              variant="outlined"
              sx={styles.button}
              onClick={onRewriteButtonClick}
            >
              Rewrite
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
