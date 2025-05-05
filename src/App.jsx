import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import Game from "./pages/game";
import GameOverPage from "./pages/GameOver";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<Game />} />
          <Route path="/gameover" element={<GameOverPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
