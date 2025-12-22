# Stubs — Заглушки для API

Заглушки для всех API запросов с различными вариантами ответов.

## Структура

```
stubs/
├── auth.json       # Аутентификация (login, register)
├── users.json      # Пользователи (me, leaderboard)
├── projects.json   # Проекты (list, my, create, apply)
├── estimator.json  # AI оценка (estimate, chat, health)
└── README.md
```

## Варианты ответов

### auth.json

| Endpoint | Варианты |
|----------|----------|
| `login` | success, error, validation_error |
| `register` | success, error_email_exists, validation_error |

### users.json

| Endpoint | Варианты |
|----------|----------|
| `me` | success_student, success_customer, error_unauthorized |
| `leaderboard` | success, empty |

### projects.json

| Endpoint | Варианты |
|----------|----------|
| `list` | success, empty, error |
| `my` | success_customer, success_student, empty |
| `create` | success, validation_error |
| `apply` | success, error_already_applied |

### estimator.json

| Endpoint | Варианты |
|----------|----------|
| `estimate` | success, error, error_empty_description |
| `chat` | success, error |
| `health` | success, error |

## Использование

Для локальной разработки без бэкенда можно использовать эти заглушки с помощью MSW (Mock Service Worker) или настроить в `bro.config.js`.

```javascript
// Пример использования в тестах
import authStubs from '../stubs/auth.json';

const successResponse = authStubs.login.success;
const errorResponse = authStubs.login.error;
```

