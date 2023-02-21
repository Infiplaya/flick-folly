import Link from "next/link";
import { Recommendations } from "./Recommendations";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b border-neutral-500 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <h1 className="sm:text-4xl text-blue-500 text-2xl font-bold ml-2 tracking-tight">
          Flick Folly
        </h1>
      </Link>
      <Recommendations />
    </header>
  );
}
