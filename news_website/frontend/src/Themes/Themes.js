// import { responsiveFontSizes } from "@mui/material";
// import { createTheme } from "@mui/material/styles";

// const GREEN = "#B2D9C1";
// const CARDINAL_RED = "#AD343E";
// const XANTHOUSE_YELLOW = "#F2AF29";
// const TAN = "#d9cab3";

// const font = "'neue-haas-grotesk-display-pro', sans-serif";

// let ThemeWrapper = createTheme({
//   // components:{
//   //     MuiTypography:{
//   //         fontFamily: font,
//   //     },
//   // },
//   typography: {
//     fontFamily: ["Neue Haas Grotesk Display Pro", "sans-serif"].join(","),
//   },
//   palette: {
//     primary: {
//       main: `${TAN}`,
//     },
//     secondary: {
//       main: `${XANTHOUSE_YELLOW}`,
//     },
//     success: {
//       main: `${GREEN}`,
//     },
//     error: {
//       main: `${CARDINAL_RED}`,
//     },
//   },
// });

// ThemeWrapper = responsiveFontSizes(ThemeWrapper);

// export default ThemeWrapper;

//yeah not sure why this doesnt work at all......
//The colors work but not tjhe font

import { responsiveFontSizes } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const GREEN = "#B2D9C1";
const CARDINAL_RED = "#AD343E";
const XANTHOUSE_YELLOW = "#F2AF29";
const TAN = "#d9cab3";

const font = "'Neue Haas Grotesk Display Pro', sans-serif";

let ThemeWrapper = createTheme({
  typography: {
    fontFamily: ["Neue Haas Grotesk Display Pro", "sans-serif"].join(","),
    // Optional: You can set defaults for specific typography variants
    root: {
      fontFamily: font,
    },
    h1: {
      fontFamily: font,
    },
    h2: {
      fontFamily: font,
    },
    body1: {
      fontFamily: font,
    },
    button: {
      fontFamily: font,
    },
    p: {
      fontFamily: font,
    },
  },
  components: {
    MuiTypography: {
      body1: {
        fontFamily: font,
      },
    },
  },
  overrides: {
    "&.MuiTypography-body1": {
      fontFamily: font,
    },
    MuiTypography: {
      body1: {
        color: `${CARDINAL_RED}`,
        fontFamily: font,
      },
      subheading: {
        color: `${CARDINAL_RED}`,
      },
    },
  },
  palette: {
    primary: {
      main: `${TAN}`,
    },
    secondary: {
      main: `${XANTHOUSE_YELLOW}`,
    },
    success: {
      main: `${GREEN}`,
    },
    error: {
      main: `${CARDINAL_RED}`,
    },
  },
});

ThemeWrapper = responsiveFontSizes(ThemeWrapper);

export default ThemeWrapper;
