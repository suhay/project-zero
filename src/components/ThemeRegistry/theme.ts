import { createTheme } from "@mui/material/styles";
import { baseFont } from "./fonts";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#192f2c",
    },
    secondary: {
      main: "#e9ffdb",
    },
    error: {
      main: "#d16666",
    },
    info: {
      main: "#7ebce6",
    },
    success: {
      main: "#7ba05b",
    },
  },
  typography: {
    fontFamily: baseFont.style.fontFamily,
    button: {
      textTransform: "none",
    },
  },
  components: {},
});

// const theme: ThemeOptions = {

// typography: {
//   h1: {
//     fontFamily: '"Merriweather Sans", "Helvetica", "Arial", sans-serif',
//   },
//   h2: {
//     fontFamily: '"Merriweather Sans", "Helvetica", "Arial", sans-serif',
//   },
//   h3: {
//     fontFamily: '"Merriweather Sans", "Helvetica", "Arial", sans-serif',
//   },
//
//   h4: {
//     fontFamily: '"Merriweather Sans", "Helvetica", "Arial", sans-serif',
//   },
//   h5: {
//     fontFamily: '"Merriweather Sans", "Helvetica", "Arial", sans-serif',
//   },
//   h6: {
//     fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
//     fontWeight: 200,
//     lineHeight: 2.22,
//   },
//   subtitle1: {
//     fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
//     fontWeight: 200,
//   },
//   subtitle2: {
//     fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
//   },
//   body1: {
//     fontFamily: '"Source Serif 4, "Helvetica", "Arial", sans-serif',
//   },
// },
// };

export default theme;
