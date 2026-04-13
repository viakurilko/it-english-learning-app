import { create } from "zustand";
import { persist } from "zustand/middleware";

const wordDatabase = [
  // Рівень 1 (0-90 XP)
  { id: 1, en: "Hardware", ua: "Апаратне забезпечення", level: 1 },
  { id: 2, en: "Software", ua: "Програмне забезпечення", level: 1 },
  { id: 3, en: "Network", ua: "Мережа", level: 1 },
  { id: 4, en: "Browser", ua: "Браузер", level: 1 },
  { id: 5, en: "Server", ua: "Сервер", level: 1 },
  { id: 6, en: "Keyboard", ua: "Клавіатура", level: 1 },
  { id: 7, en: "Screen", ua: "Екран", level: 1 },
  { id: 8, en: "Folder", ua: "Папка", level: 1 },
  { id: 9, en: "File", ua: "Файл", level: 1 },
  { id: 10, en: "Code", ua: "Код", level: 1 },
  // Рівень 2 (100-190 XP)
  { id: 11, en: "Variable", ua: "Змінна", level: 2 },
  { id: 12, en: "Function", ua: "Функція", level: 2 },
  { id: 13, en: "Array", ua: "Масив", level: 2 },
  { id: 14, en: "Loop", ua: "Цикл", level: 2 },
  { id: 15, en: "String", ua: "Рядок", level: 2 },
  { id: 16, en: "Object", ua: "Об'єкт", level: 2 },
  { id: 17, en: "Database", ua: "База даних", level: 2 },
  { id: 18, en: "Query", ua: "Запит", level: 2 },
  { id: 19, en: "Debug", ua: "Налагодження", level: 2 },
  { id: 20, en: "Error", ua: "Помилка", level: 2 },
  // Рівень 3 (200-290 XP)
  { id: 21, en: "Framework", ua: "Фреймворк", level: 3 },
  { id: 22, en: "Component", ua: "Компонент", level: 3 },
  { id: 23, en: "State", ua: "Стан", level: 3 },
  { id: 24, en: "Frontend", ua: "Фронтенд", level: 3 },
  { id: 25, en: "Backend", ua: "Бекенд", level: 3 },
  { id: 26, en: "Interface", ua: "Інтерфейс", level: 3 },
  { id: 27, en: "Routing", ua: "Маршрутизація", level: 3 },
  { id: 28, en: "Layout", ua: "Макет", level: 3 },
  { id: 29, en: "Request", ua: "Запит (HTTP)", level: 3 },
  { id: 30, en: "Response", ua: "Відповідь", level: 3 },
  // Рівень 4 (300-390 XP)
  { id: 31, en: "Asynchronous", ua: "Асинхронний", level: 4 },
  { id: 32, en: "Polymorphism", ua: "Поліморфізм", level: 4 },
  { id: 33, en: "Encapsulation", ua: "Інкапсуляція", level: 4 },
  { id: 34, en: "Inheritance", ua: "Успадкування", level: 4 },
  { id: 35, en: "Middleware", ua: "Проміжне ПЗ", level: 4 },
  { id: 36, en: "Repository", ua: "Репозиторій", level: 4 },
  { id: 37, en: "Algorithm", ua: "Алгоритм", level: 4 },
  { id: 38, en: "Deployment", ua: "Розгортання", level: 4 },
  { id: 39, en: "Authentication", ua: "Аутентифікація", level: 4 },
  { id: 40, en: "Authorization", ua: "Авторизація", level: 4 },
  // Рівень 5 (400+ XP)
  { id: 41, en: "Encryption", ua: "Шифрування", level: 5 },
  { id: 42, en: "Cryptography", ua: "Криптографія", level: 5 },
  { id: 43, en: "Containerization", ua: "Контейнеризація", level: 5 },
  { id: 44, en: "Microservices", ua: "Мікросервіси", level: 5 },
  { id: 45, en: "Concurrency", ua: "Конкурентність", level: 5 },
  { id: 46, en: "Scalability", ua: "Масштабованість", level: 5 },
  { id: 47, en: "Latency", ua: "Затримка", level: 5 },
  { id: 48, en: "Bandwidth", ua: "Пропускна здатність", level: 5 },
  { id: 49, en: "Idempotent", ua: "Ідемпотентний", level: 5 },
  { id: 50, en: "Heuristic", ua: "Евристичний", level: 5 },
];

export const useGameStore = create(
  persist(
    (set, get) => ({
      playerName: "",
      isRegistered: false,
      score: 0,
      selectedLevel: 1,
      unlockedAchievements: [],

      // Список досягнень для Профілю
      achievementsList: [
        {
          id: "first_steps",
          title: "Hello World",
          desc: "Вітаємо! Ви заробили свої перші 50 XP.",
        },
        {
          id: "level_2",
          title: "Junior Dev",
          desc: "Ви розблокували 2-й рівень складності.",
        },
        {
          id: "level_3",
          title: "Middle Dev",
          desc: "Ви розблокували 3-й рівень складності.",
        },
        {
          id: "level_4",
          title: "Senior Dev",
          desc: "Ви розблокували 4-й рівень складності.",
        },
        {
          id: "tech_lead",
          title: "Tech Lead",
          desc: "Ви досягли максимального рівня знань!",
        },
      ],

      registerUser: (name) => set({ playerName: name, isRegistered: true }),

      getMaxLevel: () => {
        const lvl = Math.floor(get().score / 100) + 1;
        return lvl > 5 ? 5 : lvl;
      },

      setSelectedLevel: (lvl) =>
        set({
          selectedLevel: lvl,
          currentWordIndex: 0,
          isFinished: false,
        }),

      getAvailableWords: () => {
        const lvl = get().selectedLevel;
        return wordDatabase.filter((w) => w.level === lvl);
      },

      increaseScore: (amount = 10) => {
        const currentScore = get().score;
        const newScore = currentScore + amount;
        const currentUnlocked = [...get().unlockedAchievements];

        // Логіка перевірки досягнень
        if (newScore >= 50 && !currentUnlocked.includes("first_steps")) {
          currentUnlocked.push("first_steps");
        }
        const newMaxLvl = Math.floor(newScore / 100) + 1;
        if (newMaxLvl === 2 && !currentUnlocked.includes("level_2"))
          currentUnlocked.push("level_2");
        if (newMaxLvl === 3 && !currentUnlocked.includes("level_3"))
          currentUnlocked.push("level_3");
        if (newMaxLvl === 4 && !currentUnlocked.includes("level_4"))
          currentUnlocked.push("level_4");
        if (newMaxLvl === 5 && !currentUnlocked.includes("tech_lead"))
          currentUnlocked.push("tech_lead");

        set({
          score: newScore,
          unlockedAchievements: currentUnlocked,
        });
      },

      resetProgress: () => {
        set({
          score: 0,
          selectedLevel: 1,
          playerName: "",
          isRegistered: false,
          unlockedAchievements: [],
          currentWordIndex: 0,
          isFinished: false,
        });
        localStorage.removeItem("english-app-storage");
      },

      // Стан для карток
      currentWordIndex: 0,
      isFinished: false,
      nextWord: () =>
        set((state) => {
          const words = get().getAvailableWords();
          if (state.currentWordIndex >= words.length - 1)
            return { isFinished: true };
          return { currentWordIndex: state.currentWordIndex + 1 };
        }),
      restartGame: () => set({ currentWordIndex: 0, isFinished: false }),
    }),
    { name: "english-app-storage" },
  ),
);
