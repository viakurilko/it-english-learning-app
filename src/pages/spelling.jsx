import { useState, useEffect } from "react";
import { useGameStore } from "../store/useGameStore";
import { theme } from "../styles/theme";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function Spelling() {
  const { getAvailableWords, score, increaseScore, selectedLevel } =
    useGameStore();
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle, success, error

  useEffect(() => {
    const available = getAvailableWords();
    setWords(available.sort(() => 0.5 - Math.random()));
    setCurrentIndex(0);
    setUserInput("");
    setStatus("idle");
  }, [selectedLevel]);

  const currentWord = words[currentIndex];

  // Лише оновлює текст, без автоматичного перемикання
  const handleInputChange = (e) => {
    if (status === "success") return; // Блокуємо зміну після правильної відповіді
    setUserInput(e.target.value);
    if (status === "error") setStatus("idle"); // Скидаємо статус помилки, якщо користувач почав виправляти
  };

  // Функція, яка спрацьовує при натисканні на кнопку
  const handleSubmit = (e) => {
    e.preventDefault();

    // Якщо слово вже вгадане, кнопка працює як "Наступне слово"
    if (status === "success") {
      nextWord();
      return;
    }

    if (!userInput.trim()) return;

    const target = currentWord.en.toLowerCase();
    const input = userInput.trim().toLowerCase();

    // Перевіряємо правильність
    if (input === target) {
      setStatus("success");
      increaseScore();
      confetti({
        particleCount: 60,
        spread: 45,
        origin: { y: 0.7 },
        colors: [theme.colors.secondary, theme.colors.success],
      });
    } else {
      // Якщо є помилки, просто показуємо статус помилки на кнопці
      setStatus("error");
    }
  };

  const nextWord = () => {
    setStatus("idle");
    setUserInput("");
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Починаємо спочатку, якщо слова закінчились
    }
  };

  if (!currentWord) return null;

  const targetChars = currentWord.en.split("");
  const userChars = userInput.split("");
  const displayLength = Math.max(targetChars.length, userChars.length);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
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
          <Keyboard size={16} /> SPELLING: MODULE {selectedLevel}
        </div>
        <h1 style={{ fontSize: "32px", color: theme.colors.text, margin: 0 }}>
          Надрукуй термін
        </h1>
      </header>

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

        {/* Панель підсвічування літер в реальному часі */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          {Array.from({ length: displayLength }).map((_, i) => {
            const tChar = targetChars[i];
            const uChar = userChars[i];

            let borderColor = "#e2e8f0";
            let textColor = "#94a3b8";
            let bgColor = "transparent";

            if (uChar) {
              if (!tChar) {
                borderColor = theme.colors.danger;
                textColor = theme.colors.danger;
                bgColor = `${theme.colors.danger}15`;
              } else if (uChar.toLowerCase() === tChar.toLowerCase()) {
                borderColor = theme.colors.success;
                textColor = theme.colors.success;
                bgColor = `${theme.colors.success}15`;
              } else {
                borderColor = theme.colors.danger;
                textColor = theme.colors.danger;
                bgColor = `${theme.colors.danger}15`;
              }
            }

            return (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                style={{
                  width: "45px",
                  height: "55px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  textTransform: "lowercase",
                  borderBottom: `4px solid ${borderColor}`,
                  color: textColor,
                  background: bgColor,
                  borderRadius: "6px 6px 0 0",
                  transition: "0.2s all",
                }}
              >
                {uChar || "_"}
              </motion.div>
            );
          })}
        </div>

        {/* Форма з полем вводу та кнопкою */}
        <form
          onSubmit={handleSubmit}
          style={{ position: "relative", maxWidth: "400px", margin: "0 auto" }}
        >
          <input
            autoFocus
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Почни вводити слово..."
            disabled={status === "success"}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "18px",
              textAlign: "center",
              borderRadius: theme.radius.md,
              border: `2px solid ${
                status === "success"
                  ? theme.colors.success
                  : status === "error"
                    ? theme.colors.danger
                    : "#e2e8f0"
              }`,
              background:
                status === "success" ? `${theme.colors.success}10` : "#f8fafc",
              outline: "none",
              transition: "0.2s all",
              boxSizing: "border-box",
              marginBottom: "20px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px 40px",
              background:
                status === "success"
                  ? theme.colors.success
                  : status === "error"
                    ? theme.colors.danger
                    : theme.colors.secondary,
              color: "white",
              border: "none",
              borderRadius: theme.radius.md,
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: theme.shadows.button,
              transition: "0.2s all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {status === "success" ? (
              <>
                <CheckCircle2 size={20} /> Наступне слово
              </>
            ) : status === "error" ? (
              "Є помилки, виправ!"
            ) : (
              "Перевірити"
            )}
          </button>
        </form>
      </motion.div>

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
