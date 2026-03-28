-- ============================================================
-- Migration: Add true-false and code-completion widget data
-- ============================================================

-- NEW TAGS
insert into public.tags (id, name, label) values
  ('a0000001-0000-0000-0000-000000000021', 'strings',    '{"ru":"Строки","en":"Strings"}'),
  ('a0000001-0000-0000-0000-000000000022', 'operators',   '{"ru":"Операторы","en":"Operators"}'),
  ('a0000001-0000-0000-0000-000000000023', 'variables',   '{"ru":"Переменные","en":"Variables"}'),
  ('a0000001-0000-0000-0000-000000000024', 'map-set',     '{"ru":"Map/Set","en":"Map/Set"}'),
  ('a0000001-0000-0000-0000-000000000025', 'json',        '{"ru":"JSON","en":"JSON"}');


-- ============================================================
-- TRUE-FALSE WIDGETS  (prefix e)
-- correct_answer: {"isTrue": true/false}
-- ============================================================

-- TF01 difficulty 1 — typeof
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000001', 'true-false', 1,
 '{"statement":{"ru":"typeof undefined возвращает \"undefined\"","en":"typeof undefined returns \"undefined\""},"explanation":{"ru":"Да, typeof undefined === \"undefined\"","en":"Yes, typeof undefined === \"undefined\""}}',
 '{"isTrue":true}');

-- TF02 difficulty 1 — typeof
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000002', 'true-false', 1,
 '{"statement":{"ru":"typeof null возвращает \"null\"","en":"typeof null returns \"null\""},"explanation":{"ru":"typeof null возвращает \"object\" — это известный баг языка","en":"typeof null returns \"object\" — this is a well-known language bug"}}',
 '{"isTrue":false}');

-- TF03 difficulty 1 — coercion
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000003', 'true-false', 1,
 '{"statement":{"ru":"\"\" == false возвращает true","en":"\"\" == false returns true"},"explanation":{"ru":"Оба значения приводятся к 0 при нестрогом сравнении","en":"Both values coerce to 0 in loose comparison"}}',
 '{"isTrue":true}');

-- TF04 difficulty 1 — hoisting
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000004', 'true-false', 1,
 '{"statement":{"ru":"Переменные, объявленные через var, поднимаются (hoisted) в начало функции","en":"Variables declared with var are hoisted to the top of the function"},"explanation":{"ru":"Да, var-переменные поднимаются, но без значения (undefined)","en":"Yes, var variables are hoisted but without their value (undefined)"}}',
 '{"isTrue":true}');

-- TF05 difficulty 1 — scope
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000005', 'true-false', 1,
 '{"statement":{"ru":"let и const имеют блочную область видимости","en":"let and const have block scope"},"explanation":{"ru":"Да, в отличие от var, let и const ограничены блоком {}","en":"Yes, unlike var, let and const are scoped to the {} block"}}',
 '{"isTrue":true}');

-- TF06 difficulty 1 — basics
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000006', 'true-false', 1,
 '{"statement":{"ru":"NaN === NaN возвращает true","en":"NaN === NaN returns true"},"explanation":{"ru":"NaN не равен ничему, включая самого себя. Используйте Number.isNaN()","en":"NaN is not equal to anything, including itself. Use Number.isNaN()"}}',
 '{"isTrue":false}');

-- TF07 difficulty 2 — closures
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000007', 'true-false', 2,
 '{"statement":{"ru":"Замыкание хранит ссылку на переменную, а не её копию","en":"A closure stores a reference to the variable, not a copy"},"explanation":{"ru":"Замыкание захватывает ссылку, поэтому видит актуальное значение переменной","en":"A closure captures the reference, so it sees the current value of the variable"}}',
 '{"isTrue":true}');

-- TF08 difficulty 2 — this
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000008', 'true-false', 2,
 '{"statement":{"ru":"Стрелочные функции имеют собственный контекст this","en":"Arrow functions have their own this context"},"explanation":{"ru":"Стрелочные функции наследуют this из окружающего лексического контекста","en":"Arrow functions inherit this from the enclosing lexical context"}}',
 '{"isTrue":false}');

-- TF09 difficulty 2 — functions
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000009', 'true-false', 2,
 '{"statement":{"ru":"Function Declaration поднимается (hoisted) целиком, а Function Expression — нет","en":"Function Declaration is fully hoisted, but Function Expression is not"},"explanation":{"ru":"Function Declaration доступна до объявления, Expression — только после присваивания","en":"Function Declaration is available before declaration, Expression — only after assignment"}}',
 '{"isTrue":true}');

