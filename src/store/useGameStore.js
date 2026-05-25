import { create } from "zustand";
import { persist } from "zustand/middleware";

export const wordDatabase = [
  // МОДУЛЬ 1: IT Foundation (Базові терміни, 15 слів)
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
  { id: 11, en: "Shortcut", ua: "Гаряча клавіша", level: 1 },
  { id: 12, en: "Desktop", ua: "Робочий стіл", level: 1 },
  { id: 13, en: "Password", ua: "Пароль", level: 1 },
  { id: 14, en: "Update", ua: "Оновлення", level: 1 },
  { id: 15, en: "Download", ua: "Завантаження", level: 1 },

  // МОДУЛЬ 2: Core Programming (Основи коду, 20 слів)
  { id: 16, en: "Variable", ua: "Змінна", level: 2 },
  { id: 17, en: "Function", ua: "Функція", level: 2 },
  { id: 18, en: "Array", ua: "Масив", level: 2 },
  { id: 19, en: "Loop", ua: "Цикл", level: 2 },
  { id: 20, en: "String", ua: "Рядок", level: 2 },
  { id: 21, en: "Object", ua: "Об'єкт", level: 2 },
  { id: 22, en: "Debug", ua: "Налагодження", level: 2 },
  { id: 23, en: "Error", ua: "Помилка", level: 2 },
  { id: 24, en: "Syntax", ua: "Синтаксис", level: 2 },
  { id: 25, en: "Integer", ua: "Ціле число", level: 2 },
  { id: 26, en: "Boolean", ua: "Логічний тип", level: 2 },
  { id: 27, en: "Float", ua: "Число з плаваючою комою", level: 2 },
  { id: 28, en: "Compile", ua: "Компілювати", level: 2 },
  { id: 29, en: "Execute", ua: "Виконувати", level: 2 },
  { id: 30, en: "Statement", ua: "Інструкція", level: 2 },
  { id: 31, en: "Parameter", ua: "Параметр", level: 2 },
  { id: 32, en: "Argument", ua: "Аргумент", level: 2 },
  { id: 33, en: "Return", ua: "Повернення", level: 2 },
  { id: 34, en: "Class", ua: "Клас", level: 2 },
  { id: 35, en: "Method", ua: "Метод", level: 2 },

  // МОДУЛЬ 3: Frontend & UI (Веброзробка, 25 слів)
  { id: 36, en: "Framework", ua: "Фреймворк", level: 3 },
  { id: 37, en: "Component", ua: "Компонент", level: 3 },
  { id: 38, en: "State", ua: "Стан", level: 3 },
  { id: 39, en: "Frontend", ua: "Фронтенд", level: 3 },
  { id: 40, en: "Interface", ua: "Інтерфейс", level: 3 },
  { id: 41, en: "Routing", ua: "Маршрутизація", level: 3 },
  { id: 42, en: "Layout", ua: "Макет", level: 3 },
  { id: 43, en: "Responsive", ua: "Адаптивний", level: 3 },
  { id: 44, en: "Alignment", ua: "Вирівнювання", level: 3 },
  { id: 45, en: "Padding", ua: "Внутрішній відступ", level: 3 },
  { id: 46, en: "Margin", ua: "Зовнішній відступ", level: 3 },
  { id: 47, en: "Border", ua: "Межа", level: 3 },
  { id: 48, en: "Canvas", ua: "Полотно", level: 3 },
  { id: 49, en: "Render", ua: "Відмальовування", level: 3 },
  { id: 50, en: "Hook", ua: "Хук", level: 3 },
  { id: 51, en: "Property", ua: "Властивість", level: 3 },
  { id: 52, en: "Event", ua: "Подія", level: 3 },
  { id: 53, en: "Listener", ua: "Слухач", level: 3 },
  { id: 54, en: "Widget", ua: "Віджет", level: 3 },
  { id: 55, en: "Template", ua: "Шаблон", level: 3 },
  { id: 56, en: "Stylesheet", ua: "Таблиця стилів", level: 3 },
  { id: 57, en: "Pixel", ua: "Піксель", level: 3 },
  { id: 58, en: "Resolution", ua: "Роздільна здатність", level: 3 },
  { id: 59, en: "Animation", ua: "Анімація", level: 3 },
  { id: 60, en: "Viewport", ua: "Область перегляду", level: 3 },

  // МОДУЛЬ 4: Backend & Data (Сервер та Дані, 30 слів)
  { id: 61, en: "Backend", ua: "Бекенд", level: 4 },
  { id: 62, en: "Database", ua: "База даних", level: 4 },
  { id: 63, en: "Query", ua: "Запит (до БД)", level: 4 },
  { id: 64, en: "Request", ua: "Запит (HTTP)", level: 4 },
  { id: 65, en: "Response", ua: "Відповідь", level: 4 },
  { id: 66, en: "Asynchronous", ua: "Асинхронний", level: 4 },
  { id: 67, en: "Middleware", ua: "Проміжне ПЗ", level: 4 },
  { id: 68, en: "Endpoint", ua: "Кінцева точка", level: 4 },
  { id: 69, en: "Payload", ua: "Корисне навантаження", level: 4 },
  { id: 70, en: "Header", ua: "Заголовок", level: 4 },
  { id: 71, en: "Session", ua: "Сесія", level: 4 },
  { id: 72, en: "Token", ua: "Токен", level: 4 },
  { id: 73, en: "Cache", ua: "Кеш", level: 4 },
  { id: 74, en: "Schema", ua: "Схема", level: 4 },
  { id: 75, en: "Index", ua: "Індекс", level: 4 },
  { id: 76, en: "Migration", ua: "Міграція", level: 4 },
  { id: 77, en: "Transaction", ua: "Транзакція", level: 4 },
  { id: 78, en: "Relation", ua: "Зв'язок", level: 4 },
  { id: 79, en: "Table", ua: "Таблиця", level: 4 },
  { id: 80, en: "Column", ua: "Стовпець", level: 4 },
  { id: 81, en: "Row", ua: "Рядок", level: 4 },
  { id: 82, en: "API", ua: "Програмний інтерфейс", level: 4 },
  { id: 83, en: "REST", ua: "Архітектура REST", level: 4 },
  { id: 84, en: "Timeout", ua: "Час очікування", level: 4 },
  { id: 85, en: "Parsing", ua: "Синтаксичний аналіз", level: 4 },
  { id: 86, en: "Validation", ua: "Валідація", level: 4 },
  { id: 87, en: "Client", ua: "Клієнт", level: 4 },
  { id: 88, en: "Architecture", ua: "Архітектура", level: 4 },
  { id: 89, en: "JSON", ua: "Формат JSON", level: 4 },
  { id: 90, en: "XML", ua: "Формат XML", level: 4 },

  // МОДУЛЬ 5: DevOps, Advanced OOP & Tech Lead (35 слів)
  { id: 91, en: "Deployment", ua: "Розгортання", level: 5 },
  { id: 92, en: "Repository", ua: "Репозиторій", level: 5 },
  { id: 93, en: "Commit", ua: "Фіксація", level: 5 },
  { id: 94, en: "Branch", ua: "Гілка", level: 5 },
  { id: 95, en: "Merge", ua: "Злиття", level: 5 },
  { id: 96, en: "Conflict", ua: "Конфлікт", level: 5 },
  { id: 97, en: "Pull", ua: "Отримання даних", level: 5 },
  { id: 98, en: "Push", ua: "Відправлення даних", level: 5 },
  { id: 99, en: "Encryption", ua: "Шифрування", level: 5 },
  { id: 100, en: "Cipher", ua: "Шифр", level: 5 },
  { id: 101, en: "Asymmetric", ua: "Асиметричний", level: 5 },
  { id: 102, en: "Cryptography", ua: "Криптографія", level: 5 },
  { id: 103, en: "Containerization", ua: "Контейнеризація", level: 5 },
  { id: 104, en: "Microservices", ua: "Мікросервіси", level: 5 },
  { id: 105, en: "Concurrency", ua: "Конкурентність", level: 5 },
  { id: 106, en: "Scalability", ua: "Масштабованість", level: 5 },
  { id: 107, en: "Latency", ua: "Затримка", level: 5 },
  { id: 108, en: "Bandwidth", ua: "Пропускна здатність", level: 5 },
  { id: 109, en: "Idempotent", ua: "Ідемпотентний", level: 5 },
  { id: 110, en: "Heuristic", ua: "Евристичний", level: 5 },
  { id: 111, en: "Cluster", ua: "Кластер", level: 5 },
  { id: 112, en: "Node", ua: "Вузол", level: 5 },
  { id: 113, en: "Firewall", ua: "Брандмауер", level: 5 },
  { id: 114, en: "Vulnerability", ua: "Вразливість", level: 5 },
  { id: 115, en: "Exploit", ua: "Експлойт", level: 5 },
  { id: 116, en: "Patch", ua: "Патч", level: 5 },
  { id: 117, en: "Authentication", ua: "Аутентифікація", level: 5 },
  { id: 118, en: "Authorization", ua: "Авторизація", level: 5 },
  { id: 119, en: "Polymorphism", ua: "Поліморфізм", level: 5 },
  { id: 120, en: "Encapsulation", ua: "Інкапсуляція", level: 5 },
  { id: 121, en: "Inheritance", ua: "Успадкування", level: 5 },
  { id: 122, en: "Algorithm", ua: "Алгоритм", level: 5 },
  { id: 123, en: "Virtualization", ua: "Віртуалізація", level: 5 },
  { id: 124, en: "Pipeline", ua: "Конвеєр", level: 5 },
  { id: 125, en: "Clone", ua: "Клонування", level: 5 },
];

