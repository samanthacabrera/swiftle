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

const Board = () => {
  const [songs, setSongs] = useState([]);
  const [initialSongs, setInitialSongs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [almostDone, setAlmostDone] = useState(false);
  const [time, setTime] = useState(0); 
  const timerRef = useRef(null);
  const [gameWon, setGameWon] = useState(false);
  const maxMistakes = 4;
  const gameOver = mistakes >= maxMistakes;

  useEffect(() => {
    const gameSongs = getInitialSongs();
    setSongs(gameSongs);
    setInitialSongs(gameSongs); 
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

    useEffect(() => {
    if (gameOver) {
      setError(""); 
      revealRemainingGroups();
    }
  }, [gameOver]);

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

  const handleRestart = () => {
    const newSongs = getInitialSongs();
    setSongs(newSongs);
    setInitialSongs(newSongs);
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
  
  const revealRemainingGroups = () => {
    const guessedSongs = new Set(groups.flatMap(g => g.songs.map(s => s.song)));
    const albumMap = {};
    initialSongs.forEach((song) => {
      if (!guessedSongs.has(song.song)) {
        if (!albumMap[song.album]) albumMap[song.album] = [];
        albumMap[song.album].push(song);
      }
    });
    const remainingGroups = Object.entries(albumMap).map(([album, songs]) => ({
      album,
      songs,
    }));
    setGroups([...groups, ...remainingGroups]);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto text-center">
      {gameOver && !gameWon && (
        <div className="text-neutral-700 p-4">
          <p className="text-lg font-bold mb-1">Game Over!</p>
          <p className="mb-2">Here are the correct albums:</p>
        </div>
      )}

      {groups.length > 0 && (
        <div className="grid gap-4 grid-cols-1">
          {groups.map((group, index) => (
            <div
              key={index}
              className="rounded-lg p-4 shadow-sm text-pink-400 bg-pink-50"
            >
              <p className="font-semibold mb-2">{group.album}</p>
              <ul className="text-sm text-left">
                {group.songs.map((s, i) => (
                  <li key={i}>{s.song}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {gameOver && !gameWon && (
        <div className="my-4 p-4">
          <button onClick={handleRestart} className="btn">
            Restart Game
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2">
        {songs.map((songObj) => (
          <button
            key={songObj.song}
            onClick={() => toggleSelect(songObj)}
            disabled={gameOver}
            className={`h-24 w-full sm:h-28 sm:w-34 border border-pink-100 flex justify-center items-center flex-wrap rounded-md relative cursor-pointer select-none p-2 text-xs transition z-0
              ${
                selected.includes(songObj)
                  ? "bg-pink-400 text-white border border-pink-400"
                  : "bg-pink-100 text-neutral-700 hover:bg-pink-200 hover:border-white transition"
              } ${gameOver ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {songObj.song}
          </button>
        ))}
      </div>

      {!gameWon && (
        <p className="text-neutral-700 text-right">
          {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
        </p>
      )}

      {!gameWon && (
        <p className="text-neutral-700">
          Mistakes Remaining:{" "}
          <span className="text-lg tracking-widest ml-4">
            {"●".repeat(maxMistakes - mistakes) + "○".repeat(mistakes)}
          </span>
        </p>
      )}

      {error && <p className="text-neutral-700 my-4">{error}</p>}

      <div className="flex flex-wrap gap-6 justify-center my-6">
        {!gameWon && <button onClick={handleShuffle} disabled={gameOver} className="btn">Shuffle</button>}
        {!gameWon && <button onClick={handleDeselect} disabled={gameOver} className="btn">Deselect All</button>}
        {!gameWon && <button onClick={handleSubmitGroup} disabled={gameOver} className="btn">Submit</button>}
      </div>

      {gameWon && (
          <div className="text-neutral-700 space-y-4 mb-4">
            <p className="text-lg">Congratulations!</p>
            <p>You matched all the songs to the correct album in {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")} minutes.</p>
            <button
              onClick={handleRestart}
              className="btn"
            >
              Play Again
            </button>
          </div>
        )}
    </div>
  );
};

export default Board;
