"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Trophy, Home, RotateCw, Medal, Star, Share2 } from "lucide-react";
import { Button } from "../components/ui/button";
import ParticleBackground from "../components/particle-background";
import ScanlineEffect from "../components/scanline-effect";
import ScrollReveal from "../components/scroll-reveal";
import GlitchText from "../components/glitch-text";

export default function GameOverPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  // Get players data from location state or use default data
  const players = location.state?.players || [
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
      score: 2100,
      avatar: "https://i.pravatar.cc/40?img=5",
      isCurrentPlayer: true,
    },
  ];

  // Sort players by score
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // Find current player's position
  const currentPlayerIndex = sortedPlayers.findIndex((p) => p.isCurrentPlayer);
  const currentPlayerRank = currentPlayerIndex + 1;

  // Game data
  const gameData = {
    id: gameId,
    title: gameId === "flappy-bird" ? "Flappy Bird" : "Arcade Game",
  };

  useEffect(() => {
    setIsLoaded(true);

    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Handle play again
  const handlePlayAgain = () => {
    navigate(`/game/${gameId}`);
  };

  // Handle go to lobby
  const handleGoToLobby = () => {
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen bg-arcade-gradient text-white overflow-hidden transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <ParticleBackground />
      <ScanlineEffect />

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <GlitchText text="Game Over" />
            </h1>
            <p className="text-xl text-gray-300">{gameData.title}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Player Stats */}
          <ScrollReveal delay={200} className="md:col-span-1">
            <div className="bg-gray-900/70 backdrop-blur-md rounded-lg border border-pink-500/30 p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-pink-500 shadow-lg shadow-pink-500/20">
                  <img
                    src={
                      sortedPlayers.find((p) => p.isCurrentPlayer)?.avatar ||
                      "https://i.pravatar.cc/80?img=5"
                    }
                    alt="Your Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-pink-400">
                  {sortedPlayers.find((p) => p.isCurrentPlayer)?.name || "You"}
                </h2>
                <div className="flex items-center justify-center mt-1">
                  <Medal className="h-4 w-4 mr-1 text-yellow-400" />
                  <span className="text-sm text-gray-300">
                    Rank #{currentPlayerRank}
                  </span>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-1">Your Score</p>
                  <p className="text-3xl font-bold text-cyan-400">
                    {sortedPlayers
                      .find((p) => p.isCurrentPlayer)
                      ?.score.toLocaleString() || "0"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <Star className="h-4 w-4 mx-auto mb-1 text-yellow-400" />
                  <p className="text-xs text-gray-400">Best Score</p>
                  <p className="text-sm font-bold">3,200</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <Trophy className="h-4 w-4 mx-auto mb-1 text-yellow-400" />
                  <p className="text-xs text-gray-400">Games Played</p>
                  <p className="text-sm font-bold">12</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Leaderboard */}
          <ScrollReveal delay={400} className="md:col-span-2">
            <div className="bg-gray-900/70 backdrop-blur-md rounded-lg border border-cyan-500/30">
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg flex items-center">
                    <Trophy className="h-4 w-4 mr-2 text-yellow-400" />
                    Final Leaderboard
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                {sortedPlayers.map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center p-3 rounded-md mb-2 ${
                      player.isCurrentPlayer
                        ? "bg-pink-900/30"
                        : index < 3
                        ? "bg-gray-800/30"
                        : ""
                    }`}
                  >
                    <div className="w-8 text-center">
                      {index === 0 ? (
                        <span className="text-yellow-400 text-xl">🥇</span>
                      ) : index === 1 ? (
                        <span className="text-gray-300 text-xl">🥈</span>
                      ) : index === 2 ? (
                        <span className="text-amber-700 text-xl">🥉</span>
                      ) : (
                        <span className="font-mono text-gray-400">
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-full overflow-hidden mx-3">
                      <img
                        src={player.avatar || "/placeholder.svg"}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p
                        className={`${
                          player.isCurrentPlayer
                            ? "text-pink-400 font-bold"
                            : "text-white"
                        }`}
                      >
                        {player.name}
                      </p>
                    </div>
                    <div className="font-mono text-right">
                      <p className="font-bold text-cyan-400">
                        {player.score.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 bg-gradient-pink-to-purple button-hover py-6"
                onClick={handlePlayAgain}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <RotateCw className="mr-2 h-5 w-5" />
                  Play Again
                </span>
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-cyan-600 text-cyan-400 hover:bg-cyan-950/20 button-hover py-6"
                onClick={handleGoToLobby}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Lobby
                </span>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
