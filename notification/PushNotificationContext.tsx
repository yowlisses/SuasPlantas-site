import {
  useState,
  Dispatch,
  useEffect,
  ReactNode,
  useContext,
  createContext,
  SetStateAction,
} from 'react';
import Head from 'next/head';
import OneSignal from 'react-onesignal';
import { api } from '../api/api';
import { useUser } from '../auth/UserContext';
import { welcomeNotification } from './welcomeNotification';

interface IPushNotification{
    permission?:string
    subscribed?:boolean
    associateEmailAndUserId:()=>void
    setSubscribed:(value: boolean) => void
    setPermission:Dispatch<SetStateAction<string|undefined>>
}

const pushNotificationContext = createContext({} as IPushNotification);

export function PushNotificationContextProvider({ children }:{children:ReactNode}) {
  const { user } = useUser();
  const [permission, setPermission] = useState<string>();
  const [subscribed, setSubscribedValue] = useState<boolean>();

  useEffect(() => {
    OneSignal.init({
      welcomeNotification,
      notifyButton: { enable: false },
      allowLocalhostAsSecureOrigin: true,
      appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID!,
      safari_web_id: process.env.NEXT_PUBLIC_ONE_SIGNAL_SAFARI_WEB_ID,

    });
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
      'pushNotificationChange',
      ({ to }:{to:string}) => setPermission(to),
    );
  }, []);

  function setSubscribed(value:boolean) {
    OneSignal.showNativePrompt();
    OneSignal.setSubscription(value);
  }

  async function associateEmailAndUserId() {
    await OneSignal.showNativePrompt();
    const res = await api.get('notifications/hash');
    const {
      id,
      email,
      idHash,
      emailHash,
    } = res.data;

    try {
      OneSignal.setEmail(email, { emailAuthHash: emailHash });
    } catch (err) {
      console.error(err);
    }
    try {
      OneSignal.setExternalUserId(id, idHash);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (user) {
      associateEmailAndUserId();
    }
  }, [user]);

  return (
    <pushNotificationContext.Provider value={{
      subscribed,
      permission,
      setSubscribed,
      setPermission,
      associateEmailAndUserId,
    }}
    >
      <Head>
        <script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          async
        />
      </Head>
      {children}
    </pushNotificationContext.Provider>
  );
}

export function usePushNotification() {
  return useContext(pushNotificationContext);
}
