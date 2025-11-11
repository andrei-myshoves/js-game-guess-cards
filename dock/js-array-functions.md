# Памятка по методам массивов JavaScript

Полное руководство по методам массивов в JavaScript с примерами использования.

---

## 📋 Содержание

- [Методы, которые НЕ изменяют массив](#методы-которые-не-изменяют-массив)
- [Методы, которые ИЗМЕНЯЮТ массив](#методы-которые-изменяют-массив)
- [Методы поиска и проверки](#методы-поиска-и-проверки)
- [Методы преобразования](#методы-преобразования)
- [Другие полезные методы](#другие-полезные-методы)

---

## Методы, которые НЕ изменяют массив

### `map()` - Преобразование элементов

**Сигнатура:**

```javascript
array.map(callback(element, index, array), thisArg)
```

**Параметры:**

- `callback` - функция, вызываемая для каждого элемента
  - `element` - текущий элемент массива
  - `index` - индекс текущего элемента (необязательно)
  - `array` - сам массив (необязательно)
- `thisArg` - значение `this` для `callback` (необязательно)

**Возвращает:** новый массив с результатами вызова функции для каждого элемента

**Примеры:**

```javascript
const numbers = [1, 2, 3, 4, 5]

// Умножение каждого элемента на 2
const doubled = numbers.map(num => num * 2)
// [2, 4, 6, 8, 10]

// Преобразование объектов
const users = [
	{ name: 'Анна', age: 25 },
	{ name: 'Борис', age: 30 },
]
const names = users.map(user => user.name)
// ['Анна', 'Борис']

// Использование индекса
const indexed = numbers.map((num, index) => `${index}: ${num}`)
// ['0: 1', '1: 2', '2: 3', '3: 4', '4: 5']

// Использование thisArg
const multiplier = {
	factor: 3,
	multiply(num) {
		return num * this.factor
	},
}

const multiplied = numbers.map(function (num) {
	return this.multiply(num)
}, multiplier)
// [3, 6, 9, 12, 15]

// С объектом конфигурации
const config = { min: 2, max: 4 }
const filtered = numbers.map(function (num) {
	if (num >= this.min && num <= this.max) {
		return num * 10
	}
	return num
}, config)
// [1, 20, 30, 40, 5]
```

---

### `filter()` - Фильтрация элементов

**Сигнатура:**

```javascript
array.filter(callback(element, index, array), thisArg)
```

**Параметры:**

- `callback` - функция-предикат, возвращающая `true` для элементов, которые нужно оставить
  - `element` - текущий элемент массива
  - `index` - индекс текущего элемента (необязательно)
  - `array` - сам массив (необязательно)
- `thisArg` - значение `this` для `callback` (необязательно)

**Возвращает:** новый массив с элементами, прошедшими проверку

**Примеры:**

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Четные числа
const evens = numbers.filter(num => num % 2 === 0)
// [2, 4, 6, 8, 10]

// Числа больше 5
const greaterThan5 = numbers.filter(num => num > 5)
// [6, 7, 8, 9, 10]

// Фильтрация объектов
const users = [
	{ name: 'Анна', age: 25 },
	{ name: 'Борис', age: 30 },
	{ name: 'Виктор', age: 20 },
]
const adults = users.filter(user => user.age >= 25)
// [{ name: 'Анна', age: 25 }, { name: 'Борис', age: 30 }]

// Использование thisArg
const ageFilter = {
	minAge: 25,
	checkAge(user) {
		return user.age >= this.minAge
	},
}

const filteredUsers = users.filter(function (user) {
	return this.checkAge(user)
}, ageFilter)
// [{ name: 'Анна', age: 25 }, { name: 'Борис', age: 30 }]

// С объектом условий
const conditions = { threshold: 5 }
const filteredNumbers = numbers.filter(function (num) {
	return num > this.threshold
}, conditions)
// [6, 7, 8, 9, 10]
```

---

### `slice()` - Извлечение части массива

**Сигнатура:**

```javascript
array.slice(start, end)
```

**Параметры:**

- `start` - индекс начала (включительно). По умолчанию `0`
- `end` - индекс конца (не включительно). По умолчанию `array.length`

**Возвращает:** новый массив с копией части исходного массива

**Примеры:**

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8]

// С индекса 2 до 5 (не включительно)
const part1 = numbers.slice(2, 5)
// [3, 4, 5]

// Последние 3 элемента
const part2 = numbers.slice(-3)
// [6, 7, 8]

// Копия всего массива
const copy = numbers.slice()
// [1, 2, 3, 4, 5, 6, 7, 8]

// С начала до предпоследнего
const part3 = numbers.slice(0, -1)
// [1, 2, 3, 4, 5, 6, 7]
```

---

### `concat()` - Объединение массивов

**Сигнатура:**

```javascript
array.concat(value1, value2, ..., valueN)
```

**Параметры:**

- `valueN` - массивы или значения для объединения

**Возвращает:** новый массив, содержащий элементы исходного массива и переданных значений

**Примеры:**

```javascript
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]

// Объединение массивов
const combined = arr1.concat(arr2)
// [1, 2, 3, 4, 5, 6]

// Объединение нескольких массивов
const arr3 = [7, 8]
const all = arr1.concat(arr2, arr3)
// [1, 2, 3, 4, 5, 6, 7, 8]

// Объединение с отдельными значениями
const withValues = arr1.concat(4, 5, 6)
// [1, 2, 3, 4, 5, 6]
```

---

## Методы, которые ИЗМЕНЯЮТ массив

### `sort()` - Сортировка массива

**Сигнатура:**

```javascript
array.sort(compareFunction)
```

**Параметры:**

- `compareFunction` - функция сравнения (необязательно)
  - `a` - первый элемент для сравнения
  - `b` - второй элемент для сравнения
  - Должна возвращать:
    - отрицательное число, если `a` должен быть перед `b`
    - положительное число, если `a` должен быть после `b`
    - `0`, если порядок не важен

**Возвращает:** отсортированный массив (изменяет исходный!)

**Примеры:**

```javascript
const numbers = [10, 5, 40, 25, 1000, 1]

// Сортировка по возрастанию
numbers.sort((a, b) => a - b)
// [1, 5, 10, 25, 40, 1000]

// Сортировка по убыванию
numbers.sort((a, b) => b - a)
// [1000, 40, 25, 10, 5, 1]

// Сортировка объектов
const users = [
	{ name: 'Анна', age: 25 },
	{ name: 'Борис', age: 30 },
	{ name: 'Виктор', age: 20 },
]
users.sort((a, b) => a.age - b.age)
// [{ name: 'Виктор', age: 20 }, { name: 'Анна', age: 25 }, { name: 'Борис', age: 30 }]

// Без функции сравнения (сортировка как строки)
const strings = ['10', '2', '1']
strings.sort()
// ['1', '10', '2'] - ⚠️ Внимание! Сортирует как строки
```

---

### `splice()` - Изменение массива (удаление/добавление)

**Сигнатура:**

```javascript
array.splice(start, deleteCount, item1, item2, ..., itemN)
```

**Параметры:**

- `start` - индекс начала изменений
- `deleteCount` - количество элементов для удаления (необязательно)
- `itemN` - элементы для добавления (необязательно)

**Возвращает:** массив удаленных элементов

**Примеры:**

```javascript
const numbers = [1, 2, 3, 4, 5]

// Удаление элементов
const removed = numbers.splice(2, 2)
// removed: [3, 4]
// numbers: [1, 2, 5]

// Добавление элементов
numbers.splice(1, 0, 10, 20)
// numbers: [1, 10, 20, 2, 5]

// Замена элементов
numbers.splice(2, 2, 30, 40)
// numbers: [1, 10, 30, 40, 5]
```

---

### `push()` - Добавление в конец

**Сигнатура:**

```javascript
array.push(element1, element2, ..., elementN)
```

**Параметры:**

- `elementN` - элементы для добавления

**Возвращает:** новую длину массива

**Примеры:**

```javascript
const arr = [1, 2, 3]

const length = arr.push(4, 5)
// length: 5
// arr: [1, 2, 3, 4, 5]

arr.push(6)
// arr: [1, 2, 3, 4, 5, 6]
```

---

### `pop()` - Удаление с конца

**Сигнатура:**

```javascript
array.pop()
```

**Параметры:** нет

**Возвращает:** удаленный элемент или `undefined`, если массив пуст

**Примеры:**

```javascript
const arr = [1, 2, 3, 4, 5]

const last = arr.pop()
// last: 5
// arr: [1, 2, 3, 4]

const empty = []
const result = empty.pop()
// result: undefined
```

---

### `shift()` - Удаление с начала

**Сигнатура:**

```javascript
array.shift()
```

**Параметры:** нет

**Возвращает:** удаленный элемент или `undefined`, если массив пуст

**Примеры:**

```javascript
const arr = [1, 2, 3, 4, 5]

const first = arr.shift()
// first: 1
// arr: [2, 3, 4, 5]
```

---

### `unshift()` - Добавление в начало

**Сигнатура:**

```javascript
array.unshift(element1, element2, ..., elementN)
```

**Параметры:**

- `elementN` - элементы для добавления

**Возвращает:** новую длину массива

**Примеры:**

```javascript
const arr = [3, 4, 5]

const length = arr.unshift(1, 2)
// length: 5
// arr: [1, 2, 3, 4, 5]
```

---

## Методы поиска и проверки

### `find()` - Поиск первого элемента

**Сигнатура:**

```javascript
array.find(callback(element, index, array), thisArg)
```

**Параметры:**

- `callback` - функция-предикат
  - `element` - текущий элемент
  - `index` - индекс текущего элемента (необязательно)
  - `array` - сам массив (необязательно)
- `thisArg` - значение `this` для `callback` (необязательно)

**Возвращает:** первый найденный элемент или `undefined`

**Примеры:**

```javascript
const numbers = [1, 2, 3, 4, 5]

// Поиск первого четного числа
const even = numbers.find(num => num % 2 === 0)
// 2

// Поиск объекта
const users = [
	{ id: 1, name: 'Анна', age: 25 },
	{ id: 2, name: 'Борис', age: 30 },
	{ id: 3, name: 'Виктор', age: 25 },
]
const user = users.find(u => u.age === 25)
// { id: 1, name: 'Анна', age: 25 }

// Если не найдено
const notFound = numbers.find(num => num > 10)
// undefined

// Использование thisArg
const searchCriteria = {
	minAge: 25,
	checkAge(user) {
		return user.age >= this.minAge
	},
}

const foundUser = users.find(function (user) {
	return this.checkAge(user)
}, searchCriteria)
// { id: 1, name: 'Анна', age: 25 }

// С объектом условий поиска
const conditions = { threshold: 3 }
const foundNumber = numbers.find(function (num) {
	return num > this.threshold
}, conditions)
// 4
```

---

### `findIndex()` - Поиск индекса первого элемента

**Сигнатура:**

```javascript
array.findIndex(callback(element, index, array), thisArg)
```

**Параметры:** аналогично `find()`

**Возвращает:** индекс первого найденного элемента или `-1`

**Примеры:**

```javascript
const numbers = [1, 2, 3, 4, 5]

const index = numbers.findIndex(num => num > 3)
// 3

const notFound = numbers.findIndex(num => num > 10)
// -1

// Использование thisArg
const searchCriteria = {
	threshold: 3,
	check(num) {
		return num > this.threshold
	},
}

const indexWithThis = numbers.findIndex(function (num) {
	return this.check(num)
}, searchCriteria)
// 3

// С объектом условий
const conditions = { minValue: 2 }
const foundIndex = numbers.findIndex(function (num) {
	return num >= this.minValue
}, conditions)
// 1
```

---

### `indexOf()` - Поиск индекса элемента

**Сигнатура:**

```javascript
array.indexOf(searchElement, fromIndex)
```

**Параметры:**

- `searchElement` - элемент для поиска
- `fromIndex` - индекс начала поиска (необязательно, по умолчанию 0)

**Возвращает:** индекс первого вхождения или `-1`

**Примеры:**

```javascript
const arr = [1, 2, 3, 2, 4]

const index = arr.indexOf(2)
// 1

const fromIndex = arr.indexOf(2, 2)
// 3

const notFound = arr.indexOf(10)
// -1
```

---

### `lastIndexOf()` - Поиск последнего индекса элемента

**Сигнатура:**

```javascript
array.lastIndexOf(searchElement, fromIndex)
```

**Параметры:** аналогично `indexOf()`

**Возвращает:** индекс последнего вхождения или `-1`

**Примеры:**

```javascript
const arr = [1, 2, 3, 2, 4]

const lastIndex = arr.lastIndexOf(2)
// 3
```

---

### `includes()` - Проверка наличия элемента

**Сигнатура:**

```javascript
array.includes(searchElement, fromIndex)
```

**Параметры:**

- `searchElement` - элемент для поиска
- `fromIndex` - индекс начала поиска (необязательно)

**Возвращает:** `true` или `false`

**Примеры:**

```javascript
const arr = [1, 2, 3, 4, 5]

const hasThree = arr.includes(3)
// true

const hasTen = arr.includes(10)
// false

const hasThreeFromIndex = arr.includes(3, 3)
// false (поиск начинается с индекса 3)
```

---

### `some()` - Проверка хотя бы одного элемента

**Сигнатура:**

```javascript
array.some(callback(element, index, array), thisArg)
```

**Параметры:** аналогично `find()`

**Возвращает:** `true`, если хотя бы один элемент проходит проверку

**Примеры:**

```javascript
const numbers = [1, 3, 5, 7, 9]

const hasEven = numbers.some(num => num % 2 === 0)
// false

const hasOdd = numbers.some(num => num % 2 !== 0)
// true

const users = [
	{ name: 'Анна', age: 25 },
	{ name: 'Борис', age: 17 },
]
const hasAdult = users.some(user => user.age >= 18)
// true

// Использование thisArg
const ageChecker = {
	minAge: 18,
	checkAge(user) {
		return user.age >= this.minAge
	},
}

const hasAdultWithThis = users.some(function (user) {
	return this.checkAge(user)
}, ageChecker)
// true

// С объектом условий
const numberConditions = { threshold: 5 }
const hasGreater = numbers.some(function (num) {
	return num > this.threshold
}, numberConditions)
// false (все числа меньше или равны 5)
```

---

### `every()` - Проверка всех элементов

**Сигнатура:**

```javascript
array.every(callback(element, index, array), thisArg)
```

**Параметры:** аналогично `find()`

**Возвращает:** `true`, если все элементы проходят проверку

**Примеры:**

```javascript
const numbers = [2, 4, 6, 8, 10]

const allEven = numbers.every(num => num % 2 === 0)
// true

const allGreaterThan5 = numbers.every(num => num > 5)
// false (2 и 4 не больше 5)

const users = [
	{ name: 'Анна', age: 25 },
	{ name: 'Борис', age: 30 },
]
const allAdults = users.every(user => user.age >= 18)
// true

// Использование thisArg
const ageValidator = {
	minAge: 18,
	validate(user) {
		return user.age >= this.minAge
	},
}

const allAdultsWithThis = users.every(function (user) {
	return this.validate(user)
}, ageValidator)
// true

// С объектом условий
const numberValidator = { threshold: 5 }
const allGreater = numbers.every(function (num) {
	return num > this.threshold
}, numberValidator)
// false
```

---

## Методы преобразования

### `reduce()` - Сведение к одному значению

**Сигнатура:**

```javascript
array.reduce(callback(accumulator, currentValue, index, array), initialValue)
```

**Параметры:**

- `callback` - функция аккумулятора
  - `accumulator` - накопленное значение
  - `currentValue` - текущий элемент
  - `index` - индекс текущего элемента (необязательно)
  - `array` - сам массив (необязательно)
- `initialValue` - начальное значение аккумулятора (необязательно)

**Возвращает:** накопленное значение

**Примеры:**

```javascript
const numbers = [1, 2, 3, 4, 5]

// Сумма всех элементов
const sum = numbers.reduce((acc, num) => acc + num, 0)
// 15

// Произведение
const product = numbers.reduce((acc, num) => acc * num, 1)
// 120

// Максимальное значение
const max = numbers.reduce((acc, num) => Math.max(acc, num))
// 5

// Группировка объектов
const users = [
	{ name: 'Анна', age: 25 },
	{ name: 'Борис', age: 30 },
	{ name: 'Виктор', age: 25 },
]
const grouped = users.reduce((acc, user) => {
	const age = user.age
	if (!acc[age]) acc[age] = []
	acc[age].push(user)
	return acc
}, {})
// { 25: [{ name: 'Анна', age: 25 }, { name: 'Виктор', age: 25 }], 30: [{ name: 'Борис', age: 30 }] }

// Использование thisArg (важно: reduce не поддерживает thisArg напрямую,
// но можно использовать замыкание или bind)
const calculator = {
	multiplier: 2,
	calculate(acc, num) {
		return acc + num * this.multiplier
	},
}

// Используем bind для передачи контекста
const sumWithMultiplier = numbers.reduce(
	function (acc, num) {
		return this.calculate(acc, num)
	}.bind(calculator),
	0
)
// 30 (каждое число умножается на 2, затем суммируется)

// Альтернативный способ через замыкание
const multiplier = 3
const sumMultiplied = numbers.reduce((acc, num) => acc + num * multiplier, 0)
// 45
```

---

### `reduceRight()` - Сведение справа налево

**Сигнатура:** аналогично `reduce()`

**Возвращает:** накопленное значение (обрабатывает массив справа налево)

**Примеры:**

```javascript
const numbers = [1, 2, 3, 4]

// Вычитание справа налево
const result = numbers.reduceRight((acc, num) => acc - num)
// 4 - 3 - 2 - 1 = -2
```

---

### `forEach()` - Перебор элементов

**Сигнатура:**

```javascript
array.forEach(callback(element, index, array), thisArg)
```

**Параметры:** аналогично `map()`

**Возвращает:** `undefined`

**Примеры:**

```javascript
const numbers = [1, 2, 3, 4, 5]

// Вывод каждого элемента
numbers.forEach(num => console.log(num))
// 1, 2, 3, 4, 5

// Изменение внешней переменной
let sum = 0
numbers.forEach(num => {
	sum += num
})
// sum: 15

// Использование индекса
numbers.forEach((num, index) => {
	console.log(`Индекс ${index}: ${num}`)
})

// Использование thisArg
const logger = {
	prefix: 'Число:',
	log(num) {
		console.log(`${this.prefix} ${num}`)
	},
}

numbers.forEach(function (num) {
	this.log(num)
}, logger)
// 'Число: 1', 'Число: 2', 'Число: 3', 'Число: 4', 'Число: 5'

// С объектом для накопления
const accumulator = {
	sum: 0,
	add(num) {
		this.sum += num
	},
}

numbers.forEach(function (num) {
	this.add(num)
}, accumulator)
// accumulator.sum: 15
```

---

## Другие полезные методы

### `join()` - Объединение в строку

**Сигнатура:**

```javascript
array.join(separator)
```

**Параметры:**

- `separator` - разделитель (необязательно, по умолчанию `,`)

**Возвращает:** строку с объединенными элементами

**Примеры:**

```javascript
const arr = ['яблоко', 'банан', 'апельсин']

const str1 = arr.join()
// 'яблоко,банан,апельсин'

const str2 = arr.join(' - ')
// 'яблоко - банан - апельсин'

const str3 = arr.join('')
// 'яблокобананапельсин'
```

---

### `reverse()` - Обращение массива

**Сигнатура:**

```javascript
array.reverse()
```

**Параметры:** нет

**Возвращает:** обращенный массив (изменяет исходный!)

**Примеры:**

```javascript
const arr = [1, 2, 3, 4, 5]

const reversed = arr.reverse()
// [5, 4, 3, 2, 1]
// arr тоже стал [5, 4, 3, 2, 1]
```

---

### `flat()` - Выравнивание массива

**Сигнатура:**

```javascript
array.flat(depth)
```

**Параметры:**

- `depth` - глубина выравнивания (необязательно, по умолчанию 1)

**Возвращает:** новый выровненный массив

**Примеры:**

```javascript
const arr = [1, 2, [3, 4], [5, [6, 7]]]

const flat1 = arr.flat()
// [1, 2, 3, 4, 5, [6, 7]]

const flat2 = arr.flat(2)
// [1, 2, 3, 4, 5, 6, 7]

const flatInfinity = arr.flat(Infinity)
// [1, 2, 3, 4, 5, 6, 7]
```

---

### `flatMap()` - Map + Flat

**Сигнатура:**

```javascript
array.flatMap(callback(element, index, array), thisArg)
```

**Параметры:** аналогично `map()`

**Возвращает:** новый массив после map и flat(1)

**Примеры:**

```javascript
const arr = [1, 2, 3]

const result = arr.flatMap(num => [num, num * 2])
// [1, 2, 2, 4, 3, 6]

// Эквивалентно:
// arr.map(num => [num, num * 2]).flat()

// Использование thisArg
const multiplier = {
	factor: 3,
	createPairs(num) {
		return [num, num * this.factor]
	},
}

const resultWithThis = arr.flatMap(function (num) {
	return this.createPairs(num)
}, multiplier)
// [1, 3, 2, 6, 3, 9]

// С объектом конфигурации
const config = { repeat: 2 }
const repeated = arr.flatMap(function (num) {
	return Array(this.repeat).fill(num)
}, config)
// [1, 1, 2, 2, 3, 3]
```

---

### `fill()` - Заполнение массива

**Сигнатура:**

```javascript
array.fill(value, start, end)
```

**Параметры:**

- `value` - значение для заполнения
- `start` - индекс начала (необязательно, по умолчанию 0)
- `end` - индекс конца (необязательно, по умолчанию `array.length`)

**Возвращает:** измененный массив

**Примеры:**

```javascript
const arr = new Array(5)

arr.fill(0)
// [0, 0, 0, 0, 0]

arr.fill(1, 2, 4)
// [0, 0, 1, 1, 0]
```

---

### `keys()` - Итератор индексов

**Сигнатура:**

```javascript
array.keys()
```

**Возвращает:** итератор индексов

**Примеры:**

```javascript
const arr = ['a', 'b', 'c']

for (const index of arr.keys()) {
	console.log(index)
}
// 0, 1, 2
```

---

### `values()` - Итератор значений

**Сигнатура:**

```javascript
array.values()
```

**Возвращает:** итератор значений

**Примеры:**

```javascript
const arr = ['a', 'b', 'c']

for (const value of arr.values()) {
	console.log(value)
}
// 'a', 'b', 'c'
```

---

### `entries()` - Итератор пар [индекс, значение]

**Сигнатура:**

```javascript
array.entries()
```

**Возвращает:** итератор пар [индекс, значение]

**Примеры:**

```javascript
const arr = ['a', 'b', 'c']

for (const [index, value] of arr.entries()) {
	console.log(`${index}: ${value}`)
}
// '0: a', '1: b', '2: c'
```

---

## 📝 Полезные советы

### Методы, которые изменяют исходный массив:

- `sort()`, `reverse()`, `splice()`, `push()`, `pop()`, `shift()`, `unshift()`, `fill()`

### Методы, которые НЕ изменяют исходный массив:

- `map()`, `filter()`, `slice()`, `concat()`, `find()`, `findIndex()`, `indexOf()`, `includes()`, `some()`, `every()`, `reduce()`, `forEach()`, `join()`, `flat()`, `flatMap()`

### Цепочки методов:

```javascript
const result = [1, 2, 3, 4, 5]
	.filter(num => num > 2) // [3, 4, 5]
	.map(num => num * 2) // [6, 8, 10]
	.reduce((sum, num) => sum + num, 0) // 24
```

---

## 🔗 Дополнительные ресурсы

- [MDN Web Docs - Array](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript.info - Массивы](https://learn.javascript.ru/array)
