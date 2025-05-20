import React, { useState } from "react";

const allsongs = [
  { song: "Red", album: "Red" },
  { song: "All Too Well", album: "Red" },
  { song: "I Knew You Were Trouble", album: "Red" },
  { song: "22", album: "Red" },

  { song: "Delicate", album: "Reputation" },
  { song: "Look What You Made Me Do", album: "Reputation" },
  { song: "…Ready For It?", album: "Reputation" },
  { song: "The Archer", album: "Reputation" },

  { song: "You Belong With Me", album: "Fearless" },
  { song: "Love Story", album: "Fearless" },
  { song: "Fifteen", album: "Fearless" },
  { song: "White Horse", album: "Fearless" },

  { song: "Willow", album: "Evermore" },
  { song: "Champagne Problems", album: "Evermore" },
  { song: "Gold Rush", album: "Evermore" },
  { song: "Tolerate It", album: "Evermore" },
];

const Board = () => {
  const [songs, setSongs] = useState(allsongs);
  const [selected, setSelected] = useState([]);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");

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
      setError("These songs are not from the same album. Try again!");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto text-center">
      <p className="my-12">Group the songs by album</p>

      {groups.length > 0 && (
        <div className="mb-6">
          {groups.map((group, index) => (
            <div
              key={index}
              className="mb-2 p-2"
            >
              {group.album}:{" "}
              {group.songs.map((s) => `${s.song}`).join(", ")}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {songs.map((songObj) => (
          <button
            key={songObj.song}
            onClick={() => toggleSelect(songObj)}
            className={`p-2 text-xs rounded border transition ${
              selected.includes(songObj)
                ? "bg-pink-500 text-white border-pink-600"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            {songObj.song}
          </button>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        onClick={handleSubmitGroup}
        className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
      >
        Submit Group
      </button>
    </div>
  );
};

export default Board;
