import { parseCookies, setCookie } from 'nookies';
import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { Spinner } from '../common/Spinner';
import { FacebookButton } from '../contact/FacebookButton';
import { Fuser } from '../fusers/Fuser';
import { useFusers } from '../fusers/fusersContext';
import { Modal } from '../modal/Modal';
import { useModal } from '../modal/ModalContext';
import { useSnack } from '../snack/SnackContext';

const MAX_REMOVE_COUNT = 5;

export function UserModal({ fuser }:{fuser:Fuser}) {
  const [loading, setLoading] = useState(false);
  const { reset } = useFusers();
  const { close: closeModal } = useModal();
  const { setSnack } = useSnack();
  const [removeCount, setRemoveCount] = useState<string>();

  useEffect(() => {
    const cookies = parseCookies();
    setRemoveCount(cookies['suasplantas.removeCount']);
  }, []);

  async function removeSelf() {
    setLoading(true);
    try {
      await api.delete(`fusers/${fuser.id}`);
      setCookie(undefined, 'suasplantas.removeCount', `${removeCount || ''}+`, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 365 * 20, // twenty years
      });
      reset();
      closeModal();
      setSnack({ severity: 'success', text: 'Perfil removido com sucesso' });
    } catch (err) {
      setSnack({ severity: 'error', text: 'Status 500: Internal server error' });
    }
    setLoading(false);
  }

  return (
    <Modal>
      <div className="flex flex-col px-2">
        <div className="text-xl">
          {fuser.name}
        </div>
        <div className="text-lg text-green-800">
          {fuser.city.name}
          {' '}
          -
          {' '}
          {fuser.city.stateId}
        </div>
        <div className="px-40" />
        {(removeCount === undefined || (removeCount?.length < MAX_REMOVE_COUNT))
      && (
      <div className="flex flex-row justify-start sm:justify-end my-2">
        <button
          onClick={() => removeSelf()}
          disabled={loading}
          className="secondary-button text-red-800 inline text-sm center-row justify-center"
        >
          {loading && <Spinner size={20} />}
          <span>
            Sou eu, excluir
          </span>
        </button>
      </div>
      )}
        <FacebookButton facebookId={fuser.id} />
      </div>
    </Modal>
  );
}
