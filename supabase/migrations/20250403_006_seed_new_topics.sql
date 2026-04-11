-- ============================================================
-- Migration: Add 5 new JavaScript topics with widgets
-- 3 Easy, 1 Medium, 1 Hard (using existing tags only)
-- ============================================================


-- ============================================================
-- NEW TOPICS (5 total) - JavaScript focused
-- ============================================================

insert into public.topics (id, title, description, difficulty, order_index) values
  (
    'b0000001-0000-0000-0000-000000000005',
    '{"ru":"Переменные и типы данных","en":"Variables & Data Types"}',
    '{"ru":"let, const, var, typeof, приведение типов, примитивы и объекты","en":"let, const, var, typeof, type coercion, primitives and objects"}',
    1, 5
  ),
  (
    'b0000001-0000-0000-0000-000000000006',
    '{"ru":"Массивы и строки","en":"Arrays & Strings"}',
    '{"ru":"Методы массивов, работа со строками, деструктуризация, spread-оператор","en":"Array methods, string manipulation, destructuring, spread operator"}',
    1, 6
  ),
  (
    'b0000001-0000-0000-0000-000000000007',
    '{"ru":"Функции и область видимости","en":"Functions & Scope"}',
    '{"ru":"Объявление функций, замыкания, hoisting, лексическая область видимости","en":"Function declarations, closures, hoisting, lexical scope"}',
    1, 7
  ),
  (
    'b0000001-0000-0000-0000-000000000008',
    '{"ru":"Асинхронный JavaScript","en":"Async JavaScript"}',
    '{"ru":"Промисы, async/await, Event Loop, fetch API, обработка ошибок","en":"Promises, async/await, Event Loop, fetch API, error handling"}',
    2, 8
  ),
  (
    'b0000001-0000-0000-0000-000000000009',
    '{"ru":"Продвинутые концепции","en":"Advanced Concepts"}',
    '{"ru":"this, прототипы, debounce/throttle, Map/Set, JSON, работа с DOM","en":"this keyword, prototypes, debounce/throttle, Map/Set, JSON, DOM manipulation"}',
    3, 9
  );


-- TOPIC ↔ TAG mapping (using existing JS tags)
insert into public.topic_tag_map (topic_id, tag_id) values
  -- Topic 5: Variables & Data Types
  ('b0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000001'), -- typeof
  ('b0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000002'), -- basics
  ('b0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000011'), -- coercion
  ('b0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000023'), -- variables
  -- Topic 6: Arrays & Strings
  ('b0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000007'), -- arrays
  ('b0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000021'), -- strings
  ('b0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000017'), -- destructuring
  ('b0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000012'), -- es6
  -- Topic 7: Functions & Scope
  ('b0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000016'), -- functions
  ('b0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000009'), -- scope
  ('b0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000010'), -- hoisting
  ('b0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000003'), -- closures
  -- Topic 8: Async JavaScript
  ('b0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000006'), -- promises
  ('b0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000013'), -- async-await
  ('b0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000005'), -- event-loop
  ('b0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000019'), -- fetch
  ('b0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000020'), -- error-handling
  -- Topic 9: Advanced Concepts
  ('b0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000008'), -- this
  ('b0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000004'), -- prototypes
  ('b0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000018'), -- debounce
  ('b0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000024'), -- map-set
  ('b0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000014'); -- dom


-- ============================================================
-- TOPIC 5: Variables & Data Types (Easy) — 10 widgets
-- ============================================================

-- Q5-01: quiz — typeof operator
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000001', 'quiz', 1,
 '{"question":{"ru":"Что вернёт typeof null?","en":"What does typeof null return?"},"options":[{"ru":"\"null\"","en":"\"null\""},{"ru":"\"undefined\"","en":"\"undefined\""},{"ru":"\"object\"","en":"\"object\""},{"ru":"\"boolean\"","en":"\"boolean\""}]}',
 '{"selectedIndex":2}');

-- Q5-02: quiz — const vs let
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000002', 'quiz', 1,
 '{"question":{"ru":"Какое ключевое слово создаёт блочную переменную, которую нельзя переназначить?","en":"Which keyword creates a block-scoped variable that cannot be reassigned?"},"options":[{"ru":"var","en":"var"},{"ru":"let","en":"let"},{"ru":"const","en":"const"},{"ru":"static","en":"static"}]}',
 '{"selectedIndex":2}');

-- Q5-03: true-false — typeof array
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000003', 'true-false', 1,
 '{"statement":{"ru":"typeof [] возвращает \"array\"","en":"typeof [] returns \"array\""},"explanation":{"ru":"typeof [] возвращает \"object\", так как массивы — это объекты в JS","en":"typeof [] returns \"object\" because arrays are objects in JS"}}',
 '{"isTrue":false}');

-- Q5-04: true-false — NaN comparison
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000004', 'true-false', 1,
 '{"statement":{"ru":"NaN === NaN возвращает true","en":"NaN === NaN returns true"},"explanation":{"ru":"NaN не равен ничему, включая самого себя. Используйте Number.isNaN()","en":"NaN is not equal to anything, including itself. Use Number.isNaN()"}}',
 '{"isTrue":false}');

-- Q5-05: code-completion — typeof check
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000005', 'code-completion', 1,
 '{"code":"if (___ x === \"string\") {\n  console.log(\"x is a string\");\n}","blanks":["___"],"hints":[{"ru":"Оператор для проверки типа","en":"Operator to check the type"}]}',
 '{"answers":["typeof"]}');

-- Q5-06: quiz — type coercion
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000006', 'quiz', 1,
 '{"question":{"ru":"Что вернёт \"5\" + 3?","en":"What does \"5\" + 3 return?"},"options":[{"ru":"8","en":"8"},{"ru":"\"53\"","en":"\"53\""},{"ru":"\"8\"","en":"\"8\""},{"ru":"NaN","en":"NaN"}]}',
 '{"selectedIndex":1}');

