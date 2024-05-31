// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/dist/shared/lib/utils";
import { createTheme, MantineColorsTuple, MantineProvider } from '@mantine/core';
import "@/styles/globals.css";


const myColor: MantineColorsTuple = [
  '#f3edff',
  '#e0d7fa',
  '#beabf0',
  '#9a7ce6',
  '#7c56de',
  '#683dd9',
  '#5f2fd8',
  '#4f23c0',
  '#451eac',
  '#3a1899'
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
