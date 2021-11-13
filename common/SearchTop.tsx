import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export function SearchTop() {
  return (
    <Link href="/search">
      <div className="bg-white flex-1 text-black h-9 rounded-full flex flex-row items-center p-3">
        <input
          type="text"
          contentEditable={false}
          placeholder="Pesquisar"
          className="flex-1 focus:border-transparent outline-none bg-transparent w-full"
        />
        <FaSearch className="ml-2" />
      </div>
    </Link>
  );
}
