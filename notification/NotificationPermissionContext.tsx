import {
  createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState,
} from 'react';
import Head from 'next/head';
import { OneSignal } from './OneSignal';

interface INotificationPermission{
    permission?:string
    subscribed?:boolean
    setSubscribed:(value: boolean) => void
    setPermission:Dispatch<SetStateAction<string|undefined>>
}

const notificationPermissionContext = createContext({} as INotificationPermission);

export function NotificationPermissionContextProvider({ children }:{children:ReactNode}) {
  const [subscribed, setSubscribedValue] = useState<boolean>();
  const [permission, setPermission] = useState<string>();

  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(() => {
      OneSignal.init({
        appId: '71765db2-d95f-4240-9692-cea9d6f692eb',
        safari_web_id: '',
        welcomeNotification: {
          title: 'Obrigado por ligar as notificações',
          message: 'É assim que elas aparecem',
        },
        allowLocalhostAsSecureOrigin: true,
        notifyButton: {
          enable: false,
        },
      });
    });

    OneSignal.push(() => {
      OneSignal.isPushNotificationsEnabled(
        (isSubscribed:boolean) => setSubscribedValue(isSubscribed),
      );
      OneSignal.getNotificationPermission(
        (permission:string) => setPermission(permission),
      );
      OneSignal.on(
        'subscriptionChange',
        (isSubscribed:boolean) => setSubscribedValue(isSubscribed),
      );
      OneSignal.on(
        'notificationPermissionChange',
        ({ to }:{to:string}) => setPermission(to),
      );
    });

    return () => {
      window.OneSignal = undefined;
    };
  }, []);

  function setSubscribed(value:boolean) {
    OneSignal.push(() => {
      OneSignal.showNativePrompt();
      OneSignal.setSubscription(value);
    });
  }

  return (
    <notificationPermissionContext.Provider value={{
      subscribed, permission, setSubscribed, setPermission,
    }}

    >
      <Head>
        <script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          async
        />
      </Head>
      {children}
    </notificationPermissionContext.Provider>
  );
}

export function useNotificationPermission() {
  return useContext(notificationPermissionContext);
}
