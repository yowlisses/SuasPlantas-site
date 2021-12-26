import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { Fab } from '@mui/material';
import { RequireLogin } from '../auth/RequireLogin';

export function AddButton() {
  return (
    <Link href="/add">
      <RequireLogin>
        <Fab color="primary" aria-label="add" className="absolute right-10 bottom-10">
          <FaPlus size={24} color="white" />
        </Fab>
      </RequireLogin>
    </Link>
  );
}
