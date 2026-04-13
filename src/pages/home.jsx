import { Link } from "react-router-dom";
import { theme } from "../styles/theme";
import { motion } from "framer-motion";
import { BookOpen, Target, Keyboard } from "lucide-react";

export default function Home() {
  const modes = [
    {
      path: "/game",
      title: "Картки",
      icon: <BookOpen size={32} />,
      color: theme.colors.primary,
      desc: "Вивчай нові терміни",
    },
    {
      path: "/quiz",
      title: "Вікторина",
      icon: <Target size={32} />,
      color: theme.colors.success,
      desc: "Перевір знання",
    },
    {
      path: "/spelling",
      title: "Правопис",
      icon: <Keyboard size={32} />,
      color: theme.colors.secondary,
      desc: "Пиши без помилок",
    },
  ];

  return (
    <div
      style={{
        padding: "20px 15px",
        textAlign: "center",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1
          style={{
            fontSize: "clamp(32px, 10vw, 48px)",
            color: theme.colors.text,
            marginBottom: "10px",
            fontWeight: "800",
          }}
        >
          IT Mastery
        </h1>
        <p
          style={{
            color: theme.colors.textMuted,
            marginBottom: "40px",
            fontSize: "16px",
            maxWidth: "400px",
            margin: "0 auto 40px",
          }}
        >
          Твій шлях від Junior до Senior Terminology
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          maxWidth: "1000px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {modes.map((mode, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to={mode.path} style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: "white",
                  padding: "35px 25px",
                  borderRadius: theme.radius.lg,
                  boxShadow: theme.shadows.card,
                  border: `1px solid ${mode.color}15`,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "0.3s",
                }}
              >
                <div style={{ color: mode.color, marginBottom: "15px" }}>
                  {mode.icon}
                </div>
                <h2
                  style={{
                    color: theme.colors.text,
                    margin: "0 0 10px 0",
                    fontSize: "24px",
                  }}
                >
                  {mode.title}
                </h2>
                <p
                  style={{
                    color: theme.colors.textMuted,
                    fontSize: "14px",
                    margin: 0,
                    lineHeight: "1.5",
                  }}
                >
                  {mode.desc}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
