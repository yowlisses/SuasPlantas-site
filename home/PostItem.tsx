import {
  FaShare,
  FaThumbsUp,
  FaComments,
  FaCommentAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import Image from 'next/image';
import { Plant } from '../plant/Plant';
import { Quest } from '../quest/Quest';
import { PostButton } from './PostButton';
import { userImageSVG } from '../images/user';

interface PostItemProps{
    item:Plant|Quest
}

export function PostItem({ item }:PostItemProps) {
  const {
    name, user, images, card,
  } = item;
  const imageSize = 40;

  const cardSize = 500;

  return (
    <div className="flex flex-row p-2 gap-2 rounded-xl max-h-screen">
      <div className="flex-shrink-0">
        <Image
          width={imageSize}
          objectFit="cover"
          height={imageSize}
          src={user.image || userImageSVG}
          className="bg-gray-300 rounded-full"
        />
      </div>
      <div>
        <div className="leading-6">
          <span className="font-semibold">
            {user.name}
          </span>
          {' '}
          <span className="text-sm text-gray-500">
            {' '}
            <FaMapMarkerAlt className="inline pb-0.5" />
            {user.city}
            ,
            {' '}
            {user.state}
          </span>
        </div>
        <div className="flex flex-row items-start">
          adicionou a planta
        </div>
        <div className={`bg-gray-100 flex flex-col rounded-xl ${!card ? 'py-6 center' : ''}`}>
          <div className="text-lg p-2">
            {name}
          </div>
          {card && (
          <Image
            src={card}
            width={cardSize}
            height={cardSize}
            objectFit="cover"
            className="bg-gray-100 rounded-lg"
          />
          )}
        </div>
        <div className="center-row gap-4">
          <PostButton Icon={FaCommentAlt} count={3421} />
          <PostButton Icon={FaThumbsUp} count={3421} />
          <PostButton Icon={FaComments} />
          <PostButton Icon={FaShare} />
        </div>
      </div>
      <div />
    </div>
  );
}