import Image from 'next/image';
import Head from 'next/head';
import { Header } from '../common/Header';
import { Plant } from '../types/Plant';
import { AvailabilityInfo } from './AvailabilityInfo';
import { Session } from './Session';
import { availabilitiesToString } from './availabilitiesToString';
import { UserLink } from '../user/UserLink';
import { devIndicator } from '../utils/devIndicator';

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
        <div className="flex lg:flex-row lg:gap-2">
          <div className="flex-1 lg:sticky top-0">
            <div className="sticky top-0 flex items-center">
              <Image
                src={data.images[0].uri}
                width={600}
                height={700}
                alt={name}
                className="bg-fixed w-full rounded-b-lg object-cover sm:object-contain block"
              />
              {/* {JSON.stringify(data.images[0].uri)} */}
            </div>
          </div>
          <div className="flex-1">
            <div className="p-2 gap-4 flex">
              <Session>
                <h1 className="text-2xl">{name}</h1>
                <AvailabilityInfo {...{ swap, donate, price }} />
              </Session>
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