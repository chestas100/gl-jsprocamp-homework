import lesson2 from '../src/lesson2';

const {
  sum,
  sumAll,
  pow,
  random,
} = lesson2.task;

describe('sum function', () => {
  test('sum works good', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(0, 0)).toBe(0);
    expect(sum(-1, -2)).toBe(-3);
    expect(() => sum(undefined, 0)).toThrow();
    expect(() => sum('1', 0)).toThrow();
    expect(() => sum(NaN, 0)).toThrow();
    expect(() => sum(1, null)).toThrow();
    expect(() => sum({},{})).toThrow();
    expect(() => sum()).toThrow();
    expect(() => sum(1)).toThrow();
    expect(sum(0.2, 0.1)).toBe(0.30000000000000004);
  });
});

describe('sumAll function', () => {
  test('sumAll works good', () => {
    expect(sumAll(1, 2, 4, 5)).toBe(12);
    expect(sumAll(0, 1, -1, 5)).toBe(5);
    expect(() => sumAll(1, undefined, -1, 5)).toThrow();
    expect(() => sumAll(NaN, 0, -1, 5)).toThrow();
    expect(() => sumAll(2, 0, '-1', 5)).toThrow();
    expect(() => sumAll()).toThrow();
    expect(sumAll(1)).toBe(1);
    expect(sumAll(1, -1)).toBe(0);
    expect(sumAll(10000000000000000000, 1)).toBe(10000000000000000001);
  });
});

describe('pow function', () => {
  test('pow works good', () => {
    expect(pow(2, 2)).toBe(4);
    expect(pow(2, 3)).toBe(8);
    expect(() => pow()).toThrow();
    expect(() => pow(1)).toThrow();
    expect(() => pow(1, NaN)).toThrow();
    expect(() => pow('123', 1)).toThrow();
    expect(() => pow(undefined, 1)).toThrow();
    expect(pow(2, 0)).toBe(1);
    expect(pow(0, 1)).toBe(0);
    expect(pow(2, -1)).toBe(0.5);
    expect(pow(213, 8)).toBe(4236788918503438000);
  });
});

describe('random function', () => {
  test('random works good', () => {
    expect(random(2, 3)).toBeGreaterThanOrEqual(2);
    expect(random(2, 3)).toBeLessThanOrEqual(3);
    const randomNumber = random(1, 10);
    const isRandomInteger = Number.isInteger(randomNumber);
    expect(isRandomInteger).toBeTruthy();
  });
});
