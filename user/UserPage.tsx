import Image from 'next/image';
import { Button, Link } from '@mui/material';
import {
  FaRegUser, FaSearch, FaSeedling, FaThumbsUp,
} from 'react-icons/fa';
import {
  ReactElement, ReactNode, useEffect, useState,
} from 'react';
import Head from 'next/head';
import { User } from './User';
import { GridItem } from '../common/GridItem';
import { authStore } from '../auth/authStore';
import { userImage } from '../images/user';
import { WhatsappButton } from '../contact/WhatsappButton';
import { InstagramButton } from '../contact/InstagramButton';
import { Header } from '../common/Header';
import { api } from '../api/api';
import { hasContact } from '../utils/hasContact';
import { isSelfUser } from '../utils/isSelfUser';
import { TextLink } from '../common/TextLink';
import { TabSelector } from '../common/TabSelector';
import { LookingForItem } from '../lookingFor/LookingForItem';

interface UserPageProps {
  user: User;
}

export function UserPage({ user }: UserPageProps) {
  const [tab, setTab] = useState('plants');

  async function refreshUser() {
    const res = await api.get(`users/${authStore.user?.id}`);
    authStore.user = res.data;
  }

  useEffect(() => {
    if (user.id === authStore.user?.id) { refreshUser(); }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="description"
          content={`Usuário ${user.name}. ${user.city}, ${user.state}. ${user.description}`}
        />
      </Head>
      <div className="flex flex-col items-center w-full">
        <Header />
        <div className="p-2 flex flex-col gap-4 max-w-5xl w-full items-center">
          <div className="flex flex-row gap-2 items-center pt-4 w-full max-w-4xl">
            <Image
              width={100}
              height={100}
              objectFit="cover"
              alt={user.name}
              src={user.image || userImage}
              className="rounded-full bg-cover w-24 h-24"
            />
            <div className="flex-1 flex-wrap flex overflow-ellipsis">
              <div className="flex flex-col w-full">
                <div className="overflow-ellipsis text-lg">{user.name}</div>
                <div className="overflow-ellipsis">{`${user.city}, ${user.state}`}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full justify-center gap-2">
            {!!user.whatsappNumber && (
            <WhatsappButton whatsappNumber={user.whatsappNumber} />
            )}
            {!!user.instagramUsername && (
            <InstagramButton instagramUsername={user.instagramUsername} />
            )}
            {!hasContact(user) && (
              isSelfUser(user) ? (
                <div>
                  <TextLink href="/account/edit">
                    Adicionar uma forma de contato para poder receber mensagens
                  </TextLink>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">
                  Sem meios de contato
                </div>
              ))}
          </div>
          <div>
            { user.description}
          </div>
          {authStore.user?.id === user.id && (
          <div className="flex flex-row justify-start">
            <Link href="/account/edit">
              <a>
                <Button variant="outlined" className="flex flex-row gap-1 w-full max-w-sm">
                  <FaRegUser size={18} />
                  Editar perfil
                </Button>
              </a>
            </Link>
          </div>
          )}
          <div className="flex flex-row justify-center items-center max-w-sm md:max-w-md">
            <TabSelector value="plants" tab={tab} setTab={setTab}>
              <FaSeedling />
              Plantas
            </TabSelector>
            <TabSelector value="lookingFors" tab={tab} setTab={setTab}>
              <FaSearch />
              Procurando
            </TabSelector>
            <TabSelector value="likes" tab={tab} setTab={setTab}>
              <FaThumbsUp />
              Curtidas
            </TabSelector>
          </div>
          <Tab tab="plants" currentTab={tab}>
            <ItemsDrawer
              items={user.plants}
              withoutItemsMessage="Nenhuma planta por enquanto"
            />
          </Tab>
          <Tab tab="likes" currentTab={tab}>
            <ItemsDrawer
              items={user.likedPlants}
              withoutItemsMessage="Nenhuma curtida por enquanto"
            />
          </Tab>
          <Tab tab="lookingFors" currentTab={tab}>
            <LookingForsDrawert
              items={user.lookingFors}
              withoutItemsMessage="Nenhum procurando por enquanto"
            />
          </Tab>
        </div>
      </div>
    </>
  );
}

interface ItemsDrawerProps{ items:any[]; withoutItemsMessage:string }

function ItemsDrawer({ items, withoutItemsMessage }:ItemsDrawerProps) {
  if (items && items.length) {
    return (
      <div
        className="grid gap-2 grid-cols-2 md:grid-cols-5"
      >
        { items.map((item) => (
          <GridItem item={item} key={item.id} />
        ))}
      </div>
    );
  }
  return (
    <div className="text-gray-600 p-10">
      {withoutItemsMessage}
    </div>
  );
}

function LookingForsDrawert({ items, withoutItemsMessage }:ItemsDrawerProps) {
  if (items && items.length) {
    return (
      <div
        className="flex flex-row flex-wrap gap-2"
      >
        { items.map((item) => (
          <LookingForItem item={item} key={item.id} />
        ))}
      </div>
    );
  }
  return (
    <div className="text-gray-600 p-10">
      {withoutItemsMessage}
    </div>
  );
}

interface TabProps{
  tab:string
  currentTab:string
  children:ReactNode
}

function Tab({ tab, currentTab, children }:TabProps) {
  return (
    <div
      className="flex flex-col items-center"
      style={{ display: tab !== currentTab ? 'none' : undefined }}
    >
      {children}
    </div>
  );
}