-- TF10 difficulty 2 — closures
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000010', 'true-false', 2,
 '{"statement":{"ru":"IIFE (Immediately Invoked Function Expression) создаёт новую область видимости","en":"IIFE (Immediately Invoked Function Expression) creates a new scope"},"explanation":{"ru":"Да, IIFE создаёт функциональную область видимости, изолируя переменные","en":"Yes, IIFE creates a function scope, isolating variables"}}',
 '{"isTrue":true}');

-- TF11 difficulty 2 — promises
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000011', 'true-false', 2,
 '{"statement":{"ru":"Promise.all() возвращает результаты в порядке завершения промисов","en":"Promise.all() returns results in order of completion"},"explanation":{"ru":"Promise.all() сохраняет порядок входного массива, независимо от времени выполнения","en":"Promise.all() preserves input array order, regardless of completion time"}}',
 '{"isTrue":false}');

-- TF12 difficulty 2 — event-loop
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000012', 'true-false', 2,
 '{"statement":{"ru":"setTimeout с задержкой 0 мс выполняется синхронно","en":"setTimeout with 0ms delay executes synchronously"},"explanation":{"ru":"setTimeout всегда асинхронный — callback помещается в очередь макрозадач","en":"setTimeout is always asynchronous — the callback is placed in the macrotask queue"}}',
 '{"isTrue":false}');

-- TF13 difficulty 2 — async-await
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000013', 'true-false', 2,
 '{"statement":{"ru":"async функция всегда возвращает Promise","en":"An async function always returns a Promise"},"explanation":{"ru":"Да, даже если вы возвращаете обычное значение, оно оборачивается в Promise.resolve()","en":"Yes, even if you return a plain value, it gets wrapped in Promise.resolve()"}}',
 '{"isTrue":true}');

-- TF14 difficulty 2 — arrays
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000014', 'true-false', 2,
 '{"statement":{"ru":"Метод .sort() по умолчанию сортирует массив чисел в числовом порядке","en":"The .sort() method sorts an array of numbers numerically by default"},"explanation":{"ru":".sort() по умолчанию сортирует как строки: [1, 10, 2]. Нужен компаратор: .sort((a,b) => a - b)","en":".sort() defaults to string sorting: [1, 10, 2]. Use a comparator: .sort((a,b) => a - b)"}}',
 '{"isTrue":false}');

-- TF15 difficulty 2 — objects
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000015', 'true-false', 2,
 '{"statement":{"ru":"Object.freeze() делает объект полностью неизменяемым, включая вложенные объекты","en":"Object.freeze() makes an object fully immutable, including nested objects"},"explanation":{"ru":"Object.freeze() — поверхностный. Вложенные объекты можно мутировать","en":"Object.freeze() is shallow. Nested objects can still be mutated"}}',
 '{"isTrue":false}');

-- TF16 difficulty 3 — event-loop
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000016', 'true-false', 3,
 '{"statement":{"ru":"Микрозадачи (Promise.then) выполняются перед макрозадачами (setTimeout)","en":"Microtasks (Promise.then) execute before macrotasks (setTimeout)"},"explanation":{"ru":"Да, очередь микрозадач полностью очищается перед каждой макрозадачей","en":"Yes, the microtask queue is fully drained before each macrotask"}}',
 '{"isTrue":true}');

-- TF17 difficulty 3 — prototypes
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000017', 'true-false', 3,
 '{"statement":{"ru":"Object.create(null) создаёт объект без прототипа","en":"Object.create(null) creates an object with no prototype"},"explanation":{"ru":"Да, такой объект не имеет __proto__ и не наследует методы Object.prototype","en":"Yes, such an object has no __proto__ and does not inherit Object.prototype methods"}}',
 '{"isTrue":true}');

-- TF18 difficulty 3 — promises
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000018', 'true-false', 3,
 '{"statement":{"ru":"Promise.race() отклоняется, только если все промисы отклонены","en":"Promise.race() rejects only if all promises reject"},"explanation":{"ru":"Promise.race() возвращает результат первого завершённого промиса — будь то resolve или reject","en":"Promise.race() returns the result of the first settled promise — whether resolved or rejected"}}',
 '{"isTrue":false}');

