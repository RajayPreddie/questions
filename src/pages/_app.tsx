// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/dist/shared/lib/utils";
import { createTheme, MantineColorsTuple, MantineProvider } from '@mantine/core';
import "@/styles/globals.css";
import React from 'react';


const myColor: MantineColorsTuple = 
  [
    "#e0fbff",
    "#cbf2ff",
    "#9ae2ff",
    "#64d2ff",
    "#3cc5fe",
    "#23bcfe",
    "#09b8ff",
    "#00a1e4",
    "#0090cd",
    "#007cb5"
  ];

const theme = createTheme({
  colors: {
    myColor,
  }
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default MyApp;
