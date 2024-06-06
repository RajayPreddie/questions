// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { type AppType } from "next/dist/shared/lib/utils";
import { MantineProvider } from '@mantine/core';
import "@/styles/globals.css";
import React from 'react';
import theme from '@/styles/theme';
import BottomNavbar from '@/components/navigation/navbar';



const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
      <BottomNavbar />
    </MantineProvider>
  );
};

export default MyApp;