-- Q5-07: true-false — undefined vs null
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000007', 'true-false', 1,
 '{"statement":{"ru":"undefined == null возвращает true","en":"undefined == null returns true"},"explanation":{"ru":"При нестрогом сравнении undefined и null считаются равными","en":"With loose equality, undefined and null are considered equal"}}',
 '{"isTrue":true}');

-- Q5-08: code-completion — variable declaration
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000008', 'code-completion', 1,
 '{"code":"___ PI = 3.14159;\nPI = 3.14; // Ошибка!","blanks":["___"],"hints":[{"ru":"Ключевое слово для констант","en":"Keyword for constants"}]}',
 '{"answers":["const"]}');

-- Q5-09: quiz — primitive types
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000009', 'quiz', 1,
 '{"question":{"ru":"Какой из этих типов НЕ является примитивным в JavaScript?","en":"Which of these is NOT a primitive type in JavaScript?"},"options":[{"ru":"string","en":"string"},{"ru":"boolean","en":"boolean"},{"ru":"object","en":"object"},{"ru":"symbol","en":"symbol"}]}',
 '{"selectedIndex":2}');

-- Q5-10: code-completion — Boolean coercion
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000010', 'code-completion', 1,
 '{"code":"const isValid = ___(\"\"); // false\nconst isTrue = ___(\"hello\"); // true","blanks":["___","___"],"hints":[{"ru":"Функция для явного преобразования в boolean","en":"Function for explicit boolean conversion"}]}',
 '{"answers":["Boolean","Boolean"]}');


-- ============================================================
-- TOPIC 6: Arrays & Strings (Easy) — 10 widgets
-- ============================================================

-- Q6-01: quiz — array method
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000011', 'quiz', 1,
 '{"question":{"ru":"Какой метод добавляет элемент в конец массива?","en":"Which method adds an element to the end of an array?"},"options":[{"ru":"unshift()","en":"unshift()"},{"ru":"push()","en":"push()"},{"ru":"pop()","en":"pop()"},{"ru":"shift()","en":"shift()"}]}',
 '{"selectedIndex":1}');

-- Q6-02: true-false — map returns new array
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000012', 'true-false', 1,
 '{"statement":{"ru":"Метод map() изменяет исходный массив","en":"The map() method modifies the original array"},"explanation":{"ru":"map() возвращает новый массив, не изменяя исходный","en":"map() returns a new array without modifying the original"}}',
 '{"isTrue":false}');

-- Q6-03: code-completion — destructuring
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000013', 'code-completion', 1,
 '{"code":"const [first, ___] = [1, 2, 3];\nconsole.log(first); // 1","blanks":["___"],"hints":[{"ru":"Оператор для получения остальных элементов","en":"Operator to get the rest of elements"}]}',
 '{"answers":["...rest"]}');

-- Q6-04: quiz — string method
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000014', 'quiz', 1,
 '{"question":{"ru":"Какой метод разделяет строку на массив?","en":"Which method splits a string into an array?"},"options":[{"ru":"join()","en":"join()"},{"ru":"slice()","en":"slice()"},{"ru":"split()","en":"split()"},{"ru":"splice()","en":"splice()"}]}',
 '{"selectedIndex":2}');

-- Q6-05: true-false — spread operator
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000015', 'true-false', 1,
 '{"statement":{"ru":"[...arr1, ...arr2] создаёт новый массив с элементами обоих массивов","en":"[...arr1, ...arr2] creates a new array with elements from both arrays"},"explanation":{"ru":"Spread-оператор разворачивает элементы массивов в новый массив","en":"Spread operator expands array elements into a new array"}}',
 '{"isTrue":true}');

-- Q6-06: code-completion — filter
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000016', 'code-completion', 1,
 '{"code":"const evens = [1,2,3,4].___(\n  num => num % 2 === 0\n); // [2, 4]","blanks":["___"],"hints":[{"ru":"Метод для фильтрации массива","en":"Method to filter an array"}]}',
 '{"answers":["filter"]}');

-- Q6-07: quiz — find vs filter
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000017', 'quiz', 1,
 '{"question":{"ru":"Что возвращает find() если элемент не найден?","en":"What does find() return if no element is found?"},"options":[{"ru":"null","en":"null"},{"ru":"[]","en":"[]"},{"ru":"undefined","en":"undefined"},{"ru":"-1","en":"-1"}]}',
 '{"selectedIndex":2}');

-- Q6-08: code-completion — template literal
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000018', 'code-completion', 1,
 '{"code":"const name = \"World\";\nconst greeting = ___Hello, ${name}!___; // \"Hello, World!\"","blanks":["___","___"],"hints":[{"ru":"Символы для шаблонных строк","en":"Characters for template literals"}]}',
 '{"answers":["`","`"]}');

-- Q6-09: true-false — includes method
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000019', 'true-false', 1,
 '{"statement":{"ru":"[1, 2, NaN].includes(NaN) возвращает true","en":"[1, 2, NaN].includes(NaN) returns true"},"explanation":{"ru":"includes() корректно обрабатывает NaN, в отличие от indexOf()","en":"includes() correctly handles NaN, unlike indexOf()"}}',
 '{"isTrue":true}');

-- Q6-10: code-completion — reduce
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000020', 'code-completion', 1,
 '{"code":"const sum = [1,2,3].___(\n  (acc, num) => acc + num, 0\n); // 6","blanks":["___"],"hints":[{"ru":"Метод для свёртки массива","en":"Method to reduce an array"}]}',
 '{"answers":["reduce"]}');


-- ============================================================
-- TOPIC 7: Functions & Scope (Easy) — 10 widgets
-- ============================================================

