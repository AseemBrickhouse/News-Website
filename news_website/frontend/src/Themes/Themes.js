import { ThemeProvider, createTheme } from "@mui/material/styles";

const GREEN = "#B2D9C1";
const CARDINAL_RED = "#AD343E";
const XANTHOUSE_YELLOW = "#F2AF29";
const TAN = "#d9cab3";

const theme = createTheme({
  Typography: {
    fontFamily: ['"Neue Haas Grotesk Display Pro"', "sans-serif"].join(","),
  },
});
export default theme;