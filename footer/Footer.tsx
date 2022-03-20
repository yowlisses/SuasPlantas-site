import Link from 'next/link';
import { IconType } from 'react-icons';
import {
  FaCommentAlt,
  FaHome, FaMap, FaPlus, FaPlusCircle, FaPlusSquare,
} from 'react-icons/fa';
import { MeButton } from '../header/MeButton';

interface FooterButtonProps{
    Icon:IconType
    selected?:boolean
    href:string
}

function FooterButton({ selected, Icon, href }:FooterButtonProps) {
  return (
    <Link href={href}>
      <button className="icon-button">
        <Icon size={23} color={selected ? 'rgb(4 120 87)' : '#888'} />
      </button>
    </Link>
  );
}

interface FooterProps{
    selected?:string
}

export function Footer({ selected }:FooterProps) {
  return (
    <div className="h-12 relative">
      <div
        style={{ boxShadow: '0 0 4px #0008' }}
        className="h-12 bg-white fixed w-full bottom-0 flex flex-row items-center justify-between p-2"
      >
        <FooterButton Icon={FaHome} selected={selected === 'home'} href="/" />
        <FooterButton Icon={FaCommentAlt} selected={selected === 'chats'} href="/chat" />
        <FooterButton Icon={FaMap} selected={selected === 'map'} href="/map" />
        <MeButton />
      </div>
    </div>
  );
}