-- Q7-01: quiz — function declaration vs expression
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000021', 'quiz', 1,
 '{"question":{"ru":"Что такое hoisting для function declaration?","en":"What is hoisting for function declarations?"},"options":[{"ru":"Функция не поднимается","en":"Function is not hoisted"},{"ru":"Поднимается только имя","en":"Only the name is hoisted"},{"ru":"Функция поднимается полностью","en":"Function is fully hoisted"},{"ru":"Вызывает ошибку","en":"Causes an error"}]}',
 '{"selectedIndex":2}');

-- Q7-02: true-false — arrow function this
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000022', 'true-false', 1,
 '{"statement":{"ru":"Стрелочные функции имеют своё собственное значение this","en":"Arrow functions have their own this value"},"explanation":{"ru":"Стрелочные функции наследуют this от окружающего контекста","en":"Arrow functions inherit this from the surrounding context"}}',
 '{"isTrue":false}');

-- Q7-03: code-completion — closure
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000023', 'code-completion', 1,
 '{"code":"function counter() {\n  let count = 0;\n  return function() {\n    return ___count;\n  };\n}","blanks":["___"],"hints":[{"ru":"Оператор для увеличения перед возвратом","en":"Operator to increment before returning"}]}',
 '{"answers":["++"]}');

-- Q7-04: quiz — let vs var hoisting
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000024', 'quiz', 1,
 '{"question":{"ru":"Что произойдёт при обращении к let-переменной до её объявления?","en":"What happens when accessing a let variable before declaration?"},"options":[{"ru":"undefined","en":"undefined"},{"ru":"null","en":"null"},{"ru":"ReferenceError","en":"ReferenceError"},{"ru":"0","en":"0"}]}',
 '{"selectedIndex":2}');

-- Q7-05: true-false — block scope
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000025', 'true-false', 1,
 '{"statement":{"ru":"var имеет блочную область видимости","en":"var has block scope"},"explanation":{"ru":"var имеет функциональную область видимости, не блочную","en":"var has function scope, not block scope"}}',
 '{"isTrue":false}');

-- Q7-06: code-completion — arrow function
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000026', 'code-completion', 1,
 '{"code":"const double = x ___ x * 2;\nconsole.log(double(5)); // 10","blanks":["___"],"hints":[{"ru":"Синтаксис стрелочной функции","en":"Arrow function syntax"}]}',
 '{"answers":["=>"]}');

-- Q7-07: quiz — IIFE purpose
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000027', 'quiz', 1,
 '{"question":{"ru":"Для чего используется IIFE?","en":"What is IIFE used for?"},"options":[{"ru":"Для асинхронности","en":"For async operations"},{"ru":"Для создания изолированной области видимости","en":"For creating isolated scope"},{"ru":"Для наследования","en":"For inheritance"},{"ru":"Для итерации","en":"For iteration"}]}',
 '{"selectedIndex":1}');

-- Q7-08: true-false — closure memory
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000028', 'true-false', 1,
 '{"statement":{"ru":"Замыкания сохраняют доступ к переменным внешней функции после её завершения","en":"Closures maintain access to outer function variables after it returns"},"explanation":{"ru":"Это ключевая особенность замыканий в JavaScript","en":"This is a key feature of closures in JavaScript"}}',
 '{"isTrue":true}');

-- Q7-09: code-completion — default parameter
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000029', 'code-completion', 1,
 '{"code":"function greet(name ___ \"Guest\") {\n  return \"Hello, \" + name;\n}\ngreet(); // \"Hello, Guest\"","blanks":["___"],"hints":[{"ru":"Оператор для значения по умолчанию","en":"Operator for default value"}]}',
 '{"answers":["="]}');

-- Q7-10: quiz — rest parameters
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000030', 'quiz', 1,
 '{"question":{"ru":"Как получить все аргументы функции как массив?","en":"How to get all function arguments as an array?"},"options":[{"ru":"arguments[]","en":"arguments[]"},{"ru":"...args","en":"...args"},{"ru":"args()","en":"args()"},{"ru":"@args","en":"@args"}]}',
 '{"selectedIndex":1}');


-- ============================================================
-- TOPIC 8: Async JavaScript (Medium) — 12 widgets
-- ============================================================

-- Q8-01: quiz — Promise states
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000031', 'quiz', 2,
 '{"question":{"ru":"Какие три состояния может иметь Promise?","en":"What are the three states a Promise can have?"},"options":[{"ru":"start, process, end","en":"start, process, end"},{"ru":"pending, fulfilled, rejected","en":"pending, fulfilled, rejected"},{"ru":"waiting, success, error","en":"waiting, success, error"},{"ru":"open, closed, error","en":"open, closed, error"}]}',
 '{"selectedIndex":1}');

-- Q8-02: true-false — async returns Promise
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000032', 'true-false', 2,
 '{"statement":{"ru":"Функция с ключевым словом async всегда возвращает Promise","en":"A function with async keyword always returns a Promise"},"explanation":{"ru":"async функции автоматически оборачивают возвращаемое значение в Promise","en":"async functions automatically wrap the return value in a Promise"}}',
 '{"isTrue":true}');

-- Q8-03: code-completion — await usage
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000033', 'code-completion', 2,
 '{"code":"async function getData() {\n  const response = ___ fetch(\"/api\");\n  const data = ___ response.json();\n  return data;\n}","blanks":["___","___"],"hints":[{"ru":"Ключевое слово для ожидания Promise","en":"Keyword to wait for a Promise"}]}',
 '{"answers":["await","await"]}');

-- Q8-04: quiz — Event Loop order
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000034', 'quiz', 2,
 '{"question":{"ru":"Что выполнится первым: setTimeout(fn, 0) или Promise.resolve().then(fn)?","en":"What executes first: setTimeout(fn, 0) or Promise.resolve().then(fn)?"},"options":[{"ru":"setTimeout","en":"setTimeout"},{"ru":"Promise.then","en":"Promise.then"},{"ru":"Одновременно","en":"Simultaneously"},{"ru":"Зависит от браузера","en":"Depends on browser"}]}',
 '{"selectedIndex":1}');