-- TF19 difficulty 3 — closures
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000019', 'true-false', 3,
 '{"statement":{"ru":"Цикл for с var и setTimeout выведет одинаковые значения для всех итераций","en":"A for loop with var and setTimeout will print the same value for all iterations"},"explanation":{"ru":"Да, var имеет функциональную область видимости, и к моменту вызова callback i уже равно последнему значению","en":"Yes, var has function scope, and by the time callbacks fire, i is already the final value"}}',
 '{"isTrue":true}');

-- TF20 difficulty 1 — arrays
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000020', 'true-false', 1,
 '{"statement":{"ru":"Метод .push() возвращает добавленный элемент","en":"The .push() method returns the added element"},"explanation":{"ru":".push() возвращает новую длину массива, а не добавленный элемент","en":".push() returns the new length of the array, not the added element"}}',
 '{"isTrue":false}');

-- TF21 difficulty 1 — strings
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000021', 'true-false', 1,
 '{"statement":{"ru":"Строки в JavaScript неизменяемы (immutable)","en":"Strings in JavaScript are immutable"},"explanation":{"ru":"Да, методы строк всегда возвращают новую строку, не изменяя исходную","en":"Yes, string methods always return a new string without modifying the original"}}',
 '{"isTrue":true}');

-- TF22 difficulty 2 — destructuring
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000022', 'true-false', 2,
 '{"statement":{"ru":"При деструктуризации можно задать значение по умолчанию","en":"You can set default values when destructuring"},"explanation":{"ru":"Да: const { a = 10 } = {} — a будет 10","en":"Yes: const { a = 10 } = {} — a will be 10"}}',
 '{"isTrue":true}');

-- TF23 difficulty 3 — es6
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000023', 'true-false', 3,
 '{"statement":{"ru":"Symbol.iterator позволяет сделать любой объект итерируемым","en":"Symbol.iterator allows making any object iterable"},"explanation":{"ru":"Да, реализовав метод [Symbol.iterator](), объект можно использовать в for...of","en":"Yes, by implementing the [Symbol.iterator]() method, an object can be used in for...of"}}',
 '{"isTrue":true}');

-- TF24 difficulty 3 — error-handling
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000024', 'true-false', 3,
 '{"statement":{"ru":"Блок finally выполняется даже если в try есть return","en":"The finally block runs even if there is a return in try"},"explanation":{"ru":"Да, finally выполняется всегда, независимо от return, throw или break","en":"Yes, finally always executes, regardless of return, throw, or break"}}',
 '{"isTrue":true}');

-- TF25 difficulty 1 — operators
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('e0000001-0000-0000-0000-000000000025', 'true-false', 1,
 '{"statement":{"ru":"Оператор === сравнивает значения без приведения типов","en":"The === operator compares values without type coercion"},"explanation":{"ru":"Да, строгое сравнение проверяет и тип, и значение без преобразований","en":"Yes, strict comparison checks both type and value without conversions"}}',
 '{"isTrue":true}');


-- ============================================================
-- CODE-COMPLETION WIDGETS  (prefix f)
-- correct_answer: {"answers": ["correctValue"]}
-- ============================================================

-- CC01 difficulty 1 — arrays
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000001', 'code-completion', 1,
 '{"code":"const result = arr.___(x => x > 0);","blanks":["___"],"hints":[{"ru":"Этот метод возвращает новый массив с элементами, прошедшими проверку","en":"This method returns a new array with elements that pass the test"}]}',
 '{"answers":["filter"]}');

-- CC02 difficulty 1 — arrays
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000002', 'code-completion', 1,
 '{"code":"const doubled = [1, 2, 3].___(x => x * 2);","blanks":["___"],"hints":[{"ru":"Метод создаёт новый массив, применяя функцию к каждому элементу","en":"This method creates a new array by applying a function to each element"}]}',
 '{"answers":["map"]}');

-- CC03 difficulty 1 — arrays
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000003', 'code-completion', 1,
 '{"code":"const found = users.___(u => u.id === 5);","blanks":["___"],"hints":[{"ru":"Этот метод возвращает первый элемент, удовлетворяющий условию","en":"This method returns the first element that satisfies the condition"}]}',
 '{"answers":["find"]}');

