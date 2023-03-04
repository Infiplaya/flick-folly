import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-neutral-400  h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t-2 border-neutral-800 mt-5 flex sm:flex-row flex-col justify-between items-center px-3 sm:mb-0 mb-3">
      <div>
        Powered by{" "}
        <a
          href="https://openai.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          OpenAI{" "}
        </a>
        and{" "}
        <a
          href="https://vercel.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Vercel Edge Functions.
        </a>
      </div>
      <div>
      <a
          href="https://github.com/infiplaya/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          My Github
        </a>
      </div>
    </footer>
  );
}
