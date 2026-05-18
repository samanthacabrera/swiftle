import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HowTo = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-pink-200/20 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white/30 backdrop-blur-lg border border-white/70 rounded-xl shadow-2xl p-6 max-w-md w-full relative text-neutral-800 tracking-wide"
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-4 text-4xl text-pink-600/60 hover:scale-110 transition"
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-center text-xl font-bold mb-4 text-pink-600/60">
              How to Play
            </h2>

            <p className="mb-2">
              Find groups of four songs that appear on the same Taylor Swift album.
            </p>

            <ul className="list-disc marker:text-xs ml-4 mb-4">
              <li>Select four songs and tap Submit.</li>
              <li>If correct, the group locks in and disappears.</li>
              <li>You have up to 4 incorrect guesses.</li>
              <li>Each puzzle has exactly one solution.</li>
              <li>All songs are from Taylor’s Version of each album (or latest release if no TV exists).</li>
            </ul>

            <h3 className="text-xl text-center text-pink-600/60 font-bold my-2">
              Examples
            </h3>

            <ul className="space-y-1 mb-4">
              <li><strong>LOVER</strong>: Paper Rings, Cruel Summer, Afterglow, Death By A Thousand Cuts</li>
              <li><strong>RED</strong>: All Too Well, 22, Holy Ground, WANEGBT</li>
            </ul>

            <p className="text-xl text-center text-pink-600/60 font-bold my-4">
              Thanks for playing!
            </p>

            <div className="flex md:flex-row justify-center items-center text-neutral-800 text-xs">
              <a
                href="mailto:samantha.n.cabrera@gmail.com?subject=Feedback for Swiftle"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:italic"
              >
                Feedback is welcome
              </a>

              <span className="px-1">|</span>

              <a
                href="https://samoontha.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:italic"
              >
                Made by Sam Cabrera
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HowTo;