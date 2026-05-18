import { useState } from "react";
import HowTo from "./HowTo";

const Header = ({ time }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center w-full px-6 py-4 bg-pink-600/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg text-center mt-4 mx-auto max-w-2xl relative">
        
        <div className="flex flex-col mx-auto">
          <h1 className="title text-2xl lg:text-4xl font-bold text-white drop-shadow-md">
            Swiftle
          </h1>
          <h6 className="text-sm lg:text-base text-white/90 mt-1 drop-shadow-sm">
            A game inspired by a love of Taylor Swift &{" "}
            <a
              href="https://www.nytimes.com/games/connections"
              target="_blank"
              className="hover:border-b hover:border-dashed transition-colors"
            >
              NYT's Connections
            </a>
          </h6>
        </div>

        <p className="absolute right-3 md:right-7 bottom-2 text-white/90 text-sm">
          {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="absolute right-2 md:right-6 border rounded-full px-3 py-1 hover:scale-105 transition-all"
        >
          ?
        </button>
      </div>

      <HowTo isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Header;