export const useGameStore = create(
  persist(
    (set, get) => ({
      playerName: "",
      isRegistered: false,
      score: 0,
      selectedLevel: 1,
      maxUnlockedModule: 1, // НОВА ЗМІННА: Відстежує реально відкриті модулі
      unlockedAchievements: [],

      achievementsList: [
        {
          id: "first_steps",
          title: "Hello World",
          desc: "Зроблено перші кроки! Зароблено перші 50 XP.",
        },
        {
          id: "mod_2",
          title: "Logic Builder",
          desc: "Відкрито модуль 'Core Programming'. Основи алгоритмів закладено!",
        },
        {
          id: "mod_3",
          title: "Pixel Perfect",
          desc: "Відкрито модуль 'Frontend & UI'. Час творити ідеальні інтерфейси!",
        },
        {
          id: "mod_4",
          title: "Data Architect",
          desc: "Відкрито модуль 'Backend & Data'. Бази даних та сервери підкорено!",
        },
        {
          id: "mod_5",
          title: "Cloud Commander",
          desc: "Відкрито модуль 'DevOps'. Ви на вершині розгортання технологій!",
        },
        {
          id: "tech_lead",
          title: "CTO",
          desc: "Модуль 5 пройдено! Ви справжній технічний директор.",
        },
      ],

      registerUser: (name) => set({ playerName: name, isRegistered: true }),

      // Тепер максимальний рівень береться не від XP, а від реального прогресу
      getMaxLevel: () => get().maxUnlockedModule,

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

      // Функція, що спрацьовує ТІЛЬКИ в кінці проходження гри (Вікторини/Правопису)
      completeModule: (level) => {
        const currentMax = get().maxUnlockedModule;
        const currentUnlocked = [...get().unlockedAchievements];
        let newMax = currentMax;

        // Відкриваємо наступний модуль лише якщо пройшли поточний максимальний
        if (level === currentMax && currentMax < 5) {
          newMax = currentMax + 1;
        }

        // Видаємо досягнення за відкриття модулів
        if (newMax >= 2 && !currentUnlocked.includes("mod_2"))
          currentUnlocked.push("mod_2");
        if (newMax >= 3 && !currentUnlocked.includes("mod_3"))
          currentUnlocked.push("mod_3");
        if (newMax >= 4 && !currentUnlocked.includes("mod_4"))
          currentUnlocked.push("mod_4");
        if (newMax >= 5 && !currentUnlocked.includes("mod_5"))
          currentUnlocked.push("mod_5");
        if (level === 5 && !currentUnlocked.includes("tech_lead"))
          currentUnlocked.push("tech_lead");

        set({
          maxUnlockedModule: newMax,
          unlockedAchievements: currentUnlocked,
        });
      },

      // XP тепер просто накопичується для статистики
      increaseScore: (amount = 10) => {
        const currentScore = get().score;
        const newScore = currentScore + amount;
        const currentUnlocked = [...get().unlockedAchievements];

        if (newScore >= 50 && !currentUnlocked.includes("first_steps")) {
          currentUnlocked.push("first_steps");
        }

        set({ score: newScore, unlockedAchievements: currentUnlocked });
      },

      resetProgress: () => {
        set({
          score: 0,
          selectedLevel: 1,
          maxUnlockedModule: 1,
          playerName: "",
          isRegistered: false,
          unlockedAchievements: [],
          currentWordIndex: 0,
          isFinished: false,
        });
        localStorage.removeItem("english-app-storage");
      },
    }),
    {
      name: "english-app-storage",
    },
  ),
);
