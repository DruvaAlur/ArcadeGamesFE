"use client";

import { useState } from "react";
import { Star, Trophy, Users, Clock, Gamepad2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import useIsMobile from "@/hooks/useIsMobile";

export default function RotatingCard({ game, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <div
     className="perspective-1000 w-full h-[400px]"
     onMouseEnter={() => !isMobile && setIsHovered(true)}
     onMouseLeave={() => !isMobile && setIsHovered(false)}
     onClick={() => isMobile && setIsHovered((prev) => !prev)}
     style={{ animationDelay: `${index * 0.1}s` }}
   >
      <div
        className={`relative w-full h-full transition-all duration-500 preserve-3d ${
          isHovered ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden game-card-hover group h-full">
            <div className="relative">
              <img
                src={game.image || "/placeholder.svg"}
                alt={game.title}
                className="object-fill w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              {game.popular && (
                <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full flex items-center animate-pulse-glow z-10">
                  <Trophy className="h-3 w-3 mr-1" />
                  Popular
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-bold group-hover:text-pink-400 transition-colors">
                  {game.title}
                </h4>
                <div className="flex items-center text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm">{game.rating}</span>
                </div>
              </div>
              {/* <p className="text-gray-400 text-sm mb-3">{game.description}</p> */}
              <div className="flex justify-between items-center text-xs text-gray-400">
                <Badge
                  variant="outline"
                  className="border-cyan-700 text-cyan-400 group-hover:border-cyan-500 group-hover:text-cyan-300 transition-colors"
                >
                  {game.category}
                </Badge>
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {game.players}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {game.releaseYear}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4 absolute bottom-0 w-full">
              <div className="text-center text-xs text-gray-400 mb-2">
                {isMobile?'Click to see details':'Hover to see details'}
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="bg-gray-800/90 backdrop-blur-md rounded-lg overflow-hidden h-full p-6 flex flex-col border border-pink-500/30 neon-border">
            <h4 className="text-2xl font-bold text-pink-400 mb-4">
              {game.title}
            </h4>

            <div className="space-y-4 flex-grow">
              <div>
                <h5 className="text-sm font-semibold text-gray-300 mb-1">
                  Description
                </h5>
                <p className="text-gray-400 text-sm">{game.description}</p>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-gray-300 mb-1">
                  Features
                </h5>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-pink-400 rounded-full mr-2"></div>
                    Multiplayer support for {game.players} players
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-pink-400 rounded-full mr-2"></div>
                    HD Graphics with ray tracing
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-pink-400 rounded-full mr-2"></div>
                    Online leaderboards
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-pink-400 rounded-full mr-2"></div>
                    Custom character creation
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <h5 className="text-xs font-semibold text-gray-300">
                    Rating
                  </h5>
                  <div className="flex items-center text-yellow-400">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(game.rating) ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    <span className="ml-1 text-xs">{game.rating}/5</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-gray-300">
                    Release
                  </h5>
                  <p className="text-gray-400 text-xs">{game.releaseYear}</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button
                className="w-full bg-gradient-pink-to-purple button-hover"
                onClick={() => navigate("/game", { state: game.id })}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Gamepad2 className="mr-2 h-4 w-4" />
                  Play Now
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
