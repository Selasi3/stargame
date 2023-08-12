// import logo from './logo.svg';
import './App.css';
import { useState} from   'react'
import Game from './components/Game';

  //CUstom hook


const StarMatch = () => {
  const [gameId, setGameId] = useState(1);

  return <Game key={gameId} startNewGame={() => setGameId(gameId+1)} />
}

// Math science


function App() {
  return (
   <StarMatch />
  );
}

export default App;
