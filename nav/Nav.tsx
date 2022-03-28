import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { HomeButton } from './HomeButton';
import { NavItems } from '../footer/NavItems';
import { LateralNavButton } from './LateralNavItem';
import { useUser } from '../auth/userContext';

export function Nav() {
  const [expanded, setExpanded] = useState(false);
  const { user } = useUser();

  function handleClick() {
    setExpanded((value) => !value);
  }

  if (!user) return null;

  return (
    <>
      <div className="relative">
        <nav
          className="fixed flex w-52 flex-col items-stretch h-screen border-r border-gray-200"
        >
          <HomeButton />
          <NavItems expanded={expanded} styleType="lateral" />
          <LateralNavButton
            onClick={handleClick}
            text={expanded ? 'Ver menos' : 'Ver mais'}
            Icon={expanded ? FaChevronUp : FaChevronDown}
          />
        </nav>
      </div>
      <div className="w-52" />
    </>
  );
}