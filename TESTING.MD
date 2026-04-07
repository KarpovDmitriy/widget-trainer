# TESTING.md

## Testing

Фреймворк: Vitest + React Testing Library (jsdom)

### Как запустить

```bash
npm test
```

### Участники

#### @KarpovDmitriy

Что тестирую: Unit-тесты API сервисного слоя - функции аутентификации, работа с профилем и обработка ошибок. Все вызовы к Supabase замоканы.

| Файл                                    | Описание                                                                                                                           |
| :-------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `src/api/__tests__/helpers.test.ts`     | Проверка функций processAuthError и processPostgrestError - правильно ли определяется тип ошибки (пользовательская или системная). |
| `src/api/__tests__/auth.api.test.ts`    | Тесты на логин, регистрацию, логаут и подписку на сессию - успешные сценарии, ошибки Supabase и сетевые сбои.                      |
| `src/api/__tests__/profile.api.test.ts` | Тесты на загрузку и сохранение профиля, маппинг snake_case/camelCase, обработка null-полей и ошибок БД.                            |

PR с тестами: https://github.com/KarpovDmitriy/widget-trainer/pull/31

#### @dromari

Что тестирую: Интеграционные тесты UI-компонентов, формы редактирования профиля, взаимодействие с внешними библиотеками и моки данных.

| Файл                                                            | Описание                                                                                                                                    |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `src\features\profile\profileEditForm\ProfileEditForm.test.tsx` | Проверка рендеринга начальных данных из INITIAL_USER_DATA, имитация пользовательского ввода (fireEvent) и доступность элементов управления. |

PR с тестами: https://github.com/KarpovDmitriy/widget-trainer/pull/29

---

## E2E Testing

Фреймворк: Playwright

### Установка

```bash
npm install -D @playwright/test
npx playwright install chromium
```

### Как запустить

```bash
npm run test:e2e            # headless
npm run test:e2e:headed     # в браузере
npm run test:e2e:ui         # Playwright UI
```

### Участники

#### @KarpovDmitriy

Что тестирую: E2E сценарии пользовательских фич - лендинг, авторизация, регистрация, переключатель языков.

| Файл                        | Сценарий                  | Кол-во тестов | Описание                                                                                       |
| :-------------------------- | :------------------------ | :-----------: | :--------------------------------------------------------------------------------------------- |
| `e2e/landing.spec.ts`       | Landing Page & Navigation |       6       | Рендеринг hero-секции, feature-карточки, кнопки гостя, навигация на /login и /register         |
| `e2e/login.spec.ts`         | Login Form Validation     |       7       | Валидация email/password, состояние кнопки submit, ссылки на регистрацию и Forgot Password     |
| `e2e/register.spec.ts`      | Register Form Validation  |       8       | Все 4 поля формы, минимальная длина, совпадение паролей, активация кнопки Submit               |
| `e2e/lang-switcher.spec.ts` | Language Switching        |       4       | Переключение EN↔RU на лендинге, сохранение языка при навигации, смена языка на странице логина |
