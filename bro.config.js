const pkg = require("./package");
const path = require("path");

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        },
      ],
    },
  },
  
  /* Навигация — пункты меню приложения */
  navigations: {
    "work21-fr.main": "/work21-fr",
    "work21-fr.login": "/work21-fr/login",
    "work21-fr.register": "/work21-fr/register",
    "work21-fr.dashboard": "/work21-fr/dashboard",
    "work21-fr.dashboard.projects": "/work21-fr/dashboard/projects",
    "work21-fr.dashboard.projects.new": "/work21-fr/dashboard/projects/new",
    "work21-fr.dashboard.applications": "/work21-fr/dashboard/applications",
    "work21-fr.dashboard.profile": "/work21-fr/dashboard/profile",
    "work21-fr.dashboard.settings": "/work21-fr/dashboard/settings",
    "work21-fr.dashboard.rating": "/work21-fr/dashboard/rating",
  },
  
  /* Фичи — переключатели функционала */
  /* Структура: features[pkg.name][featureName] */
  features: {
    "work21-fr": {
      // Основные
      "dark_mode": true,              // Кнопка смены темы
      "registration": true,           // Форма регистрации
      "ai_estimation": true,          // AI оценка проектов (GigaChat)
      // Главная
      "hero_stats": true,             // Статистика на главной
      "cta_section": true,            // Блок призыва к действию
      // Login
      "forgot_password": true,        // Ссылка "Забыли пароль?"
      "quick_role_select": true,      // Кнопки "Я студент / Я заказчик"
      // Dashboard
      "dashboard_stats": true,        // Статистика пользователя
      "dashboard_recommendations": true, // Рекомендованные проекты
      "dashboard_quick_actions": true,   // Быстрые действия
      // Projects
      "project_tech_stack": true,     // Технологии проекта
      "project_tasks": true,          // Задачи проекта
      "project_requirements": true,   // Требования проекта
      // Profile
      "profile_avatar": true,         // Аватар пользователя
      "profile_skills": true,         // Навыки пользователя
      "profile_verification": true,   // Блок верификации
      // New Project
      "project_deadline": true,       // Выбор дедлайна
      "project_tech_select": true,    // Выбор технологий
    },
  },
  
  /* Конфигурация — настройки приложения */
  config: {
    "work21-fr.api": process.env.API_URL || "http://localhost:8000",
    "work21-fr.api.estimator": process.env.ESTIMATOR_API_URL || "http://localhost:8080"
  },
  
  // Оставляем путь к кастомному HTML-шаблону для prod-сборки или оставляем undefined
  htmlTemplatePath: undefined,
};
