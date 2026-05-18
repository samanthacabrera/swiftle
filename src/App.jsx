import { useState } from "react";
import Header from "./Header";
import Board from "./Board";

function App() {
  const [time, setTime] = useState(0);
  const [gameActive, setGameActive] = useState(true);

  return (
    <div className="mx-4">
      <Header time={time}/>
      <Board time={time} setTime={setTime} setGameActive={setGameActive}/>
    </div>
  );
}

export default App
