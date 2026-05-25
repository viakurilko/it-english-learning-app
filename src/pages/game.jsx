import { useState } from "react";
import { useGameStore } from "../store/useGameStore";
import { theme } from "../styles/theme";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ArrowRight, Info, BookOpen } from "lucide-react";

export default function Game() {
  const {
    selectedLevel,
    getAvailableWords,
    currentWordIndex,
    isFinished,
    nextWord,
    restartGame,
  } = useGameStore();
  const [isFlipped, setIsFlipped] = useState(false);

  const words = getAvailableWords();
  const currentWord = words[currentWordIndex];

  if (isFinished) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2
          style={{
            fontSize: "42px",
            color: theme.colors.text,
            marginBottom: "20px",
          }}
        >
          Модуль завершено!
        </h2>
        <p style={{ color: theme.colors.textMuted, marginBottom: "40px" }}>
          Ви успішно ознайомилися з усіма термінами Модуля {selectedLevel}.
        </p>
        <button
          onClick={restartGame}
          style={{
            padding: "15px 40px",
            background: theme.colors.primary,
            color: "white",
            border: "none",
            borderRadius: theme.radius.md,
            fontWeight: "700",
            boxShadow: theme.shadows.button,
            cursor: "pointer",
          }}
        >
          Повторити спочатку
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: `${theme.colors.primary}15`,
            color: theme.colors.primary,
            padding: "8px 20px",
            borderRadius: "20px",
            fontWeight: "700",
            fontSize: "14px",
          }}
        >
          <BookOpen size={16} /> ТЕОРІЯ: MODULE {selectedLevel}
        </span>
        <h2 style={{ marginTop: "20px", color: theme.colors.textMuted }}>
          СЛОВО {currentWordIndex + 1} / {words.length}
        </h2>
      </div>

      <div
        style={{
          perspective: "1000px",
          display: "flex",
          justifyContent: "center",
          marginBottom: "60px",
        }}
      >
        <motion.div
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "350px",
            position: "relative",
            transformStyle: "preserve-3d",
            cursor: "pointer",
          }}
        >
          {/* Передня сторона (English) */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              background: "white",
              borderRadius: theme.radius.lg,
              boxShadow: theme.shadows.card,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              boxSizing: "border-box",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <h1
              style={{
                fontSize: "44px",
                color: theme.colors.primary,
                margin: 0,
                textAlign: "center",
                lineHeight: "1.2",
              }}
            >
              {currentWord.en}
            </h1>
          </div>

          {/* Задня сторона (Українська) */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              background: theme.colors.primary,
              borderRadius: theme.radius.lg,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              boxSizing: "border-box",
              transform: "rotateY(180deg)",
              boxShadow: theme.shadows.card,
            }}
          >
            <h1
              style={{
                fontSize: "44px",
                margin: 0,
                textAlign: "center",
                lineHeight: "1.2",
              }}
            >
              {currentWord.ua}
            </h1>
          </div>
        </motion.div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button
          onClick={() => {
            setIsFlipped(false);
            nextWord();
          }}
          style={{
            padding: "18px 45px",
            background: "white",
            color: theme.colors.text,
            borderRadius: theme.radius.md,
            border: "none",
            fontWeight: "700",
            boxShadow: theme.shadows.button,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          Наступне слово <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
