import { useEffect, useState } from "react";
import allsongs from "./songs";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const getInitialSongs = () => {
  // group songs by album
  const albumMap = {};
  allsongs.forEach((song) => {
    if (!albumMap[song.album]) {
      albumMap[song.album] = [];
    }
    albumMap[song.album].push(song);
  });

  // filter albums with at least 4 songs
  const validAlbums = Object.entries(albumMap).filter(
    ([_, songs]) => songs.length >= 4
  );

  // shuffle and select 4 albums
  const shuffledAlbums = shuffleArray(validAlbums).slice(0, 4);

  // select 4 songs from each chosen album
  const selectedSongs = shuffledAlbums.flatMap(([_, songs]) =>
    shuffleArray(songs).slice(0, 4)
  );

  return shuffleArray(selectedSongs);
};

const handleRestart = () => {
  setSongs(getInitialSongs());
  setSelected([]);
  setGroups([]);
  setError("");
  setMistakes(0);
};


const Board = () => {
  const [songs, setSongs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const maxMistakes = 4;

  useEffect(() => {
    setSongs(getInitialSongs());
  }, []);

  const toggleSelect = (songObj) => {
    const isSelected = selected.includes(songObj);
    if (isSelected) {
      setSelected(selected.filter((s) => s !== songObj));
    } else if (selected.length < 4) {
      setSelected([...selected, songObj]);
    }
    setError("");
  };

  const handleSubmitGroup = () => {
    if (selected.length !== 4) {
      setError("Select exactly 4 songs.");
      return;
    }

    const allSameAlbum = selected.every(
      (item) => item.album === selected[0].album
    );

    if (allSameAlbum) {
      setGroups([...groups, { album: selected[0].album, songs: selected }]);
      setSongs(songs.filter((s) => !selected.includes(s)));
      setSelected([]);
    } else {
      setMistakes((prev) => prev + 1);
      setError("These songs are not from the same album. Try again!");
      setSelected([]);
    }
  };

  const handleShuffle = () => {
    setSongs(shuffleArray(songs));
  };

  const handleDeselect = () => {
    setSelected([]);
    setError("");
  };

  const gameOver = mistakes >= maxMistakes;

  return (
    <div className="p-4 max-w-2xl mx-auto text-center">
      <p className="my-12">Create four groups of four!</p>

      {groups.length > 0 && (
        <div className="mb-6">
          {groups.map((group, index) => (
            <div key={index} className="mb-2 p-2">
              {group.album}: {group.songs.map((s) => s.song).join(", ")}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {songs.map((songObj) => (
          <button
            key={songObj.song}
            onClick={() => toggleSelect(songObj)}
            disabled={gameOver}
            className={`h-24 w-full sm:h-24 sm:w-34 flex justify-center items-center flex-wrap rounded-md relative cursor-pointer font-bold uppercase select-none py-6 px-2 text-xs transition z-0
              ${
                selected.includes(songObj)
                  ? "bg-pink-500 text-white border-pink-600"
                  : "bg-pink-50 text-black border border-pink-100 hover:bg-pink-100"
              } ${gameOver ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {songObj.song}
          </button>
        ))}
      </div>

      <p className="my-8">
        Mistakes Remaining:{" "}
        <span className="text-4xl tracking-widest ml-4">
          {"●".repeat(maxMistakes - mistakes) + "○".repeat(mistakes)}
        </span>
      </p>

      {gameOver && (
        <div className="my-4 text-red-500">
          You've reached the maximum number of mistakes. Game over!
        </div>
      )}

      {error && <p className="my-4 text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-2 justify-center my-6">
        <button
          onClick={handleShuffle}
          disabled={gameOver}
          className="py-2 px-4 rounded-full border border-black"
        >
          Shuffle
        </button>
        <button
          onClick={handleDeselect}
          disabled={gameOver}
          className="py-2 px-4 rounded-full border border-black"
        >
          Deselect All
        </button>
        <button
          onClick={handleSubmitGroup}
          disabled={gameOver}
          className="py-2 px-4 rounded-full border border-black"
        >
          Submit
        </button>
      </div>

      {gameOver && (
        <div className="my-4 text-red-500">
          <p>You've reached the maximum number of mistakes. Game over!</p>
          <button
            onClick={handleRestart}
            className="mt-4 py-2 px-4 rounded-full border border-black text-black"
          >
            Restart Game
          </button>
        </div>
        )}
    </div>
  );
};

export default Board;
