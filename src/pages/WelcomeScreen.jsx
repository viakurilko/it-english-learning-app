import { useState } from "react";
import { useGameStore } from "../store/useGameStore";
import { motion } from "framer-motion";
import { theme } from "../styles/theme";

export default function WelcomeScreen() {
  const [inputValue, setInputValue] = useState("");
  // Використовуємо ТВОЮ функцію registerUser
  const { registerUser } = useGameStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().length >= 2) {
      registerUser(inputValue.trim()); // Записуємо ім'я і міняємо статус
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: theme.colors.background || "#f8fafc",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1 style={{ color: theme.colors.text, marginBottom: "10px" }}>
          Привіт! 👋
        </h1>
        <p
          style={{
            color: theme.colors.textMuted,
            marginBottom: "30px",
            lineHeight: "1.5",
          }}
        >
          Ласкаво просимо до IT English Mastery. Як до тебе звертатися?
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Введи своє ім'я..."
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "10px",
              border: `2px solid ${theme.colors.primary}50`,
              fontSize: "16px",
              marginBottom: "20px",
              outline: "none",
              boxSizing: "border-box",
            }}
            autoFocus
          />
          <button
            type="submit"
            disabled={inputValue.trim().length < 2}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "10px",
              background: theme.colors.primary,
              color: "white",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: inputValue.trim().length < 2 ? "not-allowed" : "pointer",
              opacity: inputValue.trim().length < 2 ? 0.7 : 1,
              transition: "0.2s",
            }}
          >
            Почати навчання
          </button>
        </form>
      </motion.div>
    </div>
  );
}