-- Q8-05: true-false — try-catch with await
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000035', 'true-false', 2,
 '{"statement":{"ru":"try/catch работает с await для отлова rejected Promise","en":"try/catch works with await to catch rejected Promises"},"explanation":{"ru":"При использовании await, rejected Promise выбрасывает исключение","en":"When using await, a rejected Promise throws an exception"}}',
 '{"isTrue":true}');

-- Q8-06: code-completion — Promise.all
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000036', 'code-completion', 2,
 '{"code":"const results = await Promise.___(\n  [fetch(url1), fetch(url2)]\n);","blanks":["___"],"hints":[{"ru":"Метод для параллельного выполнения промисов","en":"Method for parallel promise execution"}]}',
 '{"answers":["all"]}');

-- Q8-07: quiz — fetch response
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000037', 'quiz', 2,
 '{"question":{"ru":"Когда fetch Promise reject-ится?","en":"When does fetch Promise reject?"},"options":[{"ru":"При HTTP ошибке (404, 500)","en":"On HTTP error (404, 500)"},{"ru":"Только при сетевой ошибке","en":"Only on network error"},{"ru":"При любой ошибке","en":"On any error"},{"ru":"Никогда","en":"Never"}]}',
 '{"selectedIndex":1}');

-- Q8-08: true-false — microtask queue
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000038', 'true-false', 2,
 '{"statement":{"ru":"Promise callbacks помещаются в очередь микрозадач","en":"Promise callbacks are placed in the microtask queue"},"explanation":{"ru":"Микрозадачи выполняются до макрозадач (setTimeout)","en":"Microtasks execute before macrotasks (setTimeout)"}}',
 '{"isTrue":true}');

-- Q8-09: code-completion — catch error
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000039', 'code-completion', 2,
 '{"code":"fetch(url)\n  .then(res => res.json())\n  .___(error => console.error(error));","blanks":["___"],"hints":[{"ru":"Метод для обработки ошибок промиса","en":"Method to handle promise errors"}]}',
 '{"answers":["catch"]}');

-- Q8-10: quiz — async error handling
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000040', 'quiz', 2,
 '{"question":{"ru":"Какой метод Promise выполняется всегда, независимо от результата?","en":"Which Promise method always executes regardless of result?"},"options":[{"ru":"then()","en":"then()"},{"ru":"catch()","en":"catch()"},{"ru":"finally()","en":"finally()"},{"ru":"done()","en":"done()"}]}',
 '{"selectedIndex":2}');

-- Q8-11: code-completion — Promise creation
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000041', 'code-completion', 2,
 '{"code":"const promise = new Promise((resolve, ___) => {\n  // async operation\n});","blanks":["___"],"hints":[{"ru":"Второй параметр конструктора Promise","en":"Second parameter of Promise constructor"}]}',
 '{"answers":["reject"]}');

-- Q8-12: true-false — async IIFE
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000042', 'true-false', 2,
 '{"statement":{"ru":"Можно использовать await на верхнем уровне в модулях ES6","en":"You can use top-level await in ES6 modules"},"explanation":{"ru":"Top-level await поддерживается в ES модулях","en":"Top-level await is supported in ES modules"}}',
 '{"isTrue":true}');


-- ============================================================
-- TOPIC 9: Advanced Concepts (Hard) — 14 widgets
-- ============================================================

-- Q9-01: quiz — this in methods
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000043', 'quiz', 3,
 '{"question":{"ru":"Как явно привязать this к функции навсегда?","en":"How to permanently bind this to a function?"},"options":[{"ru":"call()","en":"call()"},{"ru":"apply()","en":"apply()"},{"ru":"bind()","en":"bind()"},{"ru":"attach()","en":"attach()"}]}',
 '{"selectedIndex":2}');

-- Q9-02: true-false — prototype chain
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000044', 'true-false', 3,
 '{"statement":{"ru":"Все объекты в JavaScript наследуют от Object.prototype","en":"All objects in JavaScript inherit from Object.prototype"},"explanation":{"ru":"Кроме объектов, созданных с Object.create(null)","en":"Except objects created with Object.create(null)"}}',
 '{"isTrue":true}');

-- Q9-03: code-completion — debounce implementation
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000045', 'code-completion', 3,
 '{"code":"function debounce(fn, delay) {\n  let timeoutId;\n  return function(...args) {\n    ___(timeoutId);\n    timeoutId = setTimeout(() => fn(...args), delay);\n  };\n}","blanks":["___"],"hints":[{"ru":"Функция для отмены таймера","en":"Function to cancel timer"}]}',
 '{"answers":["clearTimeout"]}');

-- Q9-04: quiz — Map vs Object
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000046', 'quiz', 3,
 '{"question":{"ru":"Какое преимущество Map перед Object для ключей?","en":"What advantage does Map have over Object for keys?"},"options":[{"ru":"Быстрее работает","en":"Works faster"},{"ru":"Любые типы ключей","en":"Any type of keys"},{"ru":"Автоматическая сортировка","en":"Automatic sorting"},{"ru":"Меньше памяти","en":"Less memory"}]}',
 '{"selectedIndex":1}');

-- Q9-05: true-false — JSON.stringify
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000047', 'true-false', 3,
 '{"statement":{"ru":"JSON.stringify() сохраняет методы объекта","en":"JSON.stringify() preserves object methods"},"explanation":{"ru":"Функции и undefined игнорируются при сериализации","en":"Functions and undefined are ignored during serialization"}}',
 '{"isTrue":false}');

