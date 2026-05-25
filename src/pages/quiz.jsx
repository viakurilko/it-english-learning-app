import { useState, useEffect } from "react";
import { useGameStore } from "../store/useGameStore";
import { theme } from "../styles/theme";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, Target, HelpCircle } from "lucide-react";

export default function Quiz() {
  const {
    getAvailableWords,
    score,
    increaseScore,
    selectedLevel,
    completeModule,
  } = useGameStore();
  const [quizWords, setQuizWords] = useState([]); // Відсортована черга слів
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  // Створюємо чергу слів один раз
  const startModule = () => {
    const available = getAvailableWords();
    setQuizWords([...available].sort(() => 0.5 - Math.random()));
    setCurrentIndex(0);
    setIsFinished(false);
  };

  useEffect(() => {
    startModule();
  }, [selectedLevel]);

  // Генеруємо варіанти відповідей для поточного слова в черзі
  useEffect(() => {
    if (quizWords.length === 0) return;

    if (currentIndex >= quizWords.length) {
      completeModule(selectedLevel); // ДОДАНО ОСЬ ЦЕЙ РЯДОК!
      setIsFinished(true);
      return;
    }

    const correctWord = quizWords[currentIndex];
    const availableWords = getAvailableWords();
    // ... решта коду без змін

    const correctWord = quizWords[currentIndex];
    const availableWords = getAvailableWords();
    const otherWords = availableWords.filter((w) => w.id !== correctWord.id);
    const shuffledOthers = [...otherWords].sort(() => 0.5 - Math.random());
    const wrongOptions = shuffledOthers.slice(0, 3);
    const allOptions = [...wrongOptions, correctWord].sort(
      () => 0.5 - Math.random(),
    );

    setCurrentQuestion({ target: correctWord, options: allOptions });
    setFeedback("");
    setIsAnswered(false);
    setSelectedId(null);
  }, [quizWords, currentIndex, selectedLevel]);

  const handleAnswer = (option) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedId(option.id);

    if (option.id === currentQuestion.target.id) {
      increaseScore();
      setFeedback("correct");
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: [theme.colors.primary, theme.colors.success],
      });
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 1500);
    } else {
      setFeedback("wrong");
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 2500);
    }
  };

  // ЕКРАН ЗАВЕРШЕННЯ
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
          Вікторину завершено!
        </h2>
        <p
          style={{
            color: theme.colors.textMuted,
            marginBottom: "40px",
            fontSize: "18px",
          }}
        >
          Ви перевірили свої знання всіх термінів Модуля {selectedLevel}.
        </p>
        <button
          onClick={startModule}
          style={{
            padding: "15px 40px",
            background: theme.colors.primary,
            color: "white",
            border: "none",
            borderRadius: theme.radius.md,
            fontWeight: "700",
            boxShadow: theme.shadows.button,
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Пройти тест ще раз
        </button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div style={{ maxWidth: "750px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "30px",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: `${theme.colors.primary}10`,
              color: theme.colors.primary,
              padding: "5px 12px",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "12px",
              marginBottom: "8px",
            }}
          >
            <Target size={14} /> MODULE {selectedLevel}
          </div>
          <h2 style={{ margin: 0, fontSize: "28px", color: theme.colors.text }}>
            Обери переклад
          </h2>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: theme.colors.textMuted,
              marginBottom: "4px",
            }}
          >
            СЛОВО {currentIndex + 1} / {quizWords.length}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: theme.colors.primary,
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            <Trophy size={20} /> {score} XP
          </div>
        </div>
      </div>

      <motion.div
        key={currentQuestion.target.en}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          background: "white",
          padding: "40px 20px",
          borderRadius: theme.radius.lg,
          boxShadow: theme.shadows.card,
          border: "1px solid rgba(0,0,0,0.05)",
          textAlign: "center",
          marginBottom: "30px",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            margin: 0,
            color: theme.colors.text,
            letterSpacing: "-1px",
          }}
        >
          {currentQuestion.target.en}
        </h1>
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                bottom: "10px",
                left: 0,
                right: 0,
                color:
                  feedback === "correct"
                    ? theme.colors.success
                    : theme.colors.danger,
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              {feedback === "correct"
                ? "✨ Правильно!"
                : `❌ Правильно: ${currentQuestion.target.ua}`}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}
      >
        {currentQuestion.options.map((option) => {
          const isCorrect =
            isAnswered && option.id === currentQuestion.target.id;
          const isWrong =
            isAnswered &&
            selectedId === option.id &&
            option.id !== currentQuestion.target.id;

          return (
            <motion.button
              key={option.id}
              whileHover={
                !isAnswered ? { y: -3, boxShadow: theme.shadows.button } : {}
              }
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              style={{
                padding: "20px 15px",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: theme.radius.md,
                border: "none",
                cursor: isAnswered ? "default" : "pointer",
                transition: "0.2s all",
                background: isCorrect
                  ? theme.colors.success
                  : isWrong
                    ? theme.colors.danger
                    : "white",
                color:
                  isAnswered && (isCorrect || isWrong)
                    ? "white"
                    : theme.colors.text,
                boxShadow: isAnswered ? "none" : theme.shadows.button,
                border: isAnswered ? "none" : "1px solid rgba(0,0,0,0.02)",
              }}
            >
              {option.ua}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
