import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        custom: {
            cardinal: "hsl(355, 54%, 44%)",
            xanthous: "hsl(40, 89%, 55%)",
            dun: "hsl(36, 33%, 78%)",
            outerSpace: "hsl(0, 0%, 28%)",
            black: "hsl(0, 0%, 0%)",
        },
    },
    typography: {
      fontSize: 14,
      fontWeight: 300,
      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
    },
  });

export default theme;