-- Q9-06: code-completion — prototype method
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000048', 'code-completion', 3,
 '{"code":"function Person(name) {\n  this.name = name;\n}\nPerson.___.greet = function() {\n  return \"Hi, \" + this.name;\n};","blanks":["___"],"hints":[{"ru":"Свойство для добавления методов всем экземплярам","en":"Property to add methods to all instances"}]}',
 '{"answers":["prototype"]}');

-- Q9-07: quiz — DOM event delegation
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000049', 'quiz', 3,
 '{"question":{"ru":"Какое свойство события указывает на элемент, вызвавший событие?","en":"Which event property points to the element that triggered the event?"},"options":[{"ru":"event.currentTarget","en":"event.currentTarget"},{"ru":"event.target","en":"event.target"},{"ru":"event.source","en":"event.source"},{"ru":"event.element","en":"event.element"}]}',
 '{"selectedIndex":1}');

-- Q9-08: true-false — WeakMap garbage collection
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000050', 'true-false', 3,
 '{"statement":{"ru":"Ключи в WeakMap могут быть собраны сборщиком мусора","en":"Keys in WeakMap can be garbage collected"},"explanation":{"ru":"WeakMap не препятствует сборке мусора для своих ключей","en":"WeakMap does not prevent garbage collection of its keys"}}',
 '{"isTrue":true}');

-- Q9-09: code-completion — call vs apply
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000051', 'code-completion', 3,
 '{"code":"function greet(greeting, punctuation) {\n  return greeting + \", \" + this.name + punctuation;\n}\nconst person = { name: \"Alice\" };\ngreet.___(person, [\"Hello\", \"!\"]);","blanks":["___"],"hints":[{"ru":"Метод, принимающий аргументы как массив","en":"Method that takes arguments as array"}]}',
 '{"answers":["apply"]}');

-- Q9-10: quiz — Set operations
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000052', 'quiz', 3,
 '{"question":{"ru":"Как получить уникальные элементы массива через Set?","en":"How to get unique array elements using Set?"},"options":[{"ru":"Set.unique(arr)","en":"Set.unique(arr)"},{"ru":"[...new Set(arr)]","en":"[...new Set(arr)]"},{"ru":"arr.toSet()","en":"arr.toSet()"},{"ru":"new Set(arr).toArray()","en":"new Set(arr).toArray()"}]}',
 '{"selectedIndex":1}');

-- Q9-11: true-false — this in global
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000053', 'true-false', 3,
 '{"statement":{"ru":"В strict mode this в глобальной функции равен undefined","en":"In strict mode, this in global function equals undefined"},"explanation":{"ru":"Без strict mode this был бы window (в браузере)","en":"Without strict mode, this would be window (in browser)"}}',
 '{"isTrue":true}');

-- Q9-12: code-completion — Object.create
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000054', 'code-completion', 3,
 '{"code":"const parent = { greet() { return \"Hello\"; } };\nconst child = Object.___(parent);\nchild.greet(); // \"Hello\"","blanks":["___"],"hints":[{"ru":"Метод для создания объекта с указанным прототипом","en":"Method to create object with specified prototype"}]}',
 '{"answers":["create"]}');

-- Q9-13: quiz — JSON parse reviver
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000055', 'quiz', 3,
 '{"question":{"ru":"Для чего служит второй аргумент JSON.parse()?","en":"What is the second argument of JSON.parse() for?"},"options":[{"ru":"Валидация","en":"Validation"},{"ru":"Трансформация значений","en":"Transforming values"},{"ru":"Обработка ошибок","en":"Error handling"},{"ru":"Указание кодировки","en":"Specifying encoding"}]}',
 '{"selectedIndex":1}');

-- Q9-14: code-completion — throttle setTimeout
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000056', 'code-completion', 3,
 '{"code":"function throttle(fn, limit) {\n  let inThrottle;\n  return function(...args) {\n    if (!___) {\n      fn.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}","blanks":["___"],"hints":[{"ru":"Переменная-флаг для проверки состояния","en":"Flag variable to check state"}]}',
 '{"answers":["inThrottle"]}');


-- ============================================================
-- CODE-ORDERING widgets for all topics (2 per topic)
-- ============================================================

-- Topic 5: Variables & Data Types - code-ordering
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000057', 'code-ordering', 1,
 '{"description":{"ru":"Расставь строки для объявления и вывода переменных","en":"Arrange lines to declare and log variables"},"lines":["const name = \"Alice\";","let age = 25;","console.log(name);","console.log(age);"]}',
 '{"order":[0,1,2,3]}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000058', 'code-ordering', 1,
 '{"description":{"ru":"Расставь строки для проверки типа и вывода результата","en":"Arrange lines to check type and log result"},"lines":["const value = \"hello\";","const type = typeof value;","if (type === \"string\") {","  console.log(\"It is a string!\");","}"]}',
 '{"order":[0,1,2,3,4]}');

-- Topic 6: Arrays & Strings - code-ordering
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000059', 'code-ordering', 1,
 '{"description":{"ru":"Расставь строки для фильтрации и маппинга массива","en":"Arrange lines to filter and map an array"},"lines":["const numbers = [1, 2, 3, 4, 5];","const filtered = numbers.filter(n => n > 2);","const doubled = filtered.map(n => n * 2);","console.log(doubled);"]}',
 '{"order":[0,1,2,3]}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000060', 'code-ordering', 1,
 '{"description":{"ru":"Расставь строки для деструктуризации и использования spread","en":"Arrange lines for destructuring and spread usage"},"lines":["const arr = [1, 2, 3, 4, 5];","const [first, second, ...rest] = arr;","const newArr = [...rest, 6, 7];","console.log(newArr);"]}',
 '{"order":[0,1,2,3]}');

