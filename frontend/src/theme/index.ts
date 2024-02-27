import { createTheme } from "@mui/material/styles";
import { COLORS } from "colors";

const theme = createTheme({
  mixins: {
    toolbar: {
      minHeight: 48,
      maxHeight: 48,
      height: 48,
    },
  },
  spacing: [0, 4, 8, 16, 30, 32, 64],
  breakpoints: {
    values: {
      xs: 360,
      sm: 768,
      md: 1024,
      lg: 1400,
      xl: 1900,
    },
  },
  palette: {
    ...COLORS,
  },
});

export default theme;
