import { useGameStore } from "../store/useGameStore";
import { theme } from "../styles/theme";
import { motion } from "framer-motion";
import { BookOpen, Keyboard, Target, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const { playerName, getMaxLevel, selectedLevel, setSelectedLevel } =
    useGameStore();
  const maxLevel = getMaxLevel();

  return (
    <div style={{ padding: "40px 20px" }}>
      <header style={{ textAlign: "center", marginBottom: "60px" }}>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            fontSize: "48px",
            color: theme.colors.text,
            marginBottom: "10px",
          }}
        >
          Майстерня IT-Англійської
        </motion.h1>
        <p style={{ fontSize: "18px", color: theme.colors.textMuted }}>
          Твій персональний шлях від Junior до CTO через мовну практику
        </p>
      </header>

      {/* Секція вибору рівня */}
      <section style={{ marginBottom: "60px", textAlign: "center" }}>
        <h3
          style={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            marginBottom: "25px",
          }}
        >
          Обери фокус навчання:
        </h3>
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[1, 2, 3, 4, 5].map((lvl) => (
            <button
              key={lvl}
              disabled={lvl > maxLevel}
              onClick={() => setSelectedLevel(lvl)}
              style={{
                padding: "15px 30px",
                borderRadius: "14px",
                cursor: lvl > maxLevel ? "not-allowed" : "pointer",
                border: "none",
                background:
                  selectedLevel === lvl ? theme.colors.primary : "white",
                color: selectedLevel === lvl ? "white" : theme.colors.text,
                fontWeight: "700",
                fontSize: "16px",
                boxShadow:
                  selectedLevel === lvl
                    ? theme.shadows.buttonActive
                    : theme.shadows.button,
                transform:
                  selectedLevel === lvl ? "translateY(2px)" : "translateY(0)",
                transition: "0.2s all",
              }}
            >
              {lvl > maxLevel ? `🔒 Модуль ${lvl}` : `Модуль ${lvl}`}
            </button>
          ))}
        </div>
      </section>

      {/* Картки модулів з описами */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
        }}
      >
        <ModuleCard
          to="/game"
          icon={<BookOpen size={32} />}
          title="Лексичні Картки"
          desc="Вивчай нові терміни за допомогою інтерактивних карток. Найкращий спосіб запам'ятати складну IT-лексику."
          color={theme.colors.primary}
        />
        <ModuleCard
          to="/spelling"
          icon={<Keyboard size={32} />}
          title="Практика Правопису"
          desc="Пиши код без помилок! Тренуй правильне написання англійських слів, щоб твій код та документація були ідеальними."
          color={theme.colors.secondary}
        />
        <ModuleCard
          to="/quiz"
          icon={<Target size={32} />}
          title="Вікторина"
          desc="Перевір свої знання в умовах, наближених до реальної співбесіди. Отримуй XP та відкривай нові горизонти."
          color={theme.colors.success}
        />
      </div>
    </div>
  );
}

function ModuleCard({ to, icon, title, desc, color }) {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <motion.div
        whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: theme.radius.lg,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: theme.shadows.card,
          border: "1px solid rgba(0,0,0,0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: `${color}15`,
            width: "60px",
            height: "60px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: color,
            marginBottom: "25px",
          }}
        >
          {icon}
        </div>
        <h3
          style={{
            fontSize: "24px",
            marginBottom: "15px",
            color: theme.colors.text,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: theme.colors.textMuted,
            lineHeight: "1.6",
            fontSize: "15px",
            flexGrow: 1,
          }}
        >
          {desc}
        </p>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            color: color,
            fontWeight: "700",
            fontSize: "14px",
          }}
        >
          Почати навчання <ChevronRight size={18} />
        </div>
      </motion.div>
    </Link>
  );
}
