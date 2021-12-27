import Head from 'next/head';
import Image from 'next/image';
import { Session } from './Session';
import { Plant } from '../types/Plant';
import { Header } from '../common/Header';
import { UserLink } from '../user/UserLink';
import { someImage } from '../mock/someImage';
import { devIndicator } from '../utils/devIndicator';
import { AvailabilityInfo } from './AvailabilityInfo';
import { availabilitiesToString } from './availabilitiesToString';

export function PlantScreen({ data }: { data: Plant }) {
  const {
    name,
    description,
    swap,
    donate,
    price,
    tags, user,
    updatedAt: updatedAtString,
  } = data;

  const updatedAt = new Date(updatedAtString);

  const stringAvailability = availabilitiesToString({ price, swap, donate });

  console.log(data);
  return (
    <div>
      <Head>
        <title>
          {`${devIndicator} ${name} - ${stringAvailability}`}
        </title>

        <Head>
          <meta
            name="description"
            content={`Planta, Nome: ${name}, Disponível para ${stringAvailability}, Pertence a ${user.name}`}
          />
        </Head>
      </Head>
      <Header />
      <main>
        <div className="flex flex-col lg:flex-row lg:gap-2">
          <div className="flex-1 lg:sticky top-0">
            <div className="sticky top-0 flex flex-col items-center">
              <Image
                src={data.images[0]?.uri || someImage}
                width={600}
                height={600}
                alt={name}
                className="bg-fixed w-full rounded-b-lg object-cover sm:object-contain block"
              />
              {/* {JSON.stringify(data.images[0].uri)} */}
            </div>
          </div>
          <div className="flex-1">
            <div className="p-2 gap-4 flex flex-col">
              <Session>
                <h1 className="text-2xl">{name}</h1>
                <AvailabilityInfo {...{ swap, donate, price }} />
              </Session>
              {!!data.amount
                && (
                <div>
                  {data.amount}
                  {' '}
                  {data.amount === 1 ? 'disponível' : 'disponíves'}
                </div>
                )}
              {!!tags?.length && (
                <Session label="Marcado como">
                  <div />
                  {/* <TagsInfo tags={tags} /> */}
                </Session>
              )}
              <UserLink user={data.user} />
              <div>
                Última edição
                {' '}
                <time>{updatedAt.toLocaleDateString()}</time>
              </div>
              {!!description?.length && (
                <Session label="Descrição">
                  <div>{description}</div>
                  {/* <div>{loremIpsum}</div> */}
                </Session>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* <div>{loremIpsum}</div> */}
    </div>
  );
}
