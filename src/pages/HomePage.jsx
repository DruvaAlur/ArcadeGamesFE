"use client";

import { useState, useEffect } from "react";
import { Trophy, ArrowRight, Zap } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import ParticleBackground from "../components/particle-background";
import ScanlineEffect from "../components/scanline-effect";
import GlitchText from "../components/glitch-text";
import ScrollReveal from "../components/scroll-reveal";
import RotatingCard from "../components/rotating-card";
import Header from "../components/header";
import Footer from "../components/footer";
import AnimatedBackground from "../components/animated-background";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const games = [
    {
      id: 1,
      title: "Flappy Bird",
      description:
        "Navigate a bird through pipes without touching them in this addictive arcade classic",
      image: "/flappybird.png",
      category: "Arcade",
      rating: 4.9,
      players: "1",
      releaseYear: 2013,
      popular: true,
    },
    {
      id: 2,
      title: "Pixel Fighters",
      description: "Classic 2D fighting game with retro pixel art style",
      image: "https://placehold.co/500x300/111827/FFFFFF?text=Pixel+Fighters",
      category: "Fighting",
      rating: 4.5,
      players: "1-2",
      releaseYear: 2022,
      popular: true,
    },
    {
      id: 3,
      title: "Cosmic Invaders",
      description: "Defend Earth from waves of alien invaders",
      image: "https://placehold.co/500x300/111827/FFFFFF?text=Cosmic+Invaders",
      category: "Shooter",
      rating: 4.3,
      players: "1",
      releaseYear: 2023,
      popular: false,
    },
    {
      id: 4,
      title: "Dungeon Crawler",
      description:
        "Explore procedurally generated dungeons filled with monsters",
      image: "https://placehold.co/500x300/111827/FFFFFF?text=Dungeon+Crawler",
      category: "RPG",
      rating: 4.7,
      players: "1-2",
      releaseYear: 2022,
      popular: false,
    },
    {
      id: 5,
      title: "Beat Master",
      description: "Rhythm game with an extensive library of songs",
      image: "https://placehold.co/500x300/111827/FFFFFF?text=Beat+Master",
      category: "Rhythm",
      rating: 4.6,
      players: "1-4",
      releaseYear: 2023,
      popular: true,
    },
    {
      id: 6,
      title: "Puzzle Quest",
      description: "Brain-teasing puzzles with increasing difficulty",
      image: "https://placehold.co/500x300/111827/FFFFFF?text=Puzzle+Quest",
      category: "Puzzle",
      rating: 4.4,
      players: "1",
      releaseYear: 2022,
      popular: false,
    },
  ];

  return (
    <div
      className={`min-h-screen bg-arcade-gradient text-white overflow-hidden transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <ParticleBackground />
      <AnimatedBackground />
      <ScanlineEffect />

      {/* Floating Icons Background */}
      <div className="floating-icons">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="floating-icon text-pink-500/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 100 + 50}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              "--tx": `${(Math.random() - 0.5) * 100}px`,
              "--ty": `${(Math.random() - 0.5) * 100}px`,
              "--tr": `${(Math.random() - 0.5) * 30}deg`,
            }}
          >
            {i % 3 === 0 ? "🎮" : i % 3 === 1 ? "🕹️" : "👾"}
          </div>
        ))}
      </div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto py-12 px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <ScrollReveal className="space-y-6" delay={300}>
            <Badge className="bg-pink-700 hover:bg-pink-800 text-white px-3 py-1 animate-pulse-glow">
              New Collection
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Modern Arcade <br />
              <span className="gradient-text animate-text-flicker">
                Gaming Experience
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-md">
              Dive into our collection of modern arcade games designed to bring
              back the nostalgia with a contemporary twist.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-pink-to-purple button-hover">
                <span className="relative z-10 flex items-center">
                  Browse Games
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
              <Button
                variant="outline"
                className="border-pink-600 text-pink-400 hover:bg-pink-950 button-hover"
              >
                <span className="relative z-10 flex items-center">
                  <Trophy className="mr-2 h-4 w-4" />
                  Top Rated
                </span>
              </Button>
            </div>
          </ScrollReveal>
          <div className="relative animate-float">
            <div className="absolute -inset-0.5 bg-gradient-pink-to-cyan rounded-lg blur opacity-75 animate-pulse-glow"></div>
            <div className="relative">
              <img
                src="https://placehold.co/600x400/111827/FFFFFF?text=Featured+Game"
                alt="Featured Arcade Game"
                className="rounded-lg object-cover w-full h-auto shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-pink-600 text-white p-3 rounded-full shadow-lg animate-bounce">
              <Zap className="h-6 w-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee of game logos */}
      <div className="relative overflow-hidden py-4 bg-gray-800/30 backdrop-blur-sm">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-8">
              <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                <span className="text-pink-400">
                  {i % 3 === 0 ? "🎮" : i % 3 === 1 ? "🕹️" : "👾"}
                </span>
              </div>
              <span className="ml-2 text-gray-400 font-mono">
                RETRO-{i + 1}00
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Games */}
      <section className="container mx-auto py-16 px-4 relative z-10">
        <ScrollReveal>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold neon-text">
              <GlitchText text="Featured Games" />
            </h3>
            <a
              href="#"
              className="text-pink-400 hover:text-pink-300 flex items-center group"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <ScrollReveal key={game.id} delay={index * 100}>
              <RotatingCard game={game} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto py-16 px-4 relative z-10">
        <ScrollReveal>
          <h3 className="text-2xl md:text-3xl font-bold mb-8 neon-text">
            Game Categories
          </h3>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {["Racing", "Fighting", "Shooter", "RPG", "Rhythm", "Puzzle"].map(
            (category, index) => (
              <ScrollReveal key={category} delay={index * 100}>
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-gray-700 transition-all cursor-pointer border-b-2 border-pink-500 hover:border-cyan-400 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(219,39,119,0.3)]">
                  <h4 className="font-medium">{category}</h4>
                </div>
              </ScrollReveal>
            )
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 px-4 relative z-10">
        <ScrollReveal>
          <div className="bg-gradient-purple-to-pink backdrop-blur-sm rounded-xl p-8 md:p-12 border border-pink-500/30 neon-border animate-pulse-glow">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold animate-text-flicker">
                Ready to Play?
              </h3>
              <p className="text-gray-300">
                Sign up now to track your scores, compete with friends, and
                unlock exclusive games.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-purple-900 hover:bg-gray-100 button-hover">
                  <span className="relative z-10">Create Account</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 button-hover"
                >
                  <span className="relative z-10">Learn More</span>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