-- CC04 difficulty 1 — strings
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000004', 'code-completion', 1,
 '{"code":"const upper = \"hello\".___();","blanks":["___"],"hints":[{"ru":"Метод преобразует все символы строки в верхний регистр","en":"This method converts all characters of a string to uppercase"}]}',
 '{"answers":["toUpperCase"]}');

-- CC05 difficulty 1 — basics
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000005', 'code-completion', 1,
 '{"code":"const isNum = ___.isNaN(value);","blanks":["___"],"hints":[{"ru":"Глобальный объект, содержащий числовые утилиты","en":"The global object containing numeric utilities"}]}',
 '{"answers":["Number"]}');

-- CC06 difficulty 1 — arrays
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000006', 'code-completion', 1,
 '{"code":"const hasNeg = [1, -2, 3].___(x => x < 0);","blanks":["___"],"hints":[{"ru":"Возвращает true, если хотя бы один элемент удовлетворяет условию","en":"Returns true if at least one element satisfies the condition"}]}',
 '{"answers":["some"]}');

-- CC07 difficulty 2 — arrays
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000007', 'code-completion', 2,
 '{"code":"const sum = [1, 2, 3].___((___, curr) => ___ + curr, 0);","blanks":["___","___","___"],"hints":[{"ru":"Метод, который сворачивает массив в одно значение. Первый параметр callback — аккумулятор","en":"The method that reduces an array to a single value. First callback param is the accumulator"}]}',
 '{"answers":["reduce","acc","acc"]}');

-- CC08 difficulty 2 — objects
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000008', 'code-completion', 2,
 '{"code":"const keys = Object.___(myObj);","blanks":["___"],"hints":[{"ru":"Статический метод, возвращающий массив ключей объекта","en":"A static method that returns an array of object keys"}]}',
 '{"answers":["keys"]}');

-- CC09 difficulty 2 — destructuring
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000009', 'code-completion', 2,
 '{"code":"const { name, ___: years } = person;","blanks":["___"],"hints":[{"ru":"Переименование свойства при деструктуризации. Какое поле объекта person мы берём?","en":"Renaming a property during destructuring. Which field of person are we extracting?"}]}',
 '{"answers":["age"]}');

-- CC10 difficulty 2 — es6
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000010', 'code-completion', 2,
 '{"code":"const merged = { ___first, ___second };","blanks":["___","___"],"hints":[{"ru":"Оператор из трёх точек для объединения объектов","en":"The three-dot operator used to merge objects"}]}',
 '{"answers":["...","..."]}');

-- CC11 difficulty 2 — promises
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000011', 'code-completion', 2,
 '{"code":"const result = await Promise.___(promise1, promise2);","blanks":["___"],"hints":[{"ru":"Метод, который ждёт выполнения всех промисов","en":"The method that waits for all promises to resolve"}]}',
 '{"answers":["all"]}');

-- CC12 difficulty 2 — async-await
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000012', 'code-completion', 2,
 '{"code":"___ function fetchData() {\n  const res = ___ fetch(\"/api\");\n  return res.json();\n}","blanks":["___","___"],"hints":[{"ru":"Ключевые слова для асинхронных функций и ожидания результата","en":"Keywords for async functions and awaiting a result"}]}',
 '{"answers":["async","await"]}');

-- CC13 difficulty 2 — functions
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000013', 'code-completion', 2,
 '{"code":"const greet = (name) ___ `Hello, ${name}!`;","blanks":["___"],"hints":[{"ru":"Символ стрелочной функции для краткой записи","en":"The arrow function symbol for concise syntax"}]}',
 '{"answers":["=>"]}');

-- CC14 difficulty 2 — json
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000014', 'code-completion', 2,
 '{"code":"const obj = JSON.___(jsonString);","blanks":["___"],"hints":[{"ru":"Метод для преобразования JSON-строки в объект","en":"Method to convert a JSON string into an object"}]}',
 '{"answers":["parse"]}');

-- CC15 difficulty 2 — error-handling
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000015', 'code-completion', 2,
 '{"code":"try {\n  riskyCall();\n} ___ (err) {\n  console.error(err);\n}","blanks":["___"],"hints":[{"ru":"Ключевое слово для перехвата ошибок","en":"Keyword for catching errors"}]}',
 '{"answers":["catch"]}');

