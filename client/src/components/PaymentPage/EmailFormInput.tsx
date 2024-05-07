import {
  Box,
  BoxProps,
  FormHelperText,
  Input,
  Typography,
} from "@mui/material";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  label: {
    pl: 3,
    mb: "9px",
    fontSize: "22px",
  },
  inputError: {
    ml: "22px",
  },
};

export const EmailFormInput = ({
  id,
  label,
  name,
  value,
  error,
  onChange,
  placeholder,
  sx,
}: {
  id?: string;
  label: string;
  name: string;
  value: string;
  error: string;
  onChange?: (str: string) => void;
  placeholder?: string;
} & { sx: BoxProps["sx"] }) => {
  const hasError = !!error;

  const onUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const v = e.target && e.target.value;
    if (onChange) {
      onChange(v);
    }
  };

  return (
    <Box sx={[styles.container, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography
        sx={styles.label}
        color={hasError ? "error.main" : "secondary.main"}
      >
        {label}
      </Typography>

      <Input
        value={value}
        onChange={onUpdate}
        disableUnderline={true}
        error={hasError}
        slotProps={{
          input: {
            placeholder,
            type: "email",
            id,
            name,
          },
        }}
      />
      {(hasError && (
        <FormHelperText sx={styles.inputError}>{error}</FormHelperText>
      )) ||
        ""}
    </Box>
  );
};
