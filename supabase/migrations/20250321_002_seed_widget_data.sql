-- TAGS:

insert into public.tags (id, name, label) values
  ('a0000001-0000-0000-0000-000000000001', 'typeof',       '{"ru":"typeof","en":"typeof"}'),
  ('a0000001-0000-0000-0000-000000000002', 'basics',       '{"ru":"Основы","en":"Basics"}'),
  ('a0000001-0000-0000-0000-000000000003', 'closures',     '{"ru":"Замыкания","en":"Closures"}'),
  ('a0000001-0000-0000-0000-000000000004', 'prototypes',   '{"ru":"Прототипы","en":"Prototypes"}'),
  ('a0000001-0000-0000-0000-000000000005', 'event-loop',   '{"ru":"Event Loop","en":"Event Loop"}'),
  ('a0000001-0000-0000-0000-000000000006', 'promises',     '{"ru":"Промисы","en":"Promises"}'),
  ('a0000001-0000-0000-0000-000000000007', 'arrays',       '{"ru":"Массивы","en":"Arrays"}'),
  ('a0000001-0000-0000-0000-000000000008', 'this',         '{"ru":"this","en":"this"}'),
  ('a0000001-0000-0000-0000-000000000009', 'scope',        '{"ru":"Область видимости","en":"Scope"}'),
  ('a0000001-0000-0000-0000-000000000010', 'hoisting',     '{"ru":"Hoisting","en":"Hoisting"}'),
  ('a0000001-0000-0000-0000-000000000011', 'coercion',     '{"ru":"Приведение типов","en":"Type Coercion"}'),
  ('a0000001-0000-0000-0000-000000000012', 'es6',          '{"ru":"ES6+","en":"ES6+"}'),
  ('a0000001-0000-0000-0000-000000000013', 'async-await',  '{"ru":"async/await","en":"async/await"}'),
  ('a0000001-0000-0000-0000-000000000014', 'dom',          '{"ru":"DOM","en":"DOM"}'),
  ('a0000001-0000-0000-0000-000000000015', 'objects',      '{"ru":"Объекты","en":"Objects"}'),
  ('a0000001-0000-0000-0000-000000000016', 'functions',    '{"ru":"Функции","en":"Functions"}'),
  ('a0000001-0000-0000-0000-000000000017', 'destructuring','{"ru":"Деструктуризация","en":"Destructuring"}'),
  ('a0000001-0000-0000-0000-000000000018', 'debounce',     '{"ru":"Debounce","en":"Debounce"}'),
  ('a0000001-0000-0000-0000-000000000019', 'fetch',        '{"ru":"Fetch API","en":"Fetch API"}'),
  ('a0000001-0000-0000-0000-000000000020', 'error-handling','{"ru":"Обработка ошибок","en":"Error Handling"}');


-- TOPICS:

insert into public.topics (id, title, description, difficulty, order_index) values
  (
    'b0000001-0000-0000-0000-000000000001',
    '{"ru":"JavaScript: Основы","en":"JavaScript: Basics"}',
    '{"ru":"typeof, приведение типов, hoisting, область видимости","en":"typeof, type coercion, hoisting, scope"}',
    1, 1
  ),
  (
    'b0000001-0000-0000-0000-000000000002',
    '{"ru":"Функции и замыкания","en":"Functions & Closures"}',
    '{"ru":"Замыкания, this, стрелочные функции, IIFE","en":"Closures, this, arrow functions, IIFE"}',
    2, 2
  ),
  (
    'b0000001-0000-0000-0000-000000000003',
    '{"ru":"Асинхронный JavaScript","en":"Async JavaScript"}',
    '{"ru":"Промисы, async/await, Event Loop, fetch","en":"Promises, async/await, Event Loop, fetch"}',
    3, 3
  ),
  (
    'b0000001-0000-0000-0000-000000000004',
    '{"ru":"Массивы и объекты","en":"Arrays & Objects"}',
    '{"ru":"Методы массивов, деструктуризация, spread, прототипы","en":"Array methods, destructuring, spread, prototypes"}',
    2, 4
  );