-- Topic 7: Functions & Scope - code-ordering
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000061', 'code-ordering', 1,
 '{"description":{"ru":"Расставь строки для создания замыкания-счётчика","en":"Arrange lines to create a closure counter"},"lines":["function createCounter() {","  let count = 0;","  return function() {","    return ++count;","  };","}"]}',
 '{"order":[0,1,2,3,4,5]}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000062', 'code-ordering', 1,
 '{"description":{"ru":"Расставь строки для функции с параметром по умолчанию","en":"Arrange lines for function with default parameter"},"lines":["function greet(name = \"Guest\") {","  const message = `Hello, ${name}!`;","  return message;","}","console.log(greet());"]}',
 '{"order":[0,1,2,3,4]}');

-- Topic 8: Async JavaScript - code-ordering
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000063', 'code-ordering', 2,
 '{"description":{"ru":"Расставь строки для async функции с try/catch","en":"Arrange lines for async function with try/catch"},"lines":["async function fetchData(url) {","  try {","    const response = await fetch(url);","    const data = await response.json();","    return data;","  } catch (error) {","    console.error(error);","  }","}"]}',
 '{"order":[0,1,2,3,4,5,6,7,8]}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000064', 'code-ordering', 2,
 '{"description":{"ru":"Расставь строки для Promise.all с обработкой","en":"Arrange lines for Promise.all with handling"},"lines":["const urls = [\"/api/1\", \"/api/2\"];","const promises = urls.map(url => fetch(url));","Promise.all(promises)","  .then(responses => Promise.all(responses.map(r => r.json())))","  .then(data => console.log(data))","  .catch(err => console.error(err));"]}',
 '{"order":[0,1,2,3,4,5]}');

-- Topic 9: Advanced Concepts - code-ordering
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000065', 'code-ordering', 3,
 '{"description":{"ru":"Расставь строки для реализации throttle","en":"Arrange lines to implement throttle"},"lines":["function throttle(fn, limit) {","  let inThrottle;","  return function(...args) {","    if (!inThrottle) {","      fn.apply(this, args);","      inThrottle = true;","      setTimeout(() => inThrottle = false, limit);","    }","  };","}"]}',
 '{"order":[0,1,2,3,4,5,6,7,8,9]}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c1000001-0000-0000-0000-000000000066', 'code-ordering', 3,
 '{"description":{"ru":"Расставь строки для создания объекта через прототип","en":"Arrange lines to create object via prototype"},"lines":["function Animal(name) {","  this.name = name;","}","Animal.prototype.speak = function() {","  console.log(this.name + \" speaks\");","};","const dog = new Animal(\"Rex\");","dog.speak();"]}',
 '{"order":[0,1,2,3,4,5,6,7]}');


-- ============================================================
-- WIDGET ↔ TAG mapping for new widgets
-- ============================================================

