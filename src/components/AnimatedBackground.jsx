// src/components/AnimatedBackground.jsx
import { useEffect, useRef } from "react";
import { theme } from "../styles/theme"; // Використовуємо наші фірмові кольори

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    // Налаштовуємо розмір Canvas під екран
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Функція малювання хвиль
    const draw = () => {
      // Очищаємо попередній кадр
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ВСТАНОВЛЮЄМО ТВІЙ ПАРАМЕТР ПРОЗОРОСТІ (0.25)
      ctx.globalAlpha = 0.15;

      // ВСТАНОВЛЮЄМО ТВОЮ ШВИДКІСТЬ (базова 0.005 * 3)
      time += 0.015;

      // --- Хвиля 1 (Первинний колір) ---
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let i = 0; i < canvas.width; i++) {
        // Формула хвилі: Math.sin(x * частота + час) * амплітуда
        const y = canvas.height - 200 + Math.sin(i * 0.003 + time) * 60;
        ctx.lineTo(i, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.fillStyle = theme.colors.primary; // Синій колір з нашої теми
      ctx.fill();

      // --- Хвиля 2 (Вторинний колір, рухається трохи інакше) ---
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let i = 0; i < canvas.width; i++) {
        const y = canvas.height - 150 + Math.cos(i * 0.004 + time * 1.2) * 80;
        ctx.lineTo(i, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.fillStyle = theme.colors.secondary; // Фіолетовий колір з нашої теми
      ctx.fill();

      // --- Хвиля 3 (Колір успіху для глибини) ---
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let i = 0; i < canvas.width; i++) {
        const y = canvas.height - 100 + Math.sin(i * 0.002 - time * 0.8) * 40;
        ctx.lineTo(i, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.fillStyle = theme.colors.success; // Зелений колір з нашої теми
      ctx.fill();

      // Запускаємо наступний кадр
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Прибирання після закриття компонента
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1, // Переконайся, що тут -1
        pointerEvents: "none",
        display: "block", // Додано для стабільності
      }}
    />
  );
}
