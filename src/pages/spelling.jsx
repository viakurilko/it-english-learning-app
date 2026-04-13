import { useState, useEffect } from "react";
import { useGameStore } from "../store/useGameStore";
import { theme } from "../styles/theme";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, CheckCircle2, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

export default function Spelling() {
  const { getAvailableWords, score, increaseScore, selectedLevel } =
    useGameStore();
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle, success, error
  const [resultMap, setResultMap] = useState([]);

  useEffect(() => {
    const available = getAvailableWords();
    setWords(available.sort(() => 0.5 - Math.random()));
    setCurrentIndex(0);
    setUserInput("");
    setStatus("idle");
    setResultMap([]);
  }, [selectedLevel]);

  const currentWord = words[currentIndex];

  const checkAnswer = (e) => {
    e.preventDefault();
    if (status !== "idle" || !userInput.trim()) return;

    const target = currentWord.en.toLowerCase();
    const input = userInput.trim().toLowerCase();

    if (input === target) {
      setStatus("success");
      increaseScore();
      confetti({
        particleCount: 60,
        spread: 45,
        origin: { y: 0.7 },
        colors: [theme.colors.secondary, theme.colors.success],
      });
      setTimeout(nextWord, 1500);
    } else {
      const map = target.split("").map((char, index) => ({
        char,
        isCorrect: input[index] === char,
      }));
      setResultMap(map);
      setStatus("error");

      setTimeout(() => {
        setStatus("idle");
        setUserInput("");
        setResultMap([]);
      }, 3000);
    }
  };

  const nextWord = () => {
    setStatus("idle");
    setUserInput("");
    setResultMap([]);
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  if (!currentWord) return null;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      {/* Шапка модуля - зроблена компактнішою */}
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: `${theme.colors.secondary}15`,
            color: theme.colors.secondary,
            padding: "6px 16px",
            borderRadius: "20px",
            fontWeight: "bold",
            fontSize: "13px",
            marginBottom: "15px",
          }}
        >
          <Keyboard size={16} /> SPELLING: LEVEL {selectedLevel}
        </div>
        <h1 style={{ fontSize: "32px", color: theme.colors.text, margin: 0 }}>
          Надрукуй термін
        </h1>
      </header>

      {/* Основна картка - зменшена (компактна версія) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          background: "white",
          padding: "40px 30px",
          borderRadius: theme.radius.lg,
          boxShadow: theme.shadows.card,
          border: "1px solid rgba(0,0,0,0.05)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: theme.colors.textMuted,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            fontSize: "11px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          ПЕРЕКЛАД:
        </p>
        <h2
          style={{
            fontSize: "42px",
            color: theme.colors.secondary,
            marginBottom: "30px",
            marginTop: 0,
          }}
        >
          {currentWord.ua}
        </h2>

        {/* Панель підсвічування помилок */}
        <div
          style={{
            height: "50px",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "center",
            gap: "3px",
          }}
        >
          <AnimatePresence>
            {status === "error" &&
              resultMap.map((item, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    color: item.isCorrect
                      ? theme.colors.success
                      : theme.colors.danger,
                    borderBottom: `2px solid ${item.isCorrect ? theme.colors.success : theme.colors.danger}`,
                    padding: "0 2px",
                    minWidth: "16px",
                  }}
                >
                  {item.char}
                </motion.span>
              ))}
          </AnimatePresence>
        </div>

        <form
          onSubmit={checkAnswer}
          style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}
        >
          <input
            autoFocus
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Пиши тут..."
            disabled={status !== "idle"}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "20px",
              textAlign: "center",
              borderRadius: theme.radius.md,
              border: `2px solid ${status === "error" ? theme.colors.danger : "#e2e8f0"}`,
              background: "#f8fafc",
              fontFamily: "monospace",
              outline: "none",
              transition: "0.2s all",
            }}
          />

          <button
            type="submit"
            disabled={status !== "idle"}
            style={{
              marginTop: "25px",
              padding: "14px 40px",
              background: theme.colors.secondary,
              color: "white",
              border: "none",
              borderRadius: theme.radius.md,
              fontSize: "16px",
              fontWeight: "bold",
              cursor: status === "idle" ? "pointer" : "default",
              boxShadow: theme.shadows.button,
              opacity: status !== "idle" ? 0.7 : 1,
            }}
          >
            {status === "success"
              ? "Правильно!"
              : status === "error"
                ? "Упс..."
                : "Перевірити"}
          </button>
        </form>
      </motion.div>

      {/* Компактний прогрес */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <p
          style={{
            margin: 0,
            color: theme.colors.textMuted,
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          ПРОГРЕС: {currentIndex + 1} / {words.length}
        </p>
      </div>
    </div>
  );
}