-- CC16 difficulty 3 — closures
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000016', 'code-completion', 3,
 '{"code":"function once(fn) {\n  let called = ___;\n  return function(...args) {\n    if (!called) {\n      called = ___;\n      return fn(...args);\n    }\n  };\n}","blanks":["___","___"],"hints":[{"ru":"Начальное значение флага и его значение после первого вызова","en":"Initial flag value and its value after the first call"}]}',
 '{"answers":["false","true"]}');

-- CC17 difficulty 3 — prototypes
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000017', 'code-completion', 3,
 '{"code":"const proto = Object.___(instance);","blanks":["___"],"hints":[{"ru":"Метод для получения прототипа объекта","en":"Method to get the prototype of an object"}]}',
 '{"answers":["getPrototypeOf"]}');

-- CC18 difficulty 3 — event-loop
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000018', 'code-completion', 3,
 '{"code":"queueMicrotask(() => console.log(\"micro\"));\n___(() => console.log(\"macro\"), 0);","blanks":["___"],"hints":[{"ru":"Функция для добавления callback в очередь макрозадач","en":"Function to add a callback to the macrotask queue"}]}',
 '{"answers":["setTimeout"]}');

-- CC19 difficulty 3 — promises
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000019', 'code-completion', 3,
 '{"code":"const first = await Promise.___([\n  fetch(\"/a\"),\n  fetch(\"/b\")\n]);","blanks":["___"],"hints":[{"ru":"Метод, возвращающий результат первого завершённого промиса","en":"The method that returns the result of the first settled promise"}]}',
 '{"answers":["race"]}');

-- CC20 difficulty 1 — objects
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000020', 'code-completion', 1,
 '{"code":"const entries = Object.___(obj);","blanks":["___"],"hints":[{"ru":"Метод, возвращающий массив пар [ключ, значение]","en":"Method that returns an array of [key, value] pairs"}]}',
 '{"answers":["entries"]}');

-- CC21 difficulty 1 — strings
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000021', 'code-completion', 1,
 '{"code":"const words = \"a,b,c\".___(\",\");","blanks":["___"],"hints":[{"ru":"Метод разбивает строку на массив по разделителю","en":"Method that splits a string into an array by a separator"}]}',
 '{"answers":["split"]}');

-- CC22 difficulty 2 — arrays
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000022', 'code-completion', 2,
 '{"code":"const flat = [[1,2],[3,4]].___();","blanks":["___"],"hints":[{"ru":"Метод, который \"разворачивает\" вложенные массивы на один уровень","en":"Method that flattens nested arrays by one level"}]}',
 '{"answers":["flat"]}');

-- CC23 difficulty 3 — es6
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000023', 'code-completion', 3,
 '{"code":"const unique = [...new ___(array)];","blanks":["___"],"hints":[{"ru":"Коллекция, хранящая только уникальные значения","en":"A collection that stores only unique values"}]}',
 '{"answers":["Set"]}');

-- CC24 difficulty 3 — objects
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000024', 'code-completion', 3,
 '{"code":"const frozen = Object.___(obj);","blanks":["___"],"hints":[{"ru":"Метод, запрещающий изменение свойств объекта","en":"Method that prevents modification of object properties"}]}',
 '{"answers":["freeze"]}');

-- CC25 difficulty 2 — variables
insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('f0000001-0000-0000-0000-000000000025', 'code-completion', 2,
 '{"code":"const [first, ___rest] = [1, 2, 3, 4];","blanks":["___"],"hints":[{"ru":"Оператор из трёх точек для сбора оставшихся элементов","en":"The three-dot operator to collect remaining elements"}]}',
 '{"answers":["..."]}');


-- ============================================================
-- WIDGET ↔ TAG links for new widgets
-- ============================================================

