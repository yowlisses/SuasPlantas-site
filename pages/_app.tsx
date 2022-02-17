import 'reflect-metadata';
import '../styles/globals.css';

import Head from 'next/head';
// @ts-ignore
import Twemoji from 'react-twemoji';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';

import { theme } from '../mui/theme';
import { Header } from '../common/Header';
import { ModalView } from '../modal/ModalView';
import { SnackView } from '../snack/SnackView';
import { FaviconTags } from '../app/FaviconTags';
import { MuiFontsTags } from '../app/MuiFontsTags';
import { usersContext } from '../user/usersContext';
import { devIndicator } from '../utils/devIndicator';
import { plantsContext } from '../plant/plantsContext';
import { questsContext } from '../quest/questsContext';
import { UserContextProvider } from '../auth/userContext';
import { TourContextProvider } from '../tour/TourContext';
import { PreviewProvider } from '../preview/PreviewContext';
import { ModalContextProvider } from '../modal/ModalContext';
import { SnackContextProvider } from '../snack/SnackContext';
import { ResetOnChangeUser } from '../auth/ResetOnChangeUser';
import { GoogleAnalyticsTags } from '../app/GoogleAnalyticsTags';
import { PaginationProvider } from '../pagination/PaginationProvider';
import { TextSearchContextProvider } from '../search/TextSearchContext';
import { notificationsContext } from '../notification/notificationsContext';
import { PushNotificationContextProvider } from '../notification/PushNotificationContext';
import { PreviewWarn } from '../preview/PreviewWarn';
import { fusersContext } from '../fusers/fusersContext';
import { ExitIntent } from '../intent/ExitIntent';
import { HotjarTags } from '../app/HotjarTags';
import { SmartlookTag } from '../app/SmartlookTag';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>
          {devIndicator}
          Suas Plantas - Trocar mudas de plantas
        </title>
        <meta
          name="description"
          content="Site para trocar mudas de plantas com vários outros usuários. Super simples, seguro e com grande variedade."
        />
      </Head>
      <HotjarTags />
      <FaviconTags />
      <MuiFontsTags />
      <SmartlookTag />
      <GoogleAnalyticsTags />
      <TourContextProvider>
        <PreviewProvider>
          <UserContextProvider>
            <SnackContextProvider>
              <ModalContextProvider>
                <TextSearchContextProvider>
                  <PaginationProvider Context={plantsContext} apiRoute="plants">
                    <PaginationProvider Context={usersContext} apiRoute="users">
                      <PaginationProvider Context={questsContext} apiRoute="quests">
                        <PaginationProvider Context={fusersContext} apiRoute="fusers">
                          <PaginationProvider Context={notificationsContext} apiRoute="notifications">
                            <PushNotificationContextProvider>
                              <Twemoji options={{ className: 'twemoji' }}>
                                <Header />
                                <Component {...pageProps} />
                                <PreviewWarn />
                                <SnackView />
                                <ModalView />
                                <ResetOnChangeUser />
                                <ExitIntent />
                              </Twemoji>
                            </PushNotificationContextProvider>
                          </PaginationProvider>
                        </PaginationProvider>
                      </PaginationProvider>
                    </PaginationProvider>
                  </PaginationProvider>
                </TextSearchContextProvider>
              </ModalContextProvider>
            </SnackContextProvider>
          </UserContextProvider>
        </PreviewProvider>
      </TourContextProvider>
    </ThemeProvider>
  );
}
