# **Self assessment**

Ссылка на PR - https://github.com/KarpovDmitriy/widget-trainer/pull/54

# **Таблица фич - реализованные фичи, со ссылками на PR, и итоговая оценка**

## **Личные баллы: Dmitriy**

| Категория             | Фича                                          | Баллы   | Ссылки                                                                                                                               |
| --------------------- | --------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| My Components         | Widget Engine                                 | +25     | [PR #36](https://github.com/KarpovDmitriy/widget-trainer/pull/36)                                                                    |
| My Components         | Code ordering widget                          | +20     | [PR #36](https://github.com/KarpovDmitriy/widget-trainer/pull/36)                                                                    |
| My Components         | Quiz widget                                   | +20     | [PR #36](https://github.com/KarpovDmitriy/widget-trainer/pull/36)                                                                    |
| My Components         | Dashboard Page                                | +20     | [PR #47](https://github.com/KarpovDmitriy/widget-trainer/pull/47)                                                                    |
| My Components         | Library Page                                  | +20     | [PR #36](https://github.com/KarpovDmitriy/widget-trainer/pull/36)                                                                    |
| Backend & Data        | Setting up auth via BaaS (Supabase Auth)      | +15     | [PR #26](https://github.com/KarpovDmitriy/widget-trainer/pull/26)                                                                    |
| Backend & Data        | BaaS CRUD: Working with a Cloud DB (Supabase) | +15     | [PR #36](https://github.com/KarpovDmitriy/widget-trainer/pull/36), [PR #47](https://github.com/KarpovDmitriy/widget-trainer/pull/47) |
| Game                  | Web Audio API                                 | +5      | [PR #49](https://github.com/KarpovDmitriy/widget-trainer/pull/49)                                                                    |
| Game                  | Leaderboard                                   | +5      | [PR #47](https://github.com/KarpovDmitriy/widget-trainer/pull/47)                                                                    |
| UI & Interaction      | Drag & Drop (code-ordering component)         | +10     | [PR #36](https://github.com/KarpovDmitriy/widget-trainer/pull/36)                                                                    |
| UI & Interaction      | i18n (2 language)                             | +10     | [PR #47](https://github.com/KarpovDmitriy/widget-trainer/pull/47)                                                                    |
| UI & Interaction      | Responsive (проверить)                        | +5      | [PR #47](https://github.com/KarpovDmitriy/widget-trainer/pull/47)                                                                    |
| UI & Interaction      | Theme Switcher                                | +10     | [PR #47](https://github.com/KarpovDmitriy/widget-trainer/pull/47)                                                                    |
| Quality               | Unit Tests (Basic)                            | +10     | [PR #31](https://github.com/KarpovDmitriy/widget-trainer/pull/31)                                                                    |
| Quality               | E2E Tests                                     | +10     | [PR #50](https://github.com/KarpovDmitriy/widget-trainer/pull/50)                                                                    |
| DevOps & Role         | Auto-deploy                                   | +5      |                                                                                                                                      |
| Architecture          | State Manager (Zustand)                       | +10     | [PR #26](https://github.com/KarpovDmitriy/widget-trainer/pull/26)                                                                    |
| Architecture          | Design Patterns: Strategy in Widget engine    | +10     | [PR #36](https://github.com/KarpovDmitriy/widget-trainer/pull/36)                                                                    |
| Architecture          | API Layer                                     | +10     | [PR #36](https://github.com/KarpovDmitriy/widget-trainer/pull/36), [PR #26](https://github.com/KarpovDmitriy/widget-trainer/pull/26) |
| Frameworks            | React                                         | +5      |
| **Personal Features** |                                               | **240** |

# **Описание работы**

## Widget Trainer

Веб-приложение для обучения и тренировок, построенное на **React 19**, **Vite** и **TypeScript**. Проект представляет собой масштабируемую платформу с интерактивными виджетами, системой авторизации и продвинутой локализацией.

## Описание моей работы в проекте

### Widget Engine + Library Page + два типа виджетов

Это была самая большая и самая интересная задача в проекте. Я проектировал и реализовывал Widget Engine - модуль, который рендерит интерактивные виджеты разных типов. Основная идея - Engine ничего не знает о конкретных типах виджетов, он использует паттерн Strategy: каждый тип виджета регистрирует свой компонент в реестре (`registry.ts`), а Engine по полю `type` находит нужную стратегию и рендерит её. Чтобы добавить новый виджет, достаточно создать папку с компонентом, конфигом и стилями, зарегистрировать в реестре - и всё работает, без правки самого Engine.

Вместе с Engine я сделал два типа виджетов: **Quiz** (классический выбор варианта) и **Code Ordering** (drag-n-drop расстановка строк кода). Также сделал страницу **Library** с фильтрацией по тегам, сложности и поиску - всё на клиенте через `useMemo`, без лишних запросов к серверу.

В этом же PR была подготовлена SQL-миграция с seed-данными: 15 Quiz-виджетов, 6 Code Ordering, 4 топика, 20 тегов. Изначально я думал создавать отдельную таблицу для каждого типа виджета, но потом понял, что Supabase хорошо работает с JSON - сделал одну общую таблицу `widgets` с `payload` типа `jsonb`, а тип виджета определяется полем `type`. Это сильно упрощает расширение.

### API Service Layer + Supabase Auth

Главная задача - создать изолированную прослойку между UI и Supabase, чтобы компоненты никогда не обращались к базе напрямую. UI вызывает стор, стор вызывает API-сервисы, и только сервисы знают про Supabase. Если мы когда-нибудь заменим бэкенд - меняются только файлы в `src/api/`.

Я реализовал функции аутентификации (логин, регистрация, логаут, подписка на изменения сессии) и функции профиля (загрузка, сохранение). Для auth написал обёртку `handleAuthRequest`, которая обрабатывает повторяющиеся ошибки в одном месте. Также написал функции-адаптеры для маппинга `snake_case`/`camelCase` между Supabase и React.

Добавил Route Guards (`ProtectedRoute`, `GuestRoute`) - обёртки, которые проверяют залогинен ли пользователь и редиректят куда нужно. В React Router нет встроенных гардов, поэтому делаем сами.

### Dashboard Page

Dashboard показывает реальную аналитику пользователя: ачивки (вычисляются на лету из истории тестов), слабые темы (по порогу процента), лидерборд (через Supabase RPC-функцию `get_leaderboard()`), история тестов с пагинацией. Для этого потребовались две SQL-миграции: таблица `test_results` и RPC-функция.

Результат теста сохраняется в базу из `practice.store.ts` fire-and-forget при завершении сессии.

### Web Audio API

Звуковая система для UI - все звуки синтезируются процедурно через `OscillatorNode` + `GainNode`, без аудиофайлов. Мажорный аккорд при правильном ответе, диссонансный тон при неправильном, фанфар при завершении теста (мелодия зависит от процента). Глобальный тогл вкл/выкл звука в хедере через отдельный Zustand-стор с сохранением в `localStorage`.

### Unit-тесты и E2E

Написал 25 юнит-тестов для API-слоя (Vitest): хелперы, auth и profile сервисы. Все вызовы к Supabase замоканы. Также написал 25 E2E-тестов на Playwright: лендинг, валидация формы логина, валидация формы регистрации, переключатель языков.

### Auto-deploy

Подключил автоматический деплой через Vercel с привязкой к GitHub-репозиторию.

---

## Проблемы, с которыми столкнулся

### Типизация реестра виджетов (проблема с `any`)

Изначально `Map` в `registry.ts` был типизирован как `Map<WidgetType, WidgetStrategy<any, any>>` с четырьмя `eslint-disable` комментариями, потому что TypeScript не мог вывести корректный тип для стратегии, когда виджеты имеют разные payload и answer. Фактически проверка типов была отключена - а по условиям проекта `any` запрещён.

Проблему решил с помощью ментора. Мы создали `WidgetModelMap` - интерфейс-карту, которая связывает строковый ключ типа виджета (`"quiz"`, `"code-ordering"`) с его конкретными типами widget и answer. На основе этой карты появились `RegisteredStrategy<K>` (типобезопасная стратегия для конкретного ключа) и `AnyWidgetStrategy` (union всех стратегий), который используется как тип значения в Map. Все `any` и `eslint-disable` из модуля убрались. Единственный компромисс - один `as` каст в `WidgetEngine.tsx`, потому что TypeScript не умеет сужать дискриминированный union через `Map.get()`.

### Drag-n-drop в Code Ordering

В `handleDragEnd` рефы `dragItem.current` и `dragOverItem.current` читались внутри колбэка `setOrder((prev) => ...)`, но обнулялись снаружи сразу после вызова `setOrder`. В React 18 с автоматическим батчингом колбэк внутри `setOrder` выполняется не сразу, а при следующем рендере - к этому моменту рефы уже `null`, `null` приводился к `0`, и `splice(0, 1)` всегда удалял первый элемент. Фикс - сохранить значения рефов в локальные переменные до вызова `setOrder`.

---

# **2 личных Feature Component - компоненты, которые разработал лично**

## 1. Widget Engine (+ Quiz Widget, Code Ordering Widget)

Widget Engine - центральный модуль приложения, отвечающий за рендеринг всех типов интерактивных виджетов.

**Архитектура:**
Реализован паттерн Strategy. Engine (`WidgetEngine.tsx`) получает объект виджета, находит стратегию по `type` в `registry.ts` и рендерит компонент. Реестр - это `Map<keyof WidgetModelMap, AnyWidgetStrategy>`, куда каждая стратегия регистрируется при импорте. Добавление нового типа виджета - это создание папки со стратегией + одна строка регистрации. Никакого `switch/case`, никаких правок Engine.

**Что я делал руками:**

- Проектировал интерфейс `WidgetModelMap` и систему типов `RegisteredStrategy<K>` / `AnyWidgetStrategy` для типобезопасного реестра без `any`.
- Писал `WidgetEngine.tsx` - generic-компонент, который по `widget.type` диспатчит на нужную стратегию.
- Реализовал `QuizStrategy` - компонент с radio-button выбором варианта.
- Реализовал `CodeOrderingStrategy` - drag-n-drop перетаскивание строк кода с кнопками «вверх/вниз» как fallback.

**Технологии:** React (useState, useCallback, useRef, useMemo), TypeScript Generics, HTML5 Drag & Drop API, CSS Modules, Supabase (jsonb, SQL migrations).

**Что было сложнее всего:** Типизация реестра - описал выше в разделе «Проблемы». И drag-n-drop с рефами в React 18 - баг с обнулением рефов до выполнения `setOrder`.

---

## 2. API Service Layer (Auth + Profile + Dashboard)

Прослойка между UI и Supabase, которая полностью изолирует компоненты от источника данных.

**Архитектура:**
Три файла сервисов (`auth.api.ts`, `profile.api.ts`, `dashboard.api.ts`) + файл хелперов (`helpers.ts`). Компоненты вызывают Zustand-стор, стор вызывает API-функции, API-функции общаются с Supabase. UI никогда не видит формат базы данных.

**Что я делал руками:**

- Обёртка `handleAuthRequest` - generic-функция, которая оборачивает любой auth-запрос к Supabase: показывает лоадер, обрабатывает ошибки, показывает тост при успехе/ошибке, и возвращает `{ user, error }`.
- Функции `processAuthError` и `processPostgrestError` - определяют тип ошибки (пользовательская или системная) и возвращают ключ перевода для toast.
- Маппинг `snake_case` ↔ `camelCase` в `profile.api.ts`: Supabase возвращает `first_name`, React работает с `firstName`. Адаптеры написаны внутри сервиса, чтобы UI никогда не видел формат БД.
- Функция `onSessionChange` - подписка на изменения сессии Supabase: если пользователь разлогинится в одной вкладке, другая вкладка тоже об этом узнает.
- Route Guards: `ProtectedRoute` и `GuestRoute` - проверяют состояние авторизации и редиректят.
- `dashboard.api.ts` - функции для получения истории тестов с пагинацией, сырых данных для вычисления ачивок, лидерборда через RPC, слабых тем по порогу процента.

**Технологии:** Supabase JS SDK, Zustand (подписка на внешний стор из сервисного слоя), TypeScript, SQL (миграции, RPC-функции, RLS-политики).

**Что было сложнее всего:** Понять зачем нужен Zustand для auth, если Supabase и так хранит токен сессии. Разобрался - `getUser()` это асинхронный вызов, его нельзя использовать синхронно в компонентах. Zustand загружает данные один раз и любой компонент мгновенно их читает.
