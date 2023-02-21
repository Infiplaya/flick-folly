import { useEffect, useState, Fragment } from "react";
import { useRecommendationStore } from "../store";
import { Dialog, Transition } from "@headlessui/react";

export const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<String[]>();
  let [isOpen, setIsOpen] = useState(true);
  const fetchedRecommendations = useRecommendationStore(
    (state) => state.recommendations
  );

  const removeRecommendation = useRecommendationStore(
    (state) => state.removeRecommendation
  );

  useEffect(() => {
    setRecommendations([...new Set(fetchedRecommendations)]);
  }, [fetchedRecommendations]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="font-medium text-neutral-100"
        >
          Favorites
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed right-0 top-0 h-full overflow-y-auto bg-neutral-800 w-1/5">
            <div className="flex min-h-full justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-4 h-screen text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-3xl">Favorites</Dialog.Title>
                  {recommendations?.length !== 0 ? (
                    <ul>
                      {recommendations?.map((r, i) => (
                        <li key={i} className="p-5 mt-5 flex text-lg flex-col">
                          {r}
                          <button
                            className="bg-red-500 rounded-xl inline-flex text-sm items-center justify-center w-24 text-white font-medium px-4 py-1 mt-2 hover:bg-red-600 "
                            onClick={() => removeRecommendation(r as string)}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5">
                      You don't have any recommendations added to favorites yet.
                      Go add some!
                    </p>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
