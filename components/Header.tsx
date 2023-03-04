import Link from "next/link";
import { Recommendations } from "./Recommendations";

export default function Header() {
  return (
    <header className="flex items-baseline justify-between w-full mt-5 border-b-2 border-neutral-800 pb-7 sm:px-4 px-2">
      <Link href="/">
        <h1 className="sm:text-4xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-2xl font-bold ml-2">
          Flick Folly
        </h1>
      </Link>
      <Recommendations />
    </header>
  );
}
