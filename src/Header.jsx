import { useState } from "react";
import HowTo from "./HowTo";

const Header = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <div className="flex justify-center w-full px-6 py-4 bg-pink-600/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg text-center mt-4 mx-auto max-w-2xl">
        <div className="flex flex-col">
          <h1 className="title text-2xl lg:text-4xl font-bold text-white drop-shadow-md">
            Swiftle
          </h1>
          <h6 className="text-sm lg:text-base text-white/90 mt-1 drop-shadow-sm">
            A game inspired by a love of Taylor Swift & {" "}
            <a
              href="https://www.nytimes.com/games/connections"
              target="_blank"
              className="hover:border-b hover:border-dashed transition-colors"
            >
              NYT's Connections
            </a>
          </h6>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="absolute right-2 md:right-6 self-center border rounded-full px-3 py-1 hover:scale-105 hover:shadow-[0_0_20px_0_rgba(255,255,255,0.3)] transition-all duration-200" 
          aria-label="How to Play"
        >
          ?
        </button>
      </div>

      {showModal && <HowTo onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Header;

