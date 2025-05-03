import { useState } from 'react';
import FlappyBird from './games/flappybird';
import { useLocation } from 'react-router-dom';


export default function Game() {
  const location = useLocation();
  const gameId = location.state || '';

  const [isGameRunning,setIsGameRunning  ] = useState(true);
  const componentMap = {
    '1': FlappyBird
  }
  const SelectedGame = componentMap[gameId]
  const onGameOver = (score) => {
    setIsGameRunning(false)
    console.log(score);
  }

    return (isGameRunning?<SelectedGame isGameRunning={isGameRunning} onGameOver={onGameOver} />:<>Game Over Component</>)
  
}