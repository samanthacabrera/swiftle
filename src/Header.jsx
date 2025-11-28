import { useState } from "react";
import HowTo from "./HowTo";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center w-screen h-[10vh] bg-pink-500 text-pink-50 relative shadow">
        <div className="flex flex-col md:flex-row items-center text-center space-y-1 ml-4 tracking-widest">
          <h1 className="text-xl md:text-2xl lg:text-3xl">Swiftle<span className="invisible md:visible">:</span></h1>
          <h6 className="text-center text-xs md:text-lg lg:text-2xl ml-2">
            A game inspired by a love of Taylor Swift & NYT's{" "}
            <a
              href="https://www.nytimes.com/games/connections"
              target="_blank"
              className="hover:border-b-2 hover:border-dashed transition"
            >
              Connections
            </a>
          </h6>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="relative md:fixed md:bottom-2 md:right-2 text-white text-xs md:text-md bg-pink-500 border border-pink-50 rounded-full m-1 px-2 py-1 md:px-3 md:py-2 hover:scale-105 transition"
          aria-label="How to Play"
        >
          ?
        </button>
      </div>

      {showModal && (
        <HowTo onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Header;