-- topic ↔ tag
insert into public.topic_tag_map (topic_id, tag_id) values
  -- JS Basics
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001'),
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000002'),
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000010'),
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000009'),
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000011'),
  -- Functions & Closures
  ('b0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000003'),
  ('b0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000008'),
  ('b0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000016'),
  ('b0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000009'),
  -- Async JS
  ('b0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000005'),
  ('b0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000006'),
  ('b0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000013'),
  ('b0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000019'),
  -- Arrays & Objects
  ('b0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000007'),
  ('b0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000015'),
  ('b0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000004'),
  ('b0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000017'),
  ('b0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000012');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000001', 'quiz', 1,
 '{"question":{"ru":"Что вернёт typeof null?","en":"What does typeof null return?"},"options":[{"ru":"null","en":"null"},{"ru":"undefined","en":"undefined"},{"ru":"object","en":"object"}]}',
 '{"selectedIndex":2}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000002', 'quiz', 1,
 '{"question":{"ru":"Что вернёт typeof undefined?","en":"What does typeof undefined return?"},"options":[{"ru":"null","en":"null"},{"ru":"undefined","en":"undefined"},{"ru":"object","en":"object"},{"ru":"string","en":"string"}]}',
 '{"selectedIndex":1}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000003', 'quiz', 1,
 '{"question":{"ru":"Что вернёт typeof NaN?","en":"What does typeof NaN return?"},"options":[{"ru":"NaN","en":"NaN"},{"ru":"number","en":"number"},{"ru":"undefined","en":"undefined"}]}',
 '{"selectedIndex":1}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000004', 'quiz', 1,
 '{"question":{"ru":"Что вернёт выражение 0 == false?","en":"What does 0 == false return?"},"options":[{"ru":"true","en":"true"},{"ru":"false","en":"false"},{"ru":"undefined","en":"undefined"},{"ru":"TypeError","en":"TypeError"}]}',
 '{"selectedIndex":0}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000005', 'quiz', 1,
 '{"question":{"ru":"Что выведет console.log(x); var x = 5;?","en":"What does console.log(x); var x = 5; output?"},"options":[{"ru":"5","en":"5"},{"ru":"undefined","en":"undefined"},{"ru":"ReferenceError","en":"ReferenceError"},{"ru":"null","en":"null"},{"ru":"NaN","en":"NaN"}]}',
 '{"selectedIndex":1}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000006', 'quiz', 2,
 '{"question":{"ru":"Что произойдёт при console.log(x); let x = 5;?","en":"What happens with console.log(x); let x = 5;?"},"options":[{"ru":"undefined","en":"undefined"},{"ru":"5","en":"5"},{"ru":"ReferenceError","en":"ReferenceError"},{"ru":"null","en":"null"}]}',
 '{"selectedIndex":2}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000007', 'quiz', 2,
 '{"question":{"ru":"function make() { let n=0; return ()=>++n; } const f=make(); f(); f(); Что вернёт f()?","en":"function make() { let n=0; return ()=>++n; } const f=make(); f(); f(); What does f() return?"},"options":[{"ru":"1","en":"1"},{"ru":"2","en":"2"},{"ru":"3","en":"3"},{"ru":"undefined","en":"undefined"}]}',
 '{"selectedIndex":2}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000008', 'quiz', 2,
 '{"question":{"ru":"const obj = { name: \"A\", greet: () => this.name }; Что вернёт obj.greet()?","en":"const obj = { name: \"A\", greet: () => this.name }; What does obj.greet() return?"},"options":[{"ru":"A","en":"A"},{"ru":"undefined","en":"undefined"},{"ru":"null","en":"null"},{"ru":"TypeError","en":"TypeError"},{"ru":"\"\"","en":"\"\""}]}',
 '{"selectedIndex":1}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000009', 'quiz', 3,
 '{"question":{"ru":"console.log(1); Promise.resolve().then(()=>console.log(2)); console.log(3); Порядок вывода?","en":"console.log(1); Promise.resolve().then(()=>console.log(2)); console.log(3); Output order?"},"options":[{"ru":"1, 2, 3","en":"1, 2, 3"},{"ru":"1, 3, 2","en":"1, 3, 2"},{"ru":"3, 1, 2","en":"3, 1, 2"},{"ru":"2, 1, 3","en":"2, 1, 3"}]}',
 '{"selectedIndex":1}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000010', 'quiz', 2,
 '{"question":{"ru":"setTimeout(()=>console.log(\"a\"),0); console.log(\"b\"); Что выведется первым?","en":"setTimeout(()=>console.log(\"a\"),0); console.log(\"b\"); What prints first?"},"options":[{"ru":"a","en":"a"},{"ru":"b","en":"b"},{"ru":"Одновременно","en":"Simultaneously"}]}',
 '{"selectedIndex":1}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000011', 'quiz', 1,
 '{"question":{"ru":"Что вернёт Array.isArray([1,2,3])?","en":"What does Array.isArray([1,2,3]) return?"},"options":[{"ru":"true","en":"true"},{"ru":"false","en":"false"},{"ru":"undefined","en":"undefined"},{"ru":"[1,2,3]","en":"[1,2,3]"}]}',
 '{"selectedIndex":0}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000012', 'quiz', 1,
 '{"question":{"ru":"Что вернёт [1,2,3].map(x => x * 2)?","en":"What does [1,2,3].map(x => x * 2) return?"},"options":[{"ru":"[2,4,6]","en":"[2,4,6]"},{"ru":"[1,2,3]","en":"[1,2,3]"},{"ru":"6","en":"6"},{"ru":"undefined","en":"undefined"},{"ru":"[1,4,9]","en":"[1,4,9]"}]}',
 '{"selectedIndex":0}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000013', 'quiz', 2,
 '{"question":{"ru":"const a=[1,2]; const b=[...a]; b.push(3); Чему равен a.length?","en":"const a=[1,2]; const b=[...a]; b.push(3); What is a.length?"},"options":[{"ru":"2","en":"2"},{"ru":"3","en":"3"},{"ru":"undefined","en":"undefined"},{"ru":"TypeError","en":"TypeError"}]}',
 '{"selectedIndex":0}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000014', 'quiz', 3,
 '{"question":{"ru":"async function f(){ throw 1; } f().catch(e=>console.log(e)); Что выведется?","en":"async function f(){ throw 1; } f().catch(e=>console.log(e)); What is logged?"},"options":[{"ru":"1","en":"1"},{"ru":"Error: 1","en":"Error: 1"},{"ru":"undefined","en":"undefined"},{"ru":"Unhandled rejection","en":"Unhandled rejection"},{"ru":"null","en":"null"},{"ru":"Ничего","en":"Nothing"}]}',
 '{"selectedIndex":0}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('c0000001-0000-0000-0000-000000000015', 'quiz', 2,
 '{"question":{"ru":"const o = {a:1, b:2, c:3}; Object.keys(o).length = ?","en":"const o = {a:1, b:2, c:3}; Object.keys(o).length = ?"},"options":[{"ru":"0","en":"0"},{"ru":"1","en":"1"},{"ru":"2","en":"2"},{"ru":"3","en":"3"},{"ru":"undefined","en":"undefined"},{"ru":"NaN","en":"NaN"},{"ru":"6","en":"6"},{"ru":"TypeError","en":"TypeError"}]}',
 '{"selectedIndex":3}');


