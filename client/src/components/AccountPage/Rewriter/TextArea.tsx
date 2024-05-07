import {
  Box,
  TextareaAutosize,
  styled,
  Button,
  Typography,
} from "@mui/material";
import CloseImage from "images/close.svg";
import React from "react";

type Props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "33px 33px 21px",
    border: "2px solid #022754",
    borderRadius: "40px",
    maxWidth: "512px",
    width: "100%",
    minHeight: "312px",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
  },
  subtitle: {
    color: "primary.main",
  },
  middle: {
    flexGrow: 1,
  },
  clearBtn: {
    padding: "5px",
    minWidth: 0,
    borderRadius: "100%",
  },
};

const StyledTextarea = styled(TextareaAutosize)(
  () => `
    width: 100%;
    min-height: 100%;
    max-height: 136px;
    overflow-y: auto !important;
    border: 0;
    resize: none;
    font-family: Evolventa;
    font-size: 18px;


    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

const TextArea: React.FC<Props> = ({ text, setText }) => {
  const handleClearText = () => setText("");

  return (
    <Box sx={styles.container}>
      <Box sx={styles.top}>
        <Typography component="span" sx={styles.subtitle} variant="subtitle2">
          Минимальная длина 15 символов
        </Typography>

        <Button sx={styles.clearBtn} onClick={handleClearText}>
          <img src={CloseImage} />
        </Button>
      </Box>
      <Box sx={styles.middle}>
        <StyledTextarea
          maxLength={2800}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Box>
      <Typography sx={styles.subtitle} variant="subtitle2">
        {text ? text.length : 0}/2800 символов
      </Typography>
    </Box>
  );
};

export default TextArea;
