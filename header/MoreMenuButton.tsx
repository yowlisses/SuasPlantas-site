import Link from 'next/link';
import {
  FaBars,
  FaFile,
  FaSeedling,
  FaEnvelope,
} from 'react-icons/fa';
import {
  RiLoginBoxLine,
  RiLogoutBoxRLine,
} from 'react-icons/ri';
import Image from 'next/image';
import { useState } from 'react';
import { Menu } from '../common/menu/Menu';
import { useUser } from '../auth/userContext';
import { useIsLogged } from '../auth/useIsLogged';
import { HeaderNavigationItem } from './HeaderNavigationItem';

export function MoreMenuButton() {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useUser();

  const { isLogged } = useIsLogged();
  const imageSize = 20;

  function handleSignInClick() {
    isLogged();
  }

  function close() {
    setOpen(false);
  }

  return (
    <div>
      <HeaderNavigationItem
        onClick={() => { setOpen(true); }}
        item={{
          Icon: FaBars,
          id: 'more',
          text: 'Mais',
        }}
      />
      <div className="fixed right-0 sm:right-2">
        <div className="absolute right-0">
          {open && (
          <Menu onClose={close}>
            {!!user && (
            <Link href={`/users/${user?.id}`}>
              <a className="menu-button" onClick={close}>
                <Image
                  src={user?.image}
                  width={imageSize}
                  height={imageSize}
                  className="rounded-full"
                />
                {' '}
                Perfil
              </a>
            </Link>
            )}
            <Link href="/about">
              <a className="menu-button" onClick={close}>
                <FaSeedling size={18} color="gray" />
                {' '}
                Sobre
              </a>
            </Link>
            <Link href="/privacy-policy">
              <a className="menu-button" onClick={close}>
                <FaFile size={18} color="gray" />
                {' '}
                Política de privacidade
              </a>
            </Link>
            <Link href="/contact">
              <a className="menu-button" onClick={close}>
                <FaEnvelope size={18} color="gray" />
                {' '}
                Contato
              </a>
            </Link>
            {user ? (
              null
            // <button className="menu-button text-red-900" onClick={() => { logOut(); close(); }}>
            // <RiLogoutBoxRLine size={20} color="rgb(127,29,29)" />
            // {' '}
            // Sair
            // </button>
            ) : (
              <button className="menu-button" onClick={() => { close(); isLogged(); }}>
                <RiLoginBoxLine size={20} color="gray" onClick={handleSignInClick} />
                {' '}
                Entrar
              </button>
            )}
          </Menu>
          )}
        </div>
      </div>
    </div>
  );
}