-- CODE-ORDERING WIDGETS

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('d0000001-0000-0000-0000-000000000001', 'code-ordering', 2,
 '{"description":{"ru":"Расставь строки кода для реализации функции debounce","en":"Arrange the code lines to implement a debounce function"},"lines":["let timeout;","return function(...args) {","clearTimeout(timeout);","timeout = setTimeout(() => fn(...args), delay);","};"] }',
 '{"order":[0,1,2,3,4]}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('d0000001-0000-0000-0000-000000000002', 'code-ordering', 3,
 '{"description":{"ru":"Расставь строки для правильной цепочки промисов","en":"Arrange lines for a correct Promise chain"},"lines":["fetch(\"/api/data\")","  .then(response => response.json())","  .then(data => console.log(data))","  .catch(error => console.error(error));"] }',
 '{"order":[0,1,2,3]}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('d0000001-0000-0000-0000-000000000003', 'code-ordering', 1,
 '{"description":{"ru":"Расставь строки для перебора массива и вывода элементов","en":"Arrange lines to iterate over an array and log elements"},"lines":["const fruits = [\"apple\", \"banana\", \"cherry\"];","fruits.forEach((fruit) => {","  console.log(fruit);","});"] }',
 '{"order":[0,1,2,3]}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('d0000001-0000-0000-0000-000000000004', 'code-ordering', 3,
 '{"description":{"ru":"Расставь строки для async функции получения данных","en":"Arrange lines for an async data-fetching function"},"lines":["async function getData(url) {","  const response = await fetch(url);","  const data = await response.json();","  return data;","}"] }',
 '{"order":[0,1,2,3,4]}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('d0000001-0000-0000-0000-000000000005', 'code-ordering', 2,
 '{"description":{"ru":"Расставь строки для подсчёта суммы через reduce","en":"Arrange lines to calculate sum using reduce"},"lines":["const numbers = [1, 2, 3, 4, 5];","const sum = numbers.reduce((acc, curr) => {","  return acc + curr;","}, 0);","console.log(sum);"] }',
 '{"order":[0,1,2,3,4]}');