insert into public.widget_tag_map (widget_id, tag_id) values
  -- TF01: typeof
  ('e0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001'),
  ('e0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000002'),
  -- TF02: typeof null
  ('e0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000001'),
  ('e0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000002'),
  -- TF03: coercion
  ('e0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000011'),
  ('e0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000002'),
  -- TF04: hoisting
  ('e0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000010'),
  ('e0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000023'),
  -- TF05: scope
  ('e0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000009'),
  ('e0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000012'),
  -- TF06: NaN
  ('e0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000002'),
  ('e0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000022'),
  -- TF07: closures ref
  ('e0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000003'),
  ('e0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000016'),
  -- TF08: arrow this
  ('e0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000008'),
  ('e0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000012'),
  -- TF09: function hoisting
  ('e0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000016'),
  ('e0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000010'),
  -- TF10: IIFE
  ('e0000001-0000-0000-0000-000000000010', 'a0000001-0000-0000-0000-000000000003'),
  ('e0000001-0000-0000-0000-000000000010', 'a0000001-0000-0000-0000-000000000009'),
  -- TF11: Promise.all order
  ('e0000001-0000-0000-0000-000000000011', 'a0000001-0000-0000-0000-000000000006'),
  -- TF12: setTimeout sync
  ('e0000001-0000-0000-0000-000000000012', 'a0000001-0000-0000-0000-000000000005'),
  -- TF13: async returns promise
  ('e0000001-0000-0000-0000-000000000013', 'a0000001-0000-0000-0000-000000000013'),
  ('e0000001-0000-0000-0000-000000000013', 'a0000001-0000-0000-0000-000000000006'),
  -- TF14: sort default
  ('e0000001-0000-0000-0000-000000000014', 'a0000001-0000-0000-0000-000000000007'),
  -- TF15: Object.freeze
  ('e0000001-0000-0000-0000-000000000015', 'a0000001-0000-0000-0000-000000000015'),
  -- TF16: microtask before macrotask
  ('e0000001-0000-0000-0000-000000000016', 'a0000001-0000-0000-0000-000000000005'),
  ('e0000001-0000-0000-0000-000000000016', 'a0000001-0000-0000-0000-000000000006'),
  -- TF17: Object.create(null)
  ('e0000001-0000-0000-0000-000000000017', 'a0000001-0000-0000-0000-000000000004'),
  ('e0000001-0000-0000-0000-000000000017', 'a0000001-0000-0000-0000-000000000015'),
  -- TF18: Promise.race
  ('e0000001-0000-0000-0000-000000000018', 'a0000001-0000-0000-0000-000000000006'),
  -- TF19: var + setTimeout loop
  ('e0000001-0000-0000-0000-000000000019', 'a0000001-0000-0000-0000-000000000003'),
  ('e0000001-0000-0000-0000-000000000019', 'a0000001-0000-0000-0000-000000000009'),
  -- TF20: push returns length
  ('e0000001-0000-0000-0000-000000000020', 'a0000001-0000-0000-0000-000000000007'),
  ('e0000001-0000-0000-0000-000000000020', 'a0000001-0000-0000-0000-000000000002'),
  -- TF21: strings immutable
  ('e0000001-0000-0000-0000-000000000021', 'a0000001-0000-0000-0000-000000000021'),
  ('e0000001-0000-0000-0000-000000000021', 'a0000001-0000-0000-0000-000000000002'),
  -- TF22: destructuring default
  ('e0000001-0000-0000-0000-000000000022', 'a0000001-0000-0000-0000-000000000017'),
  ('e0000001-0000-0000-0000-000000000022', 'a0000001-0000-0000-0000-000000000012'),
  -- TF23: Symbol.iterator
  ('e0000001-0000-0000-0000-000000000023', 'a0000001-0000-0000-0000-000000000012'),
  ('e0000001-0000-0000-0000-000000000023', 'a0000001-0000-0000-0000-000000000015'),
  -- TF24: finally with return
  ('e0000001-0000-0000-0000-000000000024', 'a0000001-0000-0000-0000-000000000020'),
  -- TF25: strict equality
  ('e0000001-0000-0000-0000-000000000025', 'a0000001-0000-0000-0000-000000000022'),
  ('e0000001-0000-0000-0000-000000000025', 'a0000001-0000-0000-0000-000000000002'),

  -- CC01: filter
  ('f0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000007'),
  -- CC02: map
  ('f0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000007'),
  -- CC03: find
  ('f0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000007'),
  -- CC04: toUpperCase
  ('f0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000021'),
  -- CC05: Number.isNaN
  ('f0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000002'),
  -- CC06: some
  ('f0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000007'),
  -- CC07: reduce
  ('f0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000007'),
  ('f0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000016'),
  -- CC08: Object.keys
  ('f0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000015'),
  -- CC09: destructuring rename
  ('f0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000017'),
  ('f0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000012'),
  -- CC10: spread
  ('f0000001-0000-0000-0000-000000000010', 'a0000001-0000-0000-0000-000000000012'),
  ('f0000001-0000-0000-0000-000000000010', 'a0000001-0000-0000-0000-000000000015'),
  -- CC11: Promise.all
  ('f0000001-0000-0000-0000-000000000011', 'a0000001-0000-0000-0000-000000000006'),
  -- CC12: async/await
  ('f0000001-0000-0000-0000-000000000012', 'a0000001-0000-0000-0000-000000000013'),
  ('f0000001-0000-0000-0000-000000000012', 'a0000001-0000-0000-0000-000000000019'),
  -- CC13: arrow =>
  ('f0000001-0000-0000-0000-000000000013', 'a0000001-0000-0000-0000-000000000016'),
  ('f0000001-0000-0000-0000-000000000013', 'a0000001-0000-0000-0000-000000000012'),
  -- CC14: JSON.parse
  ('f0000001-0000-0000-0000-000000000014', 'a0000001-0000-0000-0000-000000000025'),
  -- CC15: try/catch
  ('f0000001-0000-0000-0000-000000000015', 'a0000001-0000-0000-0000-000000000020'),
  -- CC16: once (closure)
  ('f0000001-0000-0000-0000-000000000016', 'a0000001-0000-0000-0000-000000000003'),
  ('f0000001-0000-0000-0000-000000000016', 'a0000001-0000-0000-0000-000000000016'),
  -- CC17: getPrototypeOf
  ('f0000001-0000-0000-0000-000000000017', 'a0000001-0000-0000-0000-000000000004'),
  -- CC18: setTimeout
  ('f0000001-0000-0000-0000-000000000018', 'a0000001-0000-0000-0000-000000000005'),
  -- CC19: Promise.race
  ('f0000001-0000-0000-0000-000000000019', 'a0000001-0000-0000-0000-000000000006'),
  -- CC20: Object.entries
  ('f0000001-0000-0000-0000-000000000020', 'a0000001-0000-0000-0000-000000000015'),
  -- CC21: split
  ('f0000001-0000-0000-0000-000000000021', 'a0000001-0000-0000-0000-000000000021'),
  -- CC22: flat
  ('f0000001-0000-0000-0000-000000000022', 'a0000001-0000-0000-0000-000000000007'),
  ('f0000001-0000-0000-0000-000000000022', 'a0000001-0000-0000-0000-000000000012'),
  -- CC23: Set
  ('f0000001-0000-0000-0000-000000000023', 'a0000001-0000-0000-0000-000000000024'),
  ('f0000001-0000-0000-0000-000000000023', 'a0000001-0000-0000-0000-000000000012'),
  -- CC24: Object.freeze
  ('f0000001-0000-0000-0000-000000000024', 'a0000001-0000-0000-0000-000000000015'),
  -- CC25: rest
  ('f0000001-0000-0000-0000-000000000025', 'a0000001-0000-0000-0000-000000000012'),
  ('f0000001-0000-0000-0000-000000000025', 'a0000001-0000-0000-0000-000000000023');


