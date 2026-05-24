import { useState, useEffect } from "react";
import WelcomeScreen from "./pages/WelcomeScreen";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "./store/useGameStore";
import { theme } from "./styles/theme";
import {
  Zap,
  User,
  Home as HomeIcon,
  BookOpen,
  Target,
  Keyboard as KeyboardIcon,
} from "lucide-react";

import AnimatedBackground from "./components/AnimatedBackground";
import Home from "./pages/home";
import Game from "./pages/game";
import Quiz from "./pages/quiz";
import Spelling from "./pages/spelling";
import Profile from "./pages/profile";

function AppContent() {
  const location = useLocation();
  const { score } = useGameStore();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(1);

  const currentLevel = Math.floor(score / 100) + 1;

  useEffect(() => {
    if (currentLevel > prevLevel) {
      setShowLevelUp(true);
      setPrevLevel(currentLevel);
      const timer = setTimeout(() => setShowLevelUp(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [currentLevel, prevLevel]);

  return (
    <>
      <AnimatedBackground />

      {/* ОНОВЛЕНЕ МОБІЛЬНЕ МЕНЮ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(15px)",
          zIndex: 1000,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
          overflowX: "auto",
          whiteSpace: "nowrap",
          WebkitOverflowScrolling: "touch",
          display: "flex",
          alignItems: "center",
          padding: "8px 15px",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <div style={{ display: "flex", gap: "15px", margin: "0 auto" }}>
          <NavLink
            to="/"
            icon={<HomeIcon size={18} />}
            label="Головна"
            active={location.pathname === "/"}
          />
          <NavLink
            to="/game"
            icon={<BookOpen size={18} />}
            label="Картки"
            active={location.pathname === "/game"}
          />
          <NavLink
            to="/quiz"
            icon={<Target size={18} />}
            label="Вікторина"
            active={location.pathname === "/quiz"}
          />
          <NavLink
            to="/spelling"
            icon={<KeyboardIcon size={18} />}
            label="Правопис"
            active={location.pathname === "/spelling"}
          />
          <NavLink
            to="/profile"
            icon={<User size={18} />}
            label="Профіль"
            active={location.pathname === "/profile"}
          />
        </div>
      </nav>

      <main
        style={{
          paddingTop: "70px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ width: "100%", maxWidth: "1100px", padding: "0 15px" }}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/game"
                element={
                  <PageTransition>
                    <Game />
                  </PageTransition>
                }
              />
              <Route
                path="/quiz"
                element={
                  <PageTransition>
                    <Quiz />
                  </PageTransition>
                }
              />
              <Route
                path="/spelling"
                element={
                  <PageTransition>
                    <Spelling />
                  </PageTransition>
                }
              />
              <Route
                path="/profile"
                element={
                  <PageTransition>
                    <Profile />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </main>

      {/* Компактне сповіщення Level Up */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            style={{
              position: "fixed",
              top: "75px",
              right: "15px",
              background: theme.colors.primary,
              color: "white",
              padding: "10px 15px",
              borderRadius: "12px",
              boxShadow: "0 10px 20px rgba(37, 99, 235, 0.3)",
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              maxWidth: "250px",
            }}
            onClick={() => setShowLevelUp(false)}
          >
            <Zap color="white" fill="white" size={16} />
            <span style={{ fontSize: "13px", fontWeight: "600" }}>
              Рівень {currentLevel} досягнуто!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        nav::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function NavLink({ to, icon, label, active }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: active ? theme.colors.primary : theme.colors.textMuted,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontWeight: "600",
        fontSize: "13px",
        transition: "all 0.3s ease",
        padding: "6px 10px",
        borderRadius: "8px",
        background: active ? `${theme.colors.primary}10` : "transparent",
        flexShrink: 0,
      }}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

// ОНОВЛЕНИЙ БЛОК APP
export default function App() {
  // Дістаємо прапорець реєстрації зі сховища
  const { isRegistered } = useGameStore();

  // Якщо користувач не зареєстрований, показуємо екран привітання
  if (!isRegistered) {
    return <WelcomeScreen />;
  }

  // Якщо зареєстрований — завантажуємо основний застосунок
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