insert into public.widgets (id, type, difficulty, payload, correct_answer) values
('d0000001-0000-0000-0000-000000000006', 'code-ordering', 2,
 '{"description":{"ru":"Расставь строки для создания счётчика через замыкание","en":"Arrange lines to create a counter using closures"},"lines":["function createCounter() {","  let count = 0;","  return function() {","    return ++count;","  };","}"] }',
 '{"order":[0,1,2,3,4,5]}');


-- WIDGET and TAG links

insert into public.widget_tag_map (widget_id, tag_id) values
  -- Q1  typeof null → typeof, basics
  ('c0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001'),
  ('c0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000002'),
  -- Q2  typeof undefined → typeof, basics
  ('c0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000001'),
  ('c0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000002'),
  -- Q3  typeof NaN → typeof, basics
  ('c0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000001'),
  ('c0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000002'),
  -- Q4  == coercion → coercion, basics
  ('c0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000011'),
  ('c0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000002'),
  -- Q5  var hoisting → hoisting, scope
  ('c0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000010'),
  ('c0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000009'),
  -- Q6  let TDZ → hoisting, scope, es6
  ('c0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000010'),
  ('c0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000009'),
  ('c0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000012'),
  -- Q7  closure → closures, functions
  ('c0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000003'),
  ('c0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000016'),
  -- Q8  arrow this → this, functions, es6
  ('c0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000008'),
  ('c0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000016'),
  ('c0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000012'),
  -- Q9  Promise order → event-loop, promises
  ('c0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000005'),
  ('c0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000006'),
  -- Q10  setTimeout → event-loop
  ('c0000001-0000-0000-0000-000000000010', 'a0000001-0000-0000-0000-000000000005'),
  -- Q11  Array.isArray → arrays, basics
  ('c0000001-0000-0000-0000-000000000011', 'a0000001-0000-0000-0000-000000000007'),
  ('c0000001-0000-0000-0000-000000000011', 'a0000001-0000-0000-0000-000000000002'),
  -- Q12  map → arrays, es6
  ('c0000001-0000-0000-0000-000000000012', 'a0000001-0000-0000-0000-000000000007'),
  ('c0000001-0000-0000-0000-000000000012', 'a0000001-0000-0000-0000-000000000012'),
  -- Q13  spread → arrays, es6, objects
  ('c0000001-0000-0000-0000-000000000013', 'a0000001-0000-0000-0000-000000000007'),
  ('c0000001-0000-0000-0000-000000000013', 'a0000001-0000-0000-0000-000000000012'),
  ('c0000001-0000-0000-0000-000000000013', 'a0000001-0000-0000-0000-000000000015'),
  -- Q14  async throw → async-await, error-handling
  ('c0000001-0000-0000-0000-000000000014', 'a0000001-0000-0000-0000-000000000013'),
  ('c0000001-0000-0000-0000-000000000014', 'a0000001-0000-0000-0000-000000000020'),
  -- Q15  Object.keys → objects, basics
  ('c0000001-0000-0000-0000-000000000015', 'a0000001-0000-0000-0000-000000000015'),
  ('c0000001-0000-0000-0000-000000000015', 'a0000001-0000-0000-0000-000000000002'),

  -- CO1  debounce → debounce, closures, functions
  ('d0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000018'),
  ('d0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000003'),
  ('d0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000016'),
  -- CO2  Promise chain → promises, fetch
  ('d0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000006'),
  ('d0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000019'),
  -- CO3  forEach → arrays, basics
  ('d0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000007'),
  ('d0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000002'),
  -- CO4  async fetch → async-await, fetch
  ('d0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000013'),
  ('d0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000019'),
  -- CO5  reduce → arrays, functions
  ('d0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000007'),
  ('d0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000016'),
  -- CO6  closure counter → closures, functions
  ('d0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000003'),
  ('d0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000016');


