/* eslint-disable no-nested-ternary */
import { useModal } from '../modal/ModalContext';
import { useNotificationPermission } from '../notification/NotificationPermissionContext';

export function DevPage() {
  const {
    permission,
    subscribed,
    setSubscribed,
  } = useNotificationPermission();
  const { setModal } = useModal();

  return (
    <div>
      Notificações no dispositivo
      {' '}
      {permission === 'denied'
        ? 'bloqueadas'
        : subscribed
          ? 'ativadas'
          : 'desativadas'}
      {(permission === 'denied')
        ? (
          <button
            onClick={() => setModal(
              <div>
                <img src="/toggle_notification.png" alt="para desbloquear as notificações do dispositivo, acesse as configurações do site, próximo ao endereço suasplantas.com, e ligue a opção notificações" />
              </div>,
            )}
          >
            como desbloquear
          </button>
        ) : (
          <button onClick={() => setSubscribed(!subscribed)}>
            {!subscribed ? 'ativar' : 'desativar'}
          </button>
        )}
    </div>
  );
}