insert into public.widget_tag_map (widget_id, tag_id) values
  -- Topic 5: Variables & Data Types
  ('c1000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001'), -- typeof
  ('c1000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000023'), -- variables
  ('c1000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000001'), -- typeof
  ('c1000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000011'), -- coercion
  ('c1000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000001'), -- typeof
  ('c1000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000011'), -- coercion
  ('c1000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000002'), -- basics
  ('c1000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000023'), -- variables
  ('c1000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000002'), -- basics
  ('c1000001-0000-0000-0000-000000000010', 'a0000001-0000-0000-0000-000000000011'), -- coercion
  
  -- Topic 6: Arrays & Strings
  ('c1000001-0000-0000-0000-000000000011', 'a0000001-0000-0000-0000-000000000007'), -- arrays
  ('c1000001-0000-0000-0000-000000000012', 'a0000001-0000-0000-0000-000000000007'), -- arrays
  ('c1000001-0000-0000-0000-000000000013', 'a0000001-0000-0000-0000-000000000017'), -- destructuring
  ('c1000001-0000-0000-0000-000000000014', 'a0000001-0000-0000-0000-000000000021'), -- strings
  ('c1000001-0000-0000-0000-000000000015', 'a0000001-0000-0000-0000-000000000012'), -- es6
  ('c1000001-0000-0000-0000-000000000016', 'a0000001-0000-0000-0000-000000000007'), -- arrays
  ('c1000001-0000-0000-0000-000000000017', 'a0000001-0000-0000-0000-000000000007'), -- arrays
  ('c1000001-0000-0000-0000-000000000018', 'a0000001-0000-0000-0000-000000000021'), -- strings
  ('c1000001-0000-0000-0000-000000000019', 'a0000001-0000-0000-0000-000000000007'), -- arrays
  ('c1000001-0000-0000-0000-000000000020', 'a0000001-0000-0000-0000-000000000007'), -- arrays
  
  -- Topic 7: Functions & Scope
  ('c1000001-0000-0000-0000-000000000021', 'a0000001-0000-0000-0000-000000000010'), -- hoisting
  ('c1000001-0000-0000-0000-000000000022', 'a0000001-0000-0000-0000-000000000016'), -- functions
  ('c1000001-0000-0000-0000-000000000023', 'a0000001-0000-0000-0000-000000000003'), -- closures
  ('c1000001-0000-0000-0000-000000000024', 'a0000001-0000-0000-0000-000000000010'), -- hoisting
  ('c1000001-0000-0000-0000-000000000025', 'a0000001-0000-0000-0000-000000000009'), -- scope
  ('c1000001-0000-0000-0000-000000000026', 'a0000001-0000-0000-0000-000000000016'), -- functions
  ('c1000001-0000-0000-0000-000000000027', 'a0000001-0000-0000-0000-000000000009'), -- scope
  ('c1000001-0000-0000-0000-000000000028', 'a0000001-0000-0000-0000-000000000003'), -- closures
  ('c1000001-0000-0000-0000-000000000029', 'a0000001-0000-0000-0000-000000000016'), -- functions
  ('c1000001-0000-0000-0000-000000000030', 'a0000001-0000-0000-0000-000000000016'), -- functions
  
  -- Topic 8: Async JavaScript
  ('c1000001-0000-0000-0000-000000000031', 'a0000001-0000-0000-0000-000000000006'), -- promises
  ('c1000001-0000-0000-0000-000000000032', 'a0000001-0000-0000-0000-000000000013'), -- async-await
  ('c1000001-0000-0000-0000-000000000033', 'a0000001-0000-0000-0000-000000000013'), -- async-await
  ('c1000001-0000-0000-0000-000000000034', 'a0000001-0000-0000-0000-000000000005'), -- event-loop
  ('c1000001-0000-0000-0000-000000000035', 'a0000001-0000-0000-0000-000000000020'), -- error-handling
  ('c1000001-0000-0000-0000-000000000036', 'a0000001-0000-0000-0000-000000000006'), -- promises
  ('c1000001-0000-0000-0000-000000000037', 'a0000001-0000-0000-0000-000000000019'), -- fetch
  ('c1000001-0000-0000-0000-000000000038', 'a0000001-0000-0000-0000-000000000005'), -- event-loop
  ('c1000001-0000-0000-0000-000000000039', 'a0000001-0000-0000-0000-000000000020'), -- error-handling
  ('c1000001-0000-0000-0000-000000000040', 'a0000001-0000-0000-0000-000000000006'), -- promises
  ('c1000001-0000-0000-0000-000000000041', 'a0000001-0000-0000-0000-000000000006'), -- promises
  ('c1000001-0000-0000-0000-000000000042', 'a0000001-0000-0000-0000-000000000013'), -- async-await
  
  -- Topic 9: Advanced Concepts
  ('c1000001-0000-0000-0000-000000000043', 'a0000001-0000-0000-0000-000000000008'), -- this
  ('c1000001-0000-0000-0000-000000000044', 'a0000001-0000-0000-0000-000000000004'), -- prototypes
  ('c1000001-0000-0000-0000-000000000045', 'a0000001-0000-0000-0000-000000000018'), -- debounce
  ('c1000001-0000-0000-0000-000000000046', 'a0000001-0000-0000-0000-000000000024'), -- map-set
  ('c1000001-0000-0000-0000-000000000047', 'a0000001-0000-0000-0000-000000000025'), -- json
  ('c1000001-0000-0000-0000-000000000048', 'a0000001-0000-0000-0000-000000000004'), -- prototypes
  ('c1000001-0000-0000-0000-000000000049', 'a0000001-0000-0000-0000-000000000014'), -- dom
  ('c1000001-0000-0000-0000-000000000050', 'a0000001-0000-0000-0000-000000000024'), -- map-set
  ('c1000001-0000-0000-0000-000000000051', 'a0000001-0000-0000-0000-000000000008'), -- this
  ('c1000001-0000-0000-0000-000000000052', 'a0000001-0000-0000-0000-000000000024'), -- map-set
  ('c1000001-0000-0000-0000-000000000053', 'a0000001-0000-0000-0000-000000000008'), -- this
  ('c1000001-0000-0000-0000-000000000054', 'a0000001-0000-0000-0000-000000000004'), -- prototypes
  ('c1000001-0000-0000-0000-000000000055', 'a0000001-0000-0000-0000-000000000025'), -- json
  ('c1000001-0000-0000-0000-000000000056', 'a0000001-0000-0000-0000-000000000018'), -- debounce
  
  -- Code-ordering widgets (g057-g066)
  ('c1000001-0000-0000-0000-000000000057', 'a0000001-0000-0000-0000-000000000023'), -- variables
  ('c1000001-0000-0000-0000-000000000058', 'a0000001-0000-0000-0000-000000000001'), -- typeof
  ('c1000001-0000-0000-0000-000000000059', 'a0000001-0000-0000-0000-000000000007'), -- arrays
  ('c1000001-0000-0000-0000-000000000060', 'a0000001-0000-0000-0000-000000000017'), -- destructuring
  ('c1000001-0000-0000-0000-000000000061', 'a0000001-0000-0000-0000-000000000003'), -- closures
  ('c1000001-0000-0000-0000-000000000062', 'a0000001-0000-0000-0000-000000000016'), -- functions
  ('c1000001-0000-0000-0000-000000000063', 'a0000001-0000-0000-0000-000000000013'), -- async-await
  ('c1000001-0000-0000-0000-000000000064', 'a0000001-0000-0000-0000-000000000006'), -- promises
  ('c1000001-0000-0000-0000-000000000065', 'a0000001-0000-0000-0000-000000000018'), -- debounce
  ('c1000001-0000-0000-0000-000000000066', 'a0000001-0000-0000-0000-000000000004'); -- prototypes


-- ============================================================
-- TOPIC ↔ WIDGET links
-- ============================================================

