"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="container mx-auto py-6 px-4 relative z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 animate-pulse-glow">
            <img
              src="https://placehold.co/40x40/111827/FFFFFF?text=RA"
              alt="RetroArcade Logo"
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold gradient-text group-hover:animate-text-flicker transition-all duration-300">
            RetroArcade
          </h1>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:bg-gray-800"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-6">
          {["Home", "Games", "Leaderboards", "About"].map((item, index) => (
            <a
              key={item}
              href="#"
              className="hover:text-pink-400 transition-colors relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-pink-to-cyan transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Sign in button (desktop) */}
        <div className="hidden md:block">
          <Button className="bg-pink-600 hover:bg-pink-700 button-hover relative overflow-hidden">
            <span className="relative z-10">Sign In</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md p-4 border-t border-gray-800 z-50 animate-in slide-in-from-top">
          <nav className="flex flex-col space-y-4">
            {["Home", "Games", "Leaderboards", "About"].map((item) => (
              <a
                key={item}
                href="#"
                className="py-2 px-4 hover:bg-gray-800 rounded-md"
              >
                {item}
              </a>
            ))}
            <Button className="bg-pink-600 hover:bg-pink-700 w-full mt-2">
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
