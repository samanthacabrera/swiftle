import { useEffect, useState, useRef } from "react";
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
  setTime(0);
  setGameWon(false);
  
  if (timerRef.current) clearInterval(timerRef.current);
  timerRef.current = setInterval(() => {
    setTime((prev) => prev + 1);
  }, 1000);
};


const Board = () => {
  const [songs, setSongs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [almostDone, setAlmostDone] = useState(false);
  const [time, setTime] = useState(0); 
  const timerRef = useRef(null);
  const [gameWon, setGameWon] = useState(false);

  const maxMistakes = 4;

  useEffect(() => {
    setSongs(getInitialSongs());
    // start timer
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(timerRef.current);
    };
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
    setAlmostDone(false);
  
    if (selected.length !== 4) {
      setError("Select exactly 4 songs.");
      return;
    }
  
    const albumCounts = {};
    selected.forEach((song) => {
      albumCounts[song.album] = (albumCounts[song.album] || 0) + 1;
    });
  
    const mostCommonAlbum = Object.entries(albumCounts).sort((a, b) => b[1] - a[1])[0];
  
    if (mostCommonAlbum[1] === 4) {
    const newGroups = [...groups, { album: selected[0].album, songs: selected }];
    setGroups(newGroups);
    setSongs(songs.filter((s) => !selected.includes(s)));
    setSelected([]);
    setError("");

    if (newGroups.length === 4) {
      setGameWon(true);
      if (timerRef.current) clearInterval(timerRef.current);
    } else if (newGroups.length === 3) {
      setAlmostDone(true);
    }

    } else if (mostCommonAlbum[1] === 3) {
      setMistakes((prev) => prev + 1); 
      setAlmostDone(true);
      setError("You're so close! 3 out of 4 songs are from the same album.");
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

      <p className="my-8">Create four groups of four!</p>

      {groups.length > 0 && (
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {groups.map((group, index) => (
            <div
              key={index}
              className="border border-pink-300 rounded-lg p-4 shadow-sm bg-pink-50"
            >
              <p className="font-semibold text-pink-600 mb-2">{group.album}</p>
              <ul className="text-sm text-left">
                {group.songs.map((s, i) => (
                  <li key={i}>{s.song}</li>
                ))}
              </ul>
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
      {!gameWon && (
        <p className="text-right">
          {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
        </p>
      )}

      {!gameWon && (
        <p className="">
          Mistakes Remaining:{" "}
          <span className="text-4xl tracking-widest ml-4">
            {"●".repeat(maxMistakes - mistakes) + "○".repeat(mistakes)}
          </span>
        </p>
      )}

      {error && <p className="my-4 text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-2 justify-center my-6">
        {!gameWon && <button onClick={handleShuffle} disabled={gameOver} className="py-2 px-4 rounded-full border border-black">Shuffle</button>}
        {!gameWon && <button onClick={handleDeselect} disabled={gameOver} className="py-2 px-4 rounded-full border border-black">Deselect All</button>}
        {!gameWon && <button onClick={handleSubmitGroup} disabled={gameOver} className="py-2 px-4 rounded-full border border-black">Submit</button>}
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

      {gameWon && (
          <div className="my-4 p-4 border border-green-500 bg-green-100 rounded-lg">
            <p className="font-semibold text-green-700 text-lg">Congratulations! 🎉</p>
            <p>You completed all groups in {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")} minutes.</p>
            <button
              onClick={handleRestart}
              className="mt-4 py-2 px-4 rounded-full border border-black text-black"
            >
              Play Again
            </button>
          </div>
        )}
      
      <p className="relative bottom-2 opacity-50 text-xs italic">inspired by NYT's <a href="https://www.nytimes.com/games/connections" target="_blank" className="hover:underline">Connections</a></p>
    </div>
  );
};

export default Board;