-- ============================================================
-- TOPIC ↔ WIDGET links for new widgets
-- ============================================================

insert into public.topic_widgets (topic_id, widget_id, sort_order) values
  -- Topic 1: JS Basics — true-false
  ('b0000001-0000-0000-0000-000000000001', 'e0000001-0000-0000-0000-000000000001', 8),
  ('b0000001-0000-0000-0000-000000000001', 'e0000001-0000-0000-0000-000000000002', 9),
  ('b0000001-0000-0000-0000-000000000001', 'e0000001-0000-0000-0000-000000000003', 10),
  ('b0000001-0000-0000-0000-000000000001', 'e0000001-0000-0000-0000-000000000004', 11),
  ('b0000001-0000-0000-0000-000000000001', 'e0000001-0000-0000-0000-000000000005', 12),
  ('b0000001-0000-0000-0000-000000000001', 'e0000001-0000-0000-0000-000000000006', 13),
  ('b0000001-0000-0000-0000-000000000001', 'e0000001-0000-0000-0000-000000000025', 14),
  -- Topic 1: JS Basics — code-completion
  ('b0000001-0000-0000-0000-000000000001', 'f0000001-0000-0000-0000-000000000005', 15),
  ('b0000001-0000-0000-0000-000000000001', 'f0000001-0000-0000-0000-000000000004', 16),
  ('b0000001-0000-0000-0000-000000000001', 'f0000001-0000-0000-0000-000000000021', 17),

  -- Topic 2: Functions & Closures — true-false
  ('b0000001-0000-0000-0000-000000000002', 'e0000001-0000-0000-0000-000000000007', 5),
  ('b0000001-0000-0000-0000-000000000002', 'e0000001-0000-0000-0000-000000000008', 6),
  ('b0000001-0000-0000-0000-000000000002', 'e0000001-0000-0000-0000-000000000009', 7),
  ('b0000001-0000-0000-0000-000000000002', 'e0000001-0000-0000-0000-000000000010', 8),
  ('b0000001-0000-0000-0000-000000000002', 'e0000001-0000-0000-0000-000000000019', 9),
  -- Topic 2: Functions & Closures — code-completion
  ('b0000001-0000-0000-0000-000000000002', 'f0000001-0000-0000-0000-000000000013', 10),
  ('b0000001-0000-0000-0000-000000000002', 'f0000001-0000-0000-0000-000000000016', 11),

  -- Topic 3: Async JS — true-false
  ('b0000001-0000-0000-0000-000000000003', 'e0000001-0000-0000-0000-000000000011', 6),
  ('b0000001-0000-0000-0000-000000000003', 'e0000001-0000-0000-0000-000000000012', 7),
  ('b0000001-0000-0000-0000-000000000003', 'e0000001-0000-0000-0000-000000000013', 8),
  ('b0000001-0000-0000-0000-000000000003', 'e0000001-0000-0000-0000-000000000016', 9),
  ('b0000001-0000-0000-0000-000000000003', 'e0000001-0000-0000-0000-000000000018', 10),
  -- Topic 3: Async JS — code-completion
  ('b0000001-0000-0000-0000-000000000003', 'f0000001-0000-0000-0000-000000000011', 11),
  ('b0000001-0000-0000-0000-000000000003', 'f0000001-0000-0000-0000-000000000012', 12),
  ('b0000001-0000-0000-0000-000000000003', 'f0000001-0000-0000-0000-000000000018', 13),
  ('b0000001-0000-0000-0000-000000000003', 'f0000001-0000-0000-0000-000000000019', 14),

  -- Topic 4: Arrays & Objects — true-false
  ('b0000001-0000-0000-0000-000000000004', 'e0000001-0000-0000-0000-000000000014', 6),
  ('b0000001-0000-0000-0000-000000000004', 'e0000001-0000-0000-0000-000000000015', 7),
  ('b0000001-0000-0000-0000-000000000004', 'e0000001-0000-0000-0000-000000000017', 8),
  ('b0000001-0000-0000-0000-000000000004', 'e0000001-0000-0000-0000-000000000020', 9),
  ('b0000001-0000-0000-0000-000000000004', 'e0000001-0000-0000-0000-000000000021', 10),
  ('b0000001-0000-0000-0000-000000000004', 'e0000001-0000-0000-0000-000000000022', 11),
  -- Topic 4: Arrays & Objects — code-completion
  ('b0000001-0000-0000-0000-000000000004', 'f0000001-0000-0000-0000-000000000001', 12),
  ('b0000001-0000-0000-0000-000000000004', 'f0000001-0000-0000-0000-000000000002', 13),
  ('b0000001-0000-0000-0000-000000000004', 'f0000001-0000-0000-0000-000000000003', 14),
  ('b0000001-0000-0000-0000-000000000004', 'f0000001-0000-0000-0000-000000000006', 15),
  ('b0000001-0000-0000-0000-000000000004', 'f0000001-0000-0000-0000-000000000007', 16),
  ('b0000001-0000-0000-0000-000000000004', 'f0000001-0000-0000-0000-000000000008', 17),
  ('b0000001-0000-0000-0000-000000000004', 'f0000001-0000-0000-0000-000000000009', 18),
  ('b0000001-0000-0000-0000-000000000004', 'f0000001-0000-0000-0000-000000000010', 19),
  ('b0000001-0000-0000-0000-000000000004', 'f0000001-0000-0000-0000-000000000020', 20),
  ('b0000001-0000-0000-0000-000000000004', 'f0000001-0000-0000-0000-000000000022', 21),
  ('b0000001-0000-0000-0000-000000000004', 'f0000001-0000-0000-0000-000000000023', 22),
  ('b0000001-0000-0000-0000-000000000004', 'f0000001-0000-0000-0000-000000000024', 23),
  ('b0000001-0000-0000-0000-000000000004', 'f0000001-0000-0000-0000-000000000025', 24);