-- TOPIC and WIDGET links 

insert into public.topic_widgets (topic_id, widget_id, sort_order) values
  -- Topic 1: JS Basics (Q1-Q6, CO3)
  ('b0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000001', 1),
  ('b0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000002', 2),
  ('b0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000003', 3),
  ('b0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000004', 4),
  ('b0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000005', 5),
  ('b0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000006', 6),
  ('b0000001-0000-0000-0000-000000000001', 'd0000001-0000-0000-0000-000000000003', 7),

  -- Topic 2: Functions & Closures (Q7, Q8, CO1, CO6)
  ('b0000001-0000-0000-0000-000000000002', 'c0000001-0000-0000-0000-000000000007', 1),
  ('b0000001-0000-0000-0000-000000000002', 'c0000001-0000-0000-0000-000000000008', 2),
  ('b0000001-0000-0000-0000-000000000002', 'd0000001-0000-0000-0000-000000000001', 3),
  ('b0000001-0000-0000-0000-000000000002', 'd0000001-0000-0000-0000-000000000006', 4),

  -- Topic 3: Async JS (Q9, Q10, Q14, CO2, CO4)
  ('b0000001-0000-0000-0000-000000000003', 'c0000001-0000-0000-0000-000000000009', 1),
  ('b0000001-0000-0000-0000-000000000003', 'c0000001-0000-0000-0000-000000000010', 2),
  ('b0000001-0000-0000-0000-000000000003', 'c0000001-0000-0000-0000-000000000014', 3),
  ('b0000001-0000-0000-0000-000000000003', 'd0000001-0000-0000-0000-000000000002', 4),
  ('b0000001-0000-0000-0000-000000000003', 'd0000001-0000-0000-0000-000000000004', 5),

  -- Topic 4: Arrays & Objects (Q11-Q13, Q15, CO5)
  ('b0000001-0000-0000-0000-000000000004', 'c0000001-0000-0000-0000-000000000011', 1),
  ('b0000001-0000-0000-0000-000000000004', 'c0000001-0000-0000-0000-000000000012', 2),
  ('b0000001-0000-0000-0000-000000000004', 'c0000001-0000-0000-0000-000000000013', 3),
  ('b0000001-0000-0000-0000-000000000004', 'c0000001-0000-0000-0000-000000000015', 4),
  ('b0000001-0000-0000-0000-000000000004', 'd0000001-0000-0000-0000-000000000005', 5);
