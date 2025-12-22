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
      "ai_estimation": true,      // AI оценка проектов (GigaChat)
      "dark_mode": true,          // Переключение тёмной темы
      "registration": true,       // Регистрация новых пользователей
      "new_dashboard": false,     // Новый дизайн дашборда (A/B тест)
      "page_login": true,         // Страница входа
      "page_register": true,      // Страница регистрации
      "page_dashboard": true,     // Страница дашборда
      "page_projects": true,      // Страница проектов
      "page_profile": true,       // Страница профиля
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
