import { IconType } from 'react-icons';
import { gray400 } from '../common/colors';

interface PostButtonProps{
    Icon:IconType
    count?:number
}

export function PostButton({ Icon, count }:PostButtonProps) {
  return (
    <button className="center-row text-sm font-semibold group text-gray-400 hover:text-green-700">
      <span className="group-hover:bg-green-200 p-3 rounded-full transition-all duration-150">
        <Icon size={18} color={gray400} />
      </span>
      {count}
    </button>
  );
}