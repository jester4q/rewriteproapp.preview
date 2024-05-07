import { Box, BoxProps, Input, Typography } from "@mui/material";

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

export const PriceFormInput = ({
  id,
  label,
  name,
  value,
  sx,
}: {
  id?: string;
  label: string;
  name: string;
  value: string;
} & BoxProps) => {
  return (
    <Box sx={[styles.container, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography sx={styles.label} color="secondary.main">
        {label}
      </Typography>

      <Input
        disableUnderline={true}
        value={value}
        slotProps={{
          input: {
            type: "number",
            disabled: true,
            name: name,
            id: id,
          },
        }}
      />
    </Box>
  );
};
