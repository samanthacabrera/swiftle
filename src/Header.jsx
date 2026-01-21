import { useState } from "react";
import HowTo from "./HowTo";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full px-6 py-4 bg-pink-600/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg text-center mx-auto mt-4 max-w-3xl">
        <h1 className="title text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-md">
          Swiftle
        </h1>
        <h6 className="text-xs md:text-sm lg:text-base text-white/90 mt-1 drop-shadow-sm">
          A game inspired by a love of Taylor Swift & NYT's{" "}
          <a
            href="https://www.nytimes.com/games/connections"
            target="_blank"
            className="hover:border-b-2 hover:border-dashed transition-colors"
          >
            Connections
          </a>
        </h6>
      </div>

      {/* How-to */}
      <button
        onClick={() => setShowModal(true)}
        className="absolute top-6 right-6 btn"
        aria-label="How to Play"
      >
        ?
      </button>

      {showModal && <HowTo onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Header;
