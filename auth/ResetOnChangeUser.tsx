import { useEffect, useState } from 'react';
import { useNotifications } from '../notification/notificationsContext';
import { useUser } from './userContext';

export function ResetOnChangeUser() {
  const { user } = useUser();
  const { reset: resetNotifications } = useNotifications();

  useEffect(() => {
    resetNotifications();
  }, [user]);

  return null;
}