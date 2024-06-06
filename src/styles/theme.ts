import { type MantineColorsTuple, type MantineThemeOverride } from '@mantine/core';

const myColor: MantineColorsTuple = [
  '#e0fbff',
  '#cbf2ff',
  '#9ae2ff',
  '#64d2ff',
  '#3cc5fe',
  '#23bcfe',
  '#09b8ff',
  '#00a1e4',
  '#0090cd',
  '#007cb5',
];

const theme: MantineThemeOverride = {
  colors: {
    oceanBlue: myColor,
  },
  primaryColor: 'oceanBlue',
};

export default theme;
