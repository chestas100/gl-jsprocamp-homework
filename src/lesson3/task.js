/*
  Write a function, that has 2 required parameters, and any amount of optional parameters.
  Function should return a number - amount of optional parameters that were passed into function.
  Hint: you are allowed to modify both function definition and function body.
*/
export function countOptional(a, b, ...rest) {
  return rest.length;
}

/*
  Write your implementation of native Function.prototype.bind method
*/
export function bindContext(fn, context, ...bindArgs) {
  return (...funArgs) => fn.apply(context, bindArgs.concat(funArgs));
}

/*
  Write function that accepts 1 parameter - object. It should add to this object a log interface so as:
  const named = {name: 'Allen'}
  addLogCapability(named);
  named.log() // Log message #5: my name is Allen

  const unnamed = {msg: 'some text'}
  addLogCapability(unnamed);
  unnamed.log() // Log message #8: I dont have name
  unnamed.log() // Log message #9: I dont have name
  unnamed.log() // Log message #10: I dont have name

  Take to account, that you should track log call index starting from 1
*/
export function addLogCapability(object) {
  let counter = 0;
  object.log = function log() {
    counter += 1;
    if (Object.prototype.hasOwnProperty.call(this, 'name')) {
      return `Log message #${counter}: my name is ${object.name}`;
    }
    return `Log message #${counter}: I dont have name`;
  };
}

/*
  Write a function that creates custom topic logger:
  myLogger = logger('My Topic')
  myLogger('first message'); //=> My Topic: first message
*/
export function logger(topic) {
  return msg => `${topic}: ${msg}`;
}

/*
  Implement left to right compose function
*/
export function compose(...args) {
  return name => args.reduce((res, el) => el(res), name);
}

/*
  Implement function that can turn function into partial application
  function sum(a, b) {
    return a+b;
  }

  const partialSum = partial(sum);
  const sumWith4 = partialSum(4);
  sumWith4(5) // 9
*/
export function partial(fn) {
  return (...args) => (...partialArgs) => fn(...args.concat(partialArgs));
}

export default {
  countOptional,
  bindContext,
  addLogCapability,
  logger,
  compose,
  partial,
};
