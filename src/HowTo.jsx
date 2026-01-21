import { useEffect } from "react";

const HowTo = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"; 
    return () => {
      document.body.style.overflow = ""; 
    };
  }, []);
  return (
    <div className="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white/30 backdrop-blur-lg border border-white/70 rounded-xl shadow-xl p-6 max-w-md w-full relative text-neutral-600/90 tracking-wide">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-4xl text-pink-600/60 hover:scale-110 transition"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-center text-xl font-bold mb-4 text-pink-600/60">How to Play</h2>

        {/* Instructions */}
        <p className="mb-2">
          Find groups of four songs that appear on the same Taylor Swift album.
        </p>
        <ul className="list-disc marker:text-xs ml-4 mb-4">
          <li>Select four songs and tap Submit.</li>
          <li>If correct, the group locks in and disappears.</li>
          <li>You have up to 4 incorrect guesses.</li>
          <li>Each puzzle has exactly one solution.</li>
          <li>All songs are from Taylor’s Version of each album (or her latest official release if no TV exists).</li>
        </ul>

        {/* Examples */}
        <h3 className="text-xl text-center text-pink-600/60 font-bold my-2">Examples</h3>
        <ul className="space-y-1 mb-4">
          <li><strong>LOVER</strong>: Paper Rings, Cruel Summer, Afterglow, Death By A Thousand Cuts</li>
          <li><strong>RED</strong>: All Too Well, 22, Holy Ground, WANEGBT</li>
        </ul>

        <p className="text-xl text-center text-pink-600/60 font-bold my-4">Thanks for playing!</p>

        {/* Links */}
        <div className="flex md:flex-row justify-center items-center space-x-0 md:space-x-2 text-xs">
          <a href="mailto:samantha.n.cabrera@gmail.com?subject=Feedback for Swiftle" target="_blank" rel="noopener noreferrer" className="hover:italic">Feedback is welcome</a>
          <span className="px-1">|</span>
          <a href="https://samoontha.com" target="_blank" rel="noopener noreferrer" className="hover:italic">Made by Sam Cabrera</a>
        </div>
      </div>
    </div>
  );
};

export default HowTo;
