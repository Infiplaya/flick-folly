import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { ShowType, VibeType } from "../components/Dropdown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import { Dropdown } from "../components/Dropdown";
import { useRecommendationStore } from "../store";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Feel-Good");
  const [type, setType] = useState<ShowType>("Movie");
  const [generatedRecommendations, setGeneratedRecommendations] =
    useState("");
  const addRecommendation = useRecommendationStore(
    (state) => state.addRecommendation
  );

  const prompt =
    vibe === "Funny"
      ? `Give me 3 ${type} recommendations and clearly labeled "1.", "2." and "3.". Make sure they are funny. Make sure to add short description, max 15 words, and base it on this context: ${details}${
          details.slice(-1) === "." ? "" : "."
        }`
      : `Generate 3 ${vibe} ${type} recommendations and clearly labeled "1.", "2." and "3.". Make sure to add short description, max 15 words, and base it on this context: ${details}${
          details.slice(-1) === "." ? "" : "."
        }`;

  const generateRecommendation = async (e: any) => {
    e.preventDefault();
    setGeneratedRecommendations("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedRecommendations((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Recommendation Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-7xl tracking-wide text-4xl max-w-4xl font-bold text-neutral-100">
          Don't know what to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">watch</span>? Get
          some recommendations!
        </h1>
        <div className="max-w-2xl mt-20 w-full">
          <div className="flex mb-5 items-center space-x-3">
            <p className="text-left font-medium text-lg">Select type.</p>
          </div>
          <div className="block">
            <Dropdown
              value={type}
              setValue={(newType) => setType(newType as ShowType)}
            />
          </div>

          <div className="flex my-5 items-center space-x-3">
            <p className="text-left font-medium text-lg">Select your vibe.</p>
          </div>
          <div className="block">
            <Dropdown
              value={vibe}
              setValue={(newVibe) => setVibe(newVibe as VibeType)}
            />
          </div>
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left text-lg font-medium">
              Tell us something more about what you are looking for.
            </p>
          </div>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={4}
            className="w-full rounded-md bg-neutral-800 border-neutral-700 placeholder:text-neutral-400 shadow-sm focus:border-purple-500 focus:ring-purple-500 my-5"
            placeholder={
              "e.g. Teenager balance his life as an ordinary high school student with his superhero alter-ego"
            }
          />

          {!loading && (
            <button
              className="bg-purple-600 rounded-xl inline-flex items-center justify-center gap-1 text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-purple-700 w-full"
              onClick={(e) => generateRecommendation(e)}
            >
              Check out recommendations{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          )}
          {loading && (
            <button
              className="bg-purple-600 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-purple-600/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-neutral-700 border-1 dark:bg-neutral-900" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-20">
              {generatedRecommendations && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-neutral-100 mx-auto">
                      Recommendations for you
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    {generatedRecommendations
                      .substring(generatedRecommendations.indexOf("1") + 3)
                      .split(/[2-3]\./)
                      .map((generatedBio) => {
                        return (
                          <>
                            <div
                              className="bg-neutral-800 rounded-xl shadow-md p-4 hover:bg-neutral-700 transition cursor-copy border border-neutral-700"
                              onClick={() => {
                                navigator.clipboard.writeText(generatedBio);
                                toast.custom((t) => (
                                  <div
                                    className={`${
                                      t.visible ? 'animate-enter' : 'animate-leave'
                                    } max-w-md w-full bg-neutral-800 items-center justify-center shadow-lg shadow-purple-700/50 rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                                  >
                                    
                                    <p className="p-5 text-center font-semibold">Recommendation coppied to your clipboard!</p>
                                  </div>
                                ))
                              }}
                              key={generatedBio}
                            >
                              <p>{generatedBio}</p>
                            </div>
                            <button
                              onClick={() => {
                                addRecommendation(generatedBio);
                                toast(
                                  "Recommendation added to your favorites!"
                                );
                              }}
                              className="bg-purple-600 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-purple-700 "
                            >
                              Add to Favorites
                            </button>
                          </>
                        );
                      })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
