import { useState } from "react";
import HowTo from "./HowTo";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center w-screen bg-pink-400 relative">
        <div className="flex flex-col items-center w-full  py-2 text-center space-y-1 tracking-widest">
          <h1 className="title text-xl md:text-2xl lg:text-3xl font-bold">Swiftle</h1>
          <h6 className="text-center text-xs md:text-lg lg:text-xl ml-2">
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
          className="border border-white rounded-full text-white text-xs w-6 h-6 md:text-lg md:w-8 md:h-8 mr-1 md:mr-2 hover:scale-105 transition"
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
