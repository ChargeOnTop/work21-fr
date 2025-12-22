# CLAUDE.md - Work21 Frontend (BroJS)

## Обзор проекта

**Work21 Frontend** — SPA приложение на BroJS для платформы фриланса. Позволяет студентам находить проекты, а заказчикам — публиковать задания с AI-оценкой стоимости.

## Технологический стек

- **Framework:** BroJS (@brojs/cli)
- **UI Library:** React 18
- **Language:** TypeScript
- **Styling:** CSS Modules / Global CSS
- **Build:** Webpack (через BroJS)

## Структура проекта

```
work21-fr/
├── src/
│   ├── app/                    # Страницы (роутинг)
│   │   ├── page.tsx            # Главная страница
│   │   ├── login/page.tsx      # Вход
│   │   ├── register/page.tsx   # Регистрация
│   │   └── dashboard/          # Личный кабинет
│   │       ├── page.tsx
│   │       ├── projects/       # Проекты
│   │       ├── profile/        # Профиль
│   │       └── settings/       # Настройки
│   ├── components/             # React компоненты
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── AIAgents.tsx
│   ├── lib/
│   │   └── api.ts              # API клиент
│   └── styles/
│       └── globals.css         # Глобальные стили
├── public/                     # Статические файлы
├── bro.config.js               # Конфигурация BroJS
└── package.json
```

## Ключевые команды

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm start
# Открывается http://localhost:8099/work21-fr

# Сборка для продакшена
npm run build
```

## Конфигурация BroJS

Файл `bro.config.js`:
```javascript
module.exports = {
  name: 'work21-fr',
  base: '/work21-fr',
  // ...
};
```

## API клиент

Файл `src/lib/api.ts` содержит все API вызовы:

```typescript
// Получение URL из BroJS админки
const API_BASE_URL = getConfigValue('work21-fr.api');
const ESTIMATOR_API_URL = getConfigValue('work21-fr.api.estimator');

// Доступные API
export const authApi = { login, register };
export const usersApi = { getMe, updateMe };
export const projectsApi = { create, getList, apply };
export const estimatorApi = { estimate, estimateFull };
```

## BroJS Админка

**URL:** https://admin.brojs.ru

### Настройки приложения `work21-fr`

| Ключ | Значение | Описание |
|------|----------|----------|
| `api` | `https://api.work-21.com` | Backend API |
| `api.estimator` | `https://api.work-21.com/agent` | AI Agent API |

## Роутинг

| Путь | Описание |
|------|----------|
| `/work21-fr` | Главная страница |
| `/work21-fr/login` | Вход |
| `/work21-fr/register` | Регистрация |
| `/work21-fr/dashboard` | Личный кабинет |
| `/work21-fr/dashboard/projects` | Список проектов |
| `/work21-fr/dashboard/projects/new` | Создать проект |
| `/work21-fr/dashboard/profile` | Профиль |

## Авторизация

Токен хранится в `localStorage`:
```typescript
localStorage.setItem('access_token', token);
localStorage.getItem('access_token');
localStorage.removeItem('access_token');
```

## Темы оформления

Поддерживаются светлая и тёмная темы. Переключение через CSS класс на `<html>`:
```css
html.dark { /* тёмная тема */ }
html:not(.dark) { /* светлая тема */ }
```

## Важные компоненты

### AIAgents.tsx
Компонент для AI-оценки проекта. Вызывает `estimatorApi.estimateFull()`.

### Dashboard
Личный кабинет с разным функционалом для ролей:
- **Студент:** поиск проектов, заявки, рейтинг
- **Заказчик:** создание проектов, управление заявками

## Связанные сервисы

- **Backend:** https://github.com/ChargeOnTop/work21-backend
- **AI Agent:** https://github.com/ChargeOnTop/work21-agent
- **Deploy:** https://github.com/ChargeOnTop/work21-deploy

## Production

- **URL:** https://ift-1.brojs.ru/work21-fr
- **Static:** https://static.brojs.ru/work21-fr/

