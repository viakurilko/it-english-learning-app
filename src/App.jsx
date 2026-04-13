import { useState, useEffect } from "react";
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

// Імпорт сторінок
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

  // Розрахунок рівня на основі XP
  const currentLevel = Math.floor(score / 100) + 1;

  // Слідкуємо за підвищенням рівня
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

      {/* Навігаційна панель із усіма вкладками */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          padding: "12px 0",
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(12px)",
          zIndex: 1000,
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "25px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
        }}
      >
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

        {/* Роздільник */}
        <div
          style={{
            width: "1px",
            height: "20px",
            background: "#e2e8f0",
            margin: "0 5px",
          }}
        />

        <NavLink
          to="/profile"
          icon={<User size={18} />}
          label="Профіль"
          active={location.pathname === "/profile"}
        />
      </nav>

      {/* Основний контент */}
      <main
        style={{
          paddingTop: "80px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ width: "100%", maxWidth: "1100px", padding: "0 20px" }}>
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

      {/* Компактне сповіщення Level Up у верхньому правому кутку */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            style={{
              position: "fixed",
              top: "80px",
              right: "25px",
              background: theme.colors.primary,
              color: "white",
              padding: "12px 20px",
              borderRadius: "16px",
              boxShadow: "0 15px 30px rgba(37, 99, 235, 0.3)",
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
            }}
            onClick={() => setShowLevelUp(false)}
          >
            <div
              style={{
                background: "white",
                borderRadius: "10px",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap
                color={theme.colors.primary}
                fill={theme.colors.primary}
                size={18}
              />
            </div>
            <div style={{ paddingRight: "10px" }}>
              <h4 style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>
                НОВИЙ РІВЕНЬ!
              </h4>
              <p style={{ margin: 0, opacity: 0.9, fontSize: "12px" }}>
                Рівень {currentLevel} досягнуто
              </p>
            </div>
            <span style={{ fontSize: "14px", opacity: 0.6 }}>✕</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Плавний перехід сторінок
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Стилізоване посилання навігації
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
        fontSize: "14px",
        transition: "all 0.3s ease",
        padding: "8px 12px",
        borderRadius: "10px",
        background: active ? `${theme.colors.primary}10` : "transparent",
      }}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
