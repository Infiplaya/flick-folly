import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type VibeType = "Feel-Good" | "Romantic" | "Funny";
export type ShowType = "TV Show" | "Movie" | "Both";

interface DropDownProps {
  value: VibeType | ShowType;
  setValue: (value: VibeType | ShowType) => void;
}

export function Dropdown({ value, setValue }: DropDownProps) {
  let values: VibeType[] | ShowType[];

  ["Romantic", "Feel-Good", "Funny"].includes(value)
    ? (values = ["Romantic", "Feel-Good", "Funny"])
    : (values = ["TV Show", "Movie", "Both"]);

  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 text-neutral-200 shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {value}
          <ChevronUpIcon
            className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 hidden ui-open:block"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-neutral-800 shadow-lg shadow-neutral-700 ring-1 ring-blue-500 ring-opacity-5 focus:outline-none"
          key={value}
        >
          <div className="">
            {values.map((valueItem) => (
              <Menu.Item key={value}>
                {({ active }) => (
                  <button
                    onClick={() => setValue(valueItem)}
                    className={classNames(
                      active
                        ? "bg-neutral-700 text-neutral-100"
                        : "text-neutral-200",
                      value === valueItem ? "bg-neutral-800" : "",
                      "px-4 py-2 text-sm w-full text-left flex items-center space-x-2 justify-between"
                    )}
                  >
                    <span>{valueItem}</span>
                    {value === valueItem ? (
                      <CheckIcon className="w-4 h-4 text-bold" />
                    ) : null}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
