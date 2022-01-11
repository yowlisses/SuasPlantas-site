import 'reflect-metadata';
import '../mobx/storesConfig';
import '../styles/globals.css';

import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { theme } from '../mui/theme';
import { SnackView } from '../snack/SnackView';
import { FaviconTags } from '../app/FaviconTags';
import { MuiFontsTags } from '../app/MuiFontsTags';
import { devIndicator } from '../utils/devIndicator';
import { GoogleAnalyticsTags } from '../app/GoogleAnalyticsTags';
import { ModalView } from '../modal/ModalView';
import { NotificationTags } from '../notifications/NotificationTags';

export function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>
          {devIndicator}
          SuasPlantas - Trocar mudas de plantas
        </title>
      </Head>
      <FaviconTags />
      <MuiFontsTags />
      <GoogleAnalyticsTags />
      <NotificationTags />
      <Component {...pageProps} />
      <SnackView />
      <ModalView />
    </ThemeProvider>
  );
}

export default observer(MyApp);
