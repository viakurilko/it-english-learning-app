import { useGameStore } from "../store/useGameStore";
import { theme } from "../styles/theme";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Star, Zap, Trophy, ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const { score, unlockedAchievements, achievementsList, resetProgress } =
    useGameStore();
  const [selectedBadge, setSelectedBadge] = useState(null);

  const currentLevel = Math.floor(score / 100) + 1;
  const xpInCurrentLevel = score % 100;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      {/* Картка користувача */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "30px",
          background: "white",
          padding: "40px 20px",
          borderRadius: theme.radius.lg,
          boxShadow: theme.shadows.card,
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            {currentLevel}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              background: theme.colors.success,
              color: "white",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid white",
            }}
          >
            <Trophy size={16} />
          </div>
        </div>

        <h1
          style={{
            marginTop: "15px",
            marginBottom: "5px",
            color: theme.colors.text,
          }}
        >
          Veronika
        </h1>
        <p style={{ color: theme.colors.textMuted, fontSize: "14px" }}>
          {score} XP Накопичено
        </p>

        {/* Прогрес-бар рівня */}
        <div style={{ maxWidth: "250px", margin: "15px auto 0" }}>
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "#f1f5f9",
              borderRadius: "10px",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpInCurrentLevel}%` }}
              style={{
                height: "100%",
                background: theme.colors.primary,
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      </header>

      {/* Секція досягнень */}
      <section
        style={{
          background: "white",
          padding: "25px",
          borderRadius: theme.radius.lg,
          boxShadow: theme.shadows.card,
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <ShieldCheck color={theme.colors.primary} size={24} />
          <h3 style={{ margin: 0, fontSize: "20px" }}>Твої Досягнення</h3>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
            gap: "15px",
          }}
        >
          {achievementsList.map((ach) => {
            const isUnlocked = unlockedAchievements.includes(ach.id);
            return (
              <motion.div
                key={ach.id}
                whileHover={isUnlocked ? { y: -3 } : {}}
                onClick={() => isUnlocked && setSelectedBadge(ach)}
                style={{
                  padding: "15px 10px",
                  borderRadius: theme.radius.md,
                  textAlign: "center",
                  background: isUnlocked
                    ? `${theme.colors.primary}05`
                    : "#f8fafc",
                  cursor: isUnlocked ? "pointer" : "not-allowed",
                  border: isUnlocked
                    ? `1px solid ${theme.colors.primary}20`
                    : "1px solid transparent",
                  opacity: isUnlocked ? 1 : 0.6,
                }}
              >
                <Star
                  size={24}
                  color={isUnlocked ? theme.colors.primary : "#cbd5e1"}
                  fill={isUnlocked ? theme.colors.primary : "none"}
                  style={{ marginBottom: "8px" }}
                />
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    color: isUnlocked ? theme.colors.text : "#94a3b8",
                    margin: 0,
                  }}
                >
                  {ach.title}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Кнопка видалення профілю - ТЕПЕР ВИДНА */}
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <button
          onClick={() => {
            if (
              window.confirm(
                "Ви впевнені? Весь прогрес та досягнення будуть видалені назавжди.",
              )
            )
              resetProgress();
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: "rgba(239, 68, 68, 0.1)",
            color: theme.colors.danger,
            border: `1px solid ${theme.colors.danger}30`,
            borderRadius: theme.radius.md,
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "0.2s all",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)")
          }
        >
          <Trash2 size={16} /> Видалити профіль та скинути прогрес
        </button>
      </div>

      {/* Модальне вікно досягнення */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBadge(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "white",
                padding: "30px",
                borderRadius: theme.radius.lg,
                textAlign: "center",
                maxWidth: "320px",
                width: "90%",
              }}
            >
              <Award
                size={48}
                color={theme.colors.primary}
                style={{ marginBottom: "15px" }}
              />
              <h2 style={{ margin: "0 0 10px 0" }}>{selectedBadge.title}</h2>
              <p style={{ color: theme.colors.textMuted, fontSize: "14px" }}>
                {selectedBadge.desc}
              </p>
              <button
                onClick={() => setSelectedBadge(null)}
                style={{
                  marginTop: "25px",
                  width: "100%",
                  padding: "12px",
                  background: theme.colors.primary,
                  color: "white",
                  border: "none",
                  borderRadius: theme.radius.md,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Зрозуміло
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
