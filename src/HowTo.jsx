const HowTo = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-neutral-700 shadow-lg p-6 max-w-md w-full relative tracking-wide rounded-xl">

        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-4xl text-pink-400 hover:scale-110 transition"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-center text-xl font-bold mb-4 text-pink-400">How to Play</h2>

        <p className="mb-2">
          Find groups of four songs that appear on the same Taylor Swift album.
        </p>

        <ul className="list-disc marker:text-xs ml-4">
          <li>Select four songs and tap Submit.</li>
          <li>If correct, the group locks in and disappears.</li>
          <li>You have up to 4 incorrect guesses.</li>
          <li>Each puzzle has exactly one solution.</li>
          <li>All songs are from Taylor’s Version of each album (or her latest official release if no TV exists).</li>
        </ul>

        <h3 className="text-xl text-center text-pink-400 font-bold my-2">Examples</h3>

        <ul className="space-y-1">
          <li><strong>LOVER</strong>: Paper Rings, Cruel Summer, Afterglow, Death By A Thousand Cuts</li>
          <li><strong>RED</strong>: All Too Well, 22, Holy Ground, WANEGBT</li>
        </ul>

        <p className="text-xl text-center text-pink-400 font-bold my-4">Thanks for playing!</p>
        <div className="flex md:flex-row justify-center items-center space-x-0 md:space-x-2 text-xs">
          <a href="mailto:samantha.n.cabrera@gmail.com?subject=Feedback for Swiftle" target="_blank" rel="noopener noreferrer" className="hover:italic">Feedack is welcome</a>
          <span className="px-1">|</span>
          <a href="https://samoontha.com" target="_blank" rel="noopener noreferrer" className="hover:italic">Made by Sam Cabrera</a>
        </div>
      </div>
    </div>
  );
};

export default HowTo;
