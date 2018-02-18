function checkNumber(num) {
  if (arguments.length !== 1) {
    throw new Error('arguments are required');
  } else if (!Number.isFinite(num)) {
    throw new Error('arguments have to be type number');
  }
  return num;
}

/*
  Напишите функцию, которая параметрами принимает 2 числа и возвращает их сумму
*/
export function sum(a, b) {
  return checkNumber(a) + checkNumber(b);
}

/*
  Напишите функцию, которая возвращает сумму всех чисел, что передаются параметрами
*/
export function sumAll(...args) {
  if (args.length === 0) {
    throw new Error('arguments are required');
  }
  return args.reduce((sum, el) => sum + checkNumber(el), 0);
}

/*
  Напишите функцию, которая возвращает число x в степень n
*/
export function pow(x, n) {
  return checkNumber(x) ** checkNumber(n);
}

/*
  Напишите функцию, которая возвращает рандомное целое число от from до to
*/
export function random(from, to) {
  return Math.floor(Math.random() * (checkNumber(to) - checkNumber(from)) + from); // eslint-disable-line no-mixed-operators, max-len
}

export default {
  sum,
  sumAll,
  pow,
  random,
};
