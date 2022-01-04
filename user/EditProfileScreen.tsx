import {
  Button,
  FormLabel,
  TextField,
  FormHelperText,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import Image from 'next/image';
import Router from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

import { api } from '../api/api';
import { Header } from '../common/Header';
import { userImage } from '../images/user';
import { authStore } from '../auth/authStore';
import { snackStore } from '../snack/snackStore';
import { SelectLocationLink } from '../location/SelectLocationLink';

export function EditProfileScreen() {
  const imageSize = 80;

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: authStore.user?.name,
      description: authStore.user?.description,
      whatsappNumber: authStore.user?.whatsappNumber,
      instagramUsername: authStore.user?.instagramUsername,
    },
  });

  const [loading, setLoading] = useState(false);

  async function submit(data:any) {
    setLoading(true);
    try {
      const res = await api.patch('users', {
        ...data,
        whatsappNumber: parseInt(data.whatsappNumber, 10),
      });
      authStore.setUser(res.data);
      Router.push(`/users/${res.data.id}`);
    } catch (err) {
      setLoading(false);
    }
    setLoading(false);
    snackStore.setSnack({
      text: 'Dados salvos com sucesso',
      severity: 'success',
    });
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 w-full max-w-xl p-2 pt-4">
          <div className="flex flex-row items-center justify-center gap-4">
            <Image src={authStore.user?.image || userImage} width={imageSize} height={imageSize} className="rounded-full" />
            <div className="flex flex-col">
              <FormLabel component="legend" className="text-center">Foto de perfil</FormLabel>
              <Button>Alterar</Button>
            </div>
          </div>
          <TextField
            label="Nome"
            {...register('name')}
          />
          {/* ignore the label */}
          <TextField label="Bio" multiline minRows={2} {...register('description')} />
          <div className="self-start">
            <SelectLocationLink text={`${authStore.user?.city}, ${authStore.user?.state}`} />
          </div>
          <div className="flex flex-col">
            <TextField
              label="Instagram"
              {...register('instagramUsername')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaInstagram size={25} />
                    <span className="pl-2">
                      @
                    </span>
                  </InputAdornment>
                ),
              }}
            />
            {!!watch('instagramUsername') && (
            <Button className="self-start px-5">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://instagram.com/${watch('instagramUsername')}`}
              >
                Testar
                {' '}
                @
                {watch('instagramUsername')}
              </a>
            </Button>
            )}
          </div>
          <div className="flex flex-col">
            <TextField
              label="Whatsapp"
              type="number"
              {...register('whatsappNumber')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaWhatsapp size={25} />
                  </InputAdornment>
                ),
              }}
            />
            {!!watch('whatsappNumber') && (
              <Button className="self-start px-5">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://api.whatsapp.com/send?phone=${watch('whatsappNumber')}`}
                >
                  Testar
                  {' '}
                  {watch('whatsappNumber')}
                </a>
              </Button>
            )}
          </div>
          <FormHelperText>
            Essas informações ficam visíveis para as outras pessoas
          </FormHelperText>
          <Button variant="contained" onClick={handleSubmit(submit)} disabled={loading} className="h-11 flex gap-2">
            {loading && <CircularProgress size={20} />}
            Salvar
          </Button>
        </div>
      </div>
    </>
  );
}