insert into public.topic_widgets (topic_id, widget_id, sort_order) values
  -- Topic 5: Variables & Data Types (10 widgets)
  ('b0000001-0000-0000-0000-000000000005', 'c1000001-0000-0000-0000-000000000001', 1),
  ('b0000001-0000-0000-0000-000000000005', 'c1000001-0000-0000-0000-000000000002', 2),
  ('b0000001-0000-0000-0000-000000000005', 'c1000001-0000-0000-0000-000000000003', 3),
  ('b0000001-0000-0000-0000-000000000005', 'c1000001-0000-0000-0000-000000000004', 4),
  ('b0000001-0000-0000-0000-000000000005', 'c1000001-0000-0000-0000-000000000005', 5),
  ('b0000001-0000-0000-0000-000000000005', 'c1000001-0000-0000-0000-000000000006', 6),
  ('b0000001-0000-0000-0000-000000000005', 'c1000001-0000-0000-0000-000000000007', 7),
  ('b0000001-0000-0000-0000-000000000005', 'c1000001-0000-0000-0000-000000000008', 8),
  ('b0000001-0000-0000-0000-000000000005', 'c1000001-0000-0000-0000-000000000009', 9),
  ('b0000001-0000-0000-0000-000000000005', 'c1000001-0000-0000-0000-000000000010', 10),
  
  -- Topic 6: Arrays & Strings (10 widgets)
  ('b0000001-0000-0000-0000-000000000006', 'c1000001-0000-0000-0000-000000000011', 1),
  ('b0000001-0000-0000-0000-000000000006', 'c1000001-0000-0000-0000-000000000012', 2),
  ('b0000001-0000-0000-0000-000000000006', 'c1000001-0000-0000-0000-000000000013', 3),
  ('b0000001-0000-0000-0000-000000000006', 'c1000001-0000-0000-0000-000000000014', 4),
  ('b0000001-0000-0000-0000-000000000006', 'c1000001-0000-0000-0000-000000000015', 5),
  ('b0000001-0000-0000-0000-000000000006', 'c1000001-0000-0000-0000-000000000016', 6),
  ('b0000001-0000-0000-0000-000000000006', 'c1000001-0000-0000-0000-000000000017', 7),
  ('b0000001-0000-0000-0000-000000000006', 'c1000001-0000-0000-0000-000000000018', 8),
  ('b0000001-0000-0000-0000-000000000006', 'c1000001-0000-0000-0000-000000000019', 9),
  ('b0000001-0000-0000-0000-000000000006', 'c1000001-0000-0000-0000-000000000020', 10),
  
  -- Topic 7: Functions & Scope (10 widgets)
  ('b0000001-0000-0000-0000-000000000007', 'c1000001-0000-0000-0000-000000000021', 1),
  ('b0000001-0000-0000-0000-000000000007', 'c1000001-0000-0000-0000-000000000022', 2),
  ('b0000001-0000-0000-0000-000000000007', 'c1000001-0000-0000-0000-000000000023', 3),
  ('b0000001-0000-0000-0000-000000000007', 'c1000001-0000-0000-0000-000000000024', 4),
  ('b0000001-0000-0000-0000-000000000007', 'c1000001-0000-0000-0000-000000000025', 5),
  ('b0000001-0000-0000-0000-000000000007', 'c1000001-0000-0000-0000-000000000026', 6),
  ('b0000001-0000-0000-0000-000000000007', 'c1000001-0000-0000-0000-000000000027', 7),
  ('b0000001-0000-0000-0000-000000000007', 'c1000001-0000-0000-0000-000000000028', 8),
  ('b0000001-0000-0000-0000-000000000007', 'c1000001-0000-0000-0000-000000000029', 9),
  ('b0000001-0000-0000-0000-000000000007', 'c1000001-0000-0000-0000-000000000030', 10),
  
  -- Topic 8: Async JavaScript (12 widgets)
  ('b0000001-0000-0000-0000-000000000008', 'c1000001-0000-0000-0000-000000000031', 1),
  ('b0000001-0000-0000-0000-000000000008', 'c1000001-0000-0000-0000-000000000032', 2),
  ('b0000001-0000-0000-0000-000000000008', 'c1000001-0000-0000-0000-000000000033', 3),
  ('b0000001-0000-0000-0000-000000000008', 'c1000001-0000-0000-0000-000000000034', 4),
  ('b0000001-0000-0000-0000-000000000008', 'c1000001-0000-0000-0000-000000000035', 5),
  ('b0000001-0000-0000-0000-000000000008', 'c1000001-0000-0000-0000-000000000036', 6),
  ('b0000001-0000-0000-0000-000000000008', 'c1000001-0000-0000-0000-000000000037', 7),
  ('b0000001-0000-0000-0000-000000000008', 'c1000001-0000-0000-0000-000000000038', 8),
  ('b0000001-0000-0000-0000-000000000008', 'c1000001-0000-0000-0000-000000000039', 9),
  ('b0000001-0000-0000-0000-000000000008', 'c1000001-0000-0000-0000-000000000040', 10),
  ('b0000001-0000-0000-0000-000000000008', 'c1000001-0000-0000-0000-000000000041', 11),
  ('b0000001-0000-0000-0000-000000000008', 'c1000001-0000-0000-0000-000000000042', 12),
  
  -- Topic 9: Advanced Concepts (14 widgets + 2 code-ordering = 16)
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000043', 1),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000044', 2),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000045', 3),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000046', 4),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000047', 5),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000048', 6),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000049', 7),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000050', 8),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000051', 9),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000052', 10),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000053', 11),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000054', 12),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000055', 13),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000056', 14),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000065', 15),
  ('b0000001-0000-0000-0000-000000000009', 'c1000001-0000-0000-0000-000000000066', 16),
  
  -- Code-ordering widgets for Topics 5-8
  ('b0000001-0000-0000-0000-000000000005', 'c1000001-0000-0000-0000-000000000057', 11),
  ('b0000001-0000-0000-0000-000000000005', 'c1000001-0000-0000-0000-000000000058', 12),
  ('b0000001-0000-0000-0000-000000000006', 'c1000001-0000-0000-0000-000000000059', 11),
  ('b0000001-0000-0000-0000-000000000006', 'c1000001-0000-0000-0000-000000000060', 12),
  ('b0000001-0000-0000-0000-000000000007', 'c1000001-0000-0000-0000-000000000061', 11),
  ('b0000001-0000-0000-0000-000000000007', 'c1000001-0000-0000-0000-000000000062', 12),
  ('b0000001-0000-0000-0000-000000000008', 'c1000001-0000-0000-0000-000000000063', 13),
  ('b0000001-0000-0000-0000-000000000008', 'c1000001-0000-0000-0000-000000000064', 14);
