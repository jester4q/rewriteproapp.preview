import React from "react";
import { Box, Button } from "@mui/material";
import { copyContent } from "helpers/copy";
import CopyContentImage from "images/copy.svg";
import LoadingImage from "images/loading.svg";

type Props = {
  output: string;
  loading?: boolean;
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "26px 33px 21px",
    border: "2px solid #022754",
    borderRadius: "40px",
    maxWidth: "512px",
    width: "100%",
    height: "312px",
    fontFamily: "Evolventa",
    fontSize: "18px",
  },
  top: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  copyBtn: {
    // alignSelf: "flex-end",
    padding: "5px",
    minWidth: 0,
    borderRadius: "100%",
  },
  middle: {
    overflowY: "auto",
  },
  loading: {
    width: "100%",
    height: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
  },
};

const OutputArea: React.FC<Props> = ({ output, loading }) => {
  return (
    <Box sx={styles.container}>
      {(!loading && (
        <>
          <Box sx={styles.top}>
            <Button sx={styles.copyBtn} onClick={() => copyContent(output)}>
              <img src={CopyContentImage} />
            </Button>
          </Box>
          <Box sx={styles.middle}>{output}</Box>
        </>
      )) || (
        <Box sx={styles.loading}>
          <img src={LoadingImage} />
        </Box>
      )}
    </Box>
  );
};

export default OutputArea;
