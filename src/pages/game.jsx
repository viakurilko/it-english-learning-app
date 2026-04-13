import { useState } from "react";
import { useGameStore } from "../store/useGameStore";
import { theme } from "../styles/theme";
import { motion } from "framer-motion";
import { RefreshCw, ArrowRight, BookOpen } from "lucide-react";

export default function Game() {
  const { getAvailableWords, selectedLevel } = useGameStore();
  const words = getAvailableWords();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 150);
  };

  const word = words[currentIndex];

  if (!word) return null;

  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          marginBottom: "25px",
          background: "white",
          padding: "6px 15px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "bold",
          color: theme.colors.textMuted,
          boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <BookOpen size={14} /> КАРТКА {currentIndex + 1} З {words.length} •
        LEVEL {selectedLevel}
      </div>

      <div
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          perspective: "1000px",
          width: "100%",
          maxWidth: "340px",
          height: "380px",
          cursor: "pointer",
        }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front */}
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
              padding: "30px",
              textAlign: "center",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "38px",
                color: theme.colors.primary,
                margin: 0,
                wordBreak: "break-word",
              }}
            >
              {word.en}
            </h2>
            <div
              style={{
                position: "absolute",
                bottom: "25px",
                color: theme.colors.textMuted,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                fontWeight: "500",
              }}
            >
              <RefreshCw size={16} /> Натисни, щоб перевернути
            </div>
          </div>

          {/* Back */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              color: "white",
              borderRadius: theme.radius.lg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotateY(180deg)",
              padding: "30px",
              textAlign: "center",
              boxShadow: theme.shadows.card,
            }}
          >
            <h2 style={{ fontSize: "32px", margin: 0, fontWeight: "600" }}>
              {word.ua}
            </h2>
          </div>
        </motion.div>
      </div>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={nextCard}
        style={{
          marginTop: "40px",
          padding: "18px 50px",
          background: theme.colors.text,
          border: "none",
          borderRadius: "35px",
          boxShadow: theme.shadows.button,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "white",
          fontSize: "16px",
        }}
      >
        Наступна <ArrowRight size={20} />
      </motion.button>
    </div>
  );
}
