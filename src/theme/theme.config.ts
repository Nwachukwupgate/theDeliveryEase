/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ThemeOptions,
  createTheme,
  responsiveFontSizes,
  Theme
} from "@mui/material/styles";

export const defaultTheme = customizeTheme();

export const lightTheme = responsiveFontSizes(
  customizeTheme({
    palette: {
      primary: {
        light: "#f4e9f4",
        lightHover: "#efdfee",
        // lightActive: "#ddbcdc",
        lightActive: "#f7f0f7",
        main: "#92278f",
        mainHover: "#832381",
        mainActive: "#751f72",
        dark: "#6e1d6b",
        darkHover: "#581756",
        darkActive: "#421240",
        darker: "#3F2C4D",
        contrastText: "#FFFFFF",
      },
      success: {
        light: "#f8f2fc",
        lightHover: "#f4ecfa",
        // lightActive: "#e8d7f4",
        lightActive: "#f4e9fa",
        main: "#b57edc",
        mainHover: "#a371c6",
        mainActive: "#9165B099",
        dark: "#885fa5",
        darkHover: "#6d4c84",
        darkActive: "#513963",
        darker: "#3f2c4d",
      },
      error: {
        light: "#fbeaea",
        lightHover: "#f8e0e0",
        lightActive: "#f1bfbf",
        main: "#d32f2f",
        mainHover: "#be2a2a",
        mainActive: "#a92626",
        dark: "#9e2323",
        darkHover: "#7f1c1c",
        darkActive: "#5f1515",
        darker: "#4a1010",
      },
    },
    // shadows: [] as any,
  }),
);
export const darkTheme = responsiveFontSizes(
  customizeTheme({ palette: { mode: "dark" } }),
);

export function customizeTheme(theme?: ThemeOptions) {
  return createTheme({
    ...theme,
    breakpoints: {
      values: {
        xs: 0,
        sm: 641,
        md: 766,
        lg: 1025,
        xl: 1280,
        "2xl": 1536,
      },
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: [
        "'Ezra'",        // Add Ezra as the primary font
        "-apple-system",
        "BlinkMacSystemFont",
        "sans-serif",    // Fallback to sans-serif
      ].join(","),
      button: {
        textTransform: "none",
      },
      h1: {
        fontSize: "22px",
        lineHeight: 1.4,
      },
      h2: {
        fontSize: "16px",
        lineHeight: 1.5,
      },
      h2_large: {
        fontSize: "22px",
        lineHeight: 1.5,
      },
    },
    components: {
      MuiIcon: {
        defaultProps: {
          baseClassName: "material-symbols-outlined",
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          variant: "contained",
        },
        styleOverrides: {
          root: ({ theme }: { theme: Theme }) => ({
            height: "40px",
            borderRadius: 18,
            [theme?.breakpoints?.up('md')]: {
              height: "45px", // height for small screens and up
              borderRadius: 20,
              fontSize: "16px",
            },
            [theme.breakpoints.up('lg')]: {
              height: "50px", // height for medium screens and up
              fontSize: "20px",
              borderRadius: 30,
            },
          }),
        },
        variants: [
          {
            props: { variant: "contained" },
            style: {
              ":hover": {
                background: "#8E528C",
                color: "#FFFFFF",
              },
              ":active": {
                background: "#581756",
                color: "#FFFFFF ",
              },
              ":disabled": {
                background: "#5D5C5C",
                color: "#FFFFFF ",
              },
            },
          },
        ],
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h2_large: "h2",
          },
        },
      },

      MuiInput: {
        defaultProps: {},
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },
        styleOverrides: {
          root: ({}) => ({
            position: "static",
            transform: "none",
            fontWeight: "500",
            textTransform: "capitalize",
            fontSize: "14px",
            color: "#111213",
          }),
        },
      },
      MuiOutlinedInput: {
        defaultProps: { notched: false },
        styleOverrides: {
          root: ({}) => ({
            height: "49px",
            borderRadius: 100,
            marginTop: "8px",
            "& .MuiOutlinedInput-notchedOutline": {
              "border-color": "rgba(0,0,0,0.1)",
            },
          }),
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
        variants: [],
        styleOverrides: {},
      },
      MuiInputBase: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.disabled && { background: "inherit !important" }),
          }),
        },
      },
    },
  });
}

