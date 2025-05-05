import FlappyBird from "../components/games/flappybird";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, ArrowLeft, Clock, Users, X } from "lucide-react";
import { Button } from "../components/ui/button";
import ParticleBackground from "../components/particle-background";
import ScanlineEffect from "../components/scanline-effect";
import Header from "../components/header";
import ScrollReveal from "../components/scroll-reveal";
import PongGame from "../components/games/pong";
import SpaceInvaders from "../components/games/spaceinvaders";

export default function Game() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const location = useLocation();
  const gameId = location.state || "";

  const players = [
    {
      id: 1,
      name: "Player1",
      score: 2450,
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      name: "GamerX",
      score: 1890,
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      name: "ArcadePro",
      score: 3200,
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
      id: 4,
      name: "RetroFan",
      score: 1560,
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    {
      id: 5,
      name: "You",
      score: score,
      avatar: "https://i.pravatar.cc/40?img=5",
      isCurrentPlayer: true,
    },
  ];

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const gameData = {
    id: gameId,
    title: gameId === "1" ? "Flappy Bird" : "Arcade Game",
    description: "Navigate through obstacles and collect points",
    maxPlayers: 5,
    currentPlayers: 5,
  };

  const [isGameRunning, setIsGameRunning] = useState(true);
  const componentMap = {
    1: FlappyBird,
    2: PongGame,
    3: SpaceInvaders,
  };
  const SelectedGame = componentMap[gameId];
  const onGameOver = (score) => {
    setIsGameRunning(false);
    console.log(score);
  };
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const updateScore = useCallback((newScore) => {
    scoreRef.current = newScore;
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleGameOver = () => {
    navigate(`/gameover`, {
      state: { players: sortedPlayers, score: scoreRef.current, gameId },
    });
  };

  return (
    <div
      className={`min-h-screen bg-arcade-gradient text-white overflow-hidden transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <ParticleBackground />
      {isGameRunning ? <></> : <ScanlineEffect />}

      <div className="container mx-auto py-4 px-4 relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-pink-900/20"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold gradient-text">
              {gameData.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-2 text-pink-400" />
              <span className="text-sm">{formatTime(gameTime)}</span>
            </div>
            <div className="flex items-center bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full">
              <Users className="h-4 w-4 mr-2 text-cyan-400" />
              <span className="text-sm">
                {gameData.currentPlayers}/{gameData.maxPlayers}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-pink-900/20"
              onClick={handleGameOver}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-gray-900/70 backdrop-blur-md rounded-lg border border-pink-500/30 neon-border overflow-hidden">
            <div className="relative aspect-video w-full bg-black/50">
              {
                <div className="absolute inset-0 flex flex-col items-center justify-center h-[fit-content]">
                  {isGameRunning ? (
                    <SelectedGame
                      isGameRunning={isGameRunning}
                      onGameOver={onGameOver}
                      updateScore={updateScore}
                    />
                  ) : (
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      <span className="gradient-text animate-text-flicker">
                        Game Over
                      </span>
                    </h2>
                  )}
                  <div className="mt-4 text-4xl font-bold text-pink-500 animate-pulse">
                    Score - {scoreRef.current}
                  </div>
                </div>
              }
            </div>

            <div className="p-4 border-t border-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">
                    Press Space to Jump / Click to Interact
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-pink-600 text-pink-400 hover:bg-pink-950 button-hover"
                    onClick={handleGameOver}
                  >
                    End Game
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <ScrollReveal>
            <div className="bg-gray-900/70 backdrop-blur-md rounded-lg border border-cyan-500/30 h-full">
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg flex items-center">
                    <Trophy className="h-4 w-4 mr-2 text-yellow-400" />
                    Leaderboard
                  </h3>
                  <span className="text-xs text-gray-400">Live Scores</span>
                </div>
              </div>

              <div className="p-2 max-h-[500px] overflow-y-auto">
                {sortedPlayers.map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center p-2 rounded-md mb-2 ${
                      player.isCurrentPlayer
                        ? "bg-pink-900/30"
                        : "hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="w-6 text-center font-mono text-sm text-gray-400">
                      {index + 1}
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden mx-2">
                      <img
                        src={player.avatar || "/placeholder.svg"}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p
                        className={`text-sm ${
                          player.isCurrentPlayer
                            ? "text-pink-400 font-bold"
                            : "text-white"
                        }`}
                      >
                        {player.name}
                      </p>
                    </div>
                    <div className="font-mono text-right">
                      <p className="text-sm font-bold text-cyan-400">
                        {player.score.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-800">
                <div className="text-center text-xs text-gray-400">
                  <p>Game ID: {gameData.id}</p>
                  <p className="mt-1">
                    Players: {gameData.currentPlayers}/{gameData.maxPlayers}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
