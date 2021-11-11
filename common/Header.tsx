import Link from "next/link";

export function Header() {
  return (
    <div className="bg-green-700 text-white h-14 px-3 items-center flex flex-row justify-between select-none">
      <Link href="/">
        <div className="text-lg">Plantes</div>
      </Link>
      <Link href="/sign-in">
        <div className="text-lg">sign in</div>
      </Link>
    </div>
  );
}
