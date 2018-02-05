/*
  Write a function that creates custom set object. Function
  accepts single optional parameter (array) do define initial
  set content.
  Set should have add(), has(), delete(), forEach(), clear() methods
  and size property. Should not use es6 objects Set, WeakSet,
  but work in similar way. Set should preserve addition order
  in forEach() method.
  mySet = createSet(['a', 'b', 'c'])
*/


const commonObjectPropery = {
  clear() {
    this.data.length = 0;
    if (this.dataKeys) {
      this.dataKeys.length = 0;
    }
  },
  has(el) {
    if (this.dataKeys) {
      return this.dataKeys.includes(el);
    }
    return this.data.includes(el);
  },
  get size() {
    return this.data.length;
  },
  length: 0,
};

const customSetProperty = {
  add(el) {
    if (!this.has(el)) {
      this.data.push(el);
    }
    return this.data;
  },
  delete(el) {
    const flag = this.has(el);
    if (flag) {
      this.data.splice(this.data.indexOf(el), 1);
    }
    return flag;
  },
  forEach(fn) {
    return this.data.forEach(fn);
  },
  createData(initData) {
    initData.forEach(el => {
      if (!this.has(el)) {
        this.data.push(el);
      }
    });
  },
};

const customMapProperty = {
  set(key, value) {
    if (!this.has(key)) {
      this.data.push([key, value]);
      this.dataKeys.push(key);
    }
    return this.data;
  },
  get(key) {
    this.data.some(el => {
      if (el[0] === key) {
        return el[1];
      }
      return false;
    });
  },
  delete(el) {
    const flag = this.has(el[0]);
    if (flag) {
      const index = this.dataKeys.indexOf(el[0]);
      this.data.splice(index, 1);
      this.dataKeys.splice(index, 1);
    }
    return flag;
  },
  forEach(fn) {
    return this.data.forEach((el, i, arr) => fn.call(null, el[1], el[0], arr));
  },
  createData(initData) {
    initData.forEach(el => {
      if (!this.has(el[0])) {
        this.data.push(el);
        this.dataKeys.push(el[0]);
      }
    });
  },
};

export function createSet(arr = []) {
  const obj = {
    data: [],
  };

  Object.setPrototypeOf(customSetProperty, commonObjectPropery);
  Object.setPrototypeOf(obj, customSetProperty);

  obj.createData(arr);

  return obj;
}

/*
  Write a function that creates custom map object. Function
  accepts single optional parameter (array) do define initial
  map content.
  Map should have set(), get(), has(), delete(), forEach(), clear()
  methods and size property. Should not use es6 objects Map, WeakMap,
  but work in similar way. Map should preserve addition order
  in forEach() method.
  myMap = createMap([['a', 1], ['b', 2], ['c', 3]])
*/
export function createMap(arr = []) {
  const obj = {
    dataKeys: [],
    data: [],
  };

  Object.setPrototypeOf(customMapProperty, commonObjectPropery);
  Object.setPrototypeOf(obj, customMapProperty);

  obj.createData(arr);

  return obj;
}

export default {
  createSet,
  createMap,
};
