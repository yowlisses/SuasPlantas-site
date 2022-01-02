import { Button, IconButton } from '@mui/material';
import { observer } from 'mobx-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa';
import { authStore } from '../auth/authStore';
import { RequireLogin } from '../auth/RequireLogin';
import { userImage } from '../images/user';

export const MeButton = observer(() => {
  const size = 36;
  return authStore.user && authStore.token ? (
    <Link href={`/users/${authStore.user?.id}`}>
      <IconButton>
        <Image
          width={size}
          height={size}
          src={authStore.user?.image || userImage}
          alt={authStore.user?.name}
          className="bg-gray-300 rounded-full shadow-md cursor-pointer"
        />
      </IconButton>
    </Link>
  ) : (
    <RequireLogin>
      <div
        className="flex flex-row items-center gap-1 cursor-pointer"
      >
        <FaRegUser size={18} />
        <div className="text-lg">Entrar</div>
      </div>
    </RequireLogin>

  );
});
