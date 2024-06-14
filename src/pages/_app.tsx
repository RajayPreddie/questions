// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import BottomNavbar from '@/components/navigation/navbar';
import '@/components/navigation/navbar';
import theme from '@/styles/theme';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { type AppType } from 'next/dist/shared/lib/utils';
import '@/styles/globals.css';
import React from 'react';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
      <BottomNavbar />
      <SpeedInsights />
    </MantineProvider>
  );
};
// eslint-disable-next-line import/no-unused-modules
export default MyApp;
