import { useModal } from './ModalContext';

export function ModalView() {
  const { modal } = useModal();
  if (modal) return modal;
  return null;
}
