import { useState } from "react";
import HowTo from "./HowTo";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center w-screen h-[10vh] text-white bg-pink-500 font-bold relative">
        <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-x-6 ml-4 tracking-widest">
          <h1 className="title text-4xl font-medium">Swiftle</h1>
          <h6 className="text-xs md:text-lg">
            A game inspired by a love of Taylor Swift & NYT's{" "}
            <a
              href="https://www.nytimes.com/games/connections"
              target="_blank"
              className="hover:border-b"
            >
              Connections
            </a>
          </h6>
        </div>

        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setShowModal(true)}
            className="text-pink-500 bg-white/50 border-2 border-pink-500 rounded-full py-1 px-3 hover:scale-105 transition"
            aria-label="How to Play"
          >
            ?
          </button>
        </div>
      </div>

      {showModal && (
        <HowTo onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Header;
