function objCreate(constructFn, ...args) {
  const obj = new Object();
  obj.__proto__ = constructFn.prototype;
  const result = constructFn.apply(obj, args);
  return typeof result === "object" ? result : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;

  // return 'abc'; // 返回基础类型，继续新建对象
  // return { type: 'study', hours: 16 } // 返回对象，则 person = 这个对象，而不是 new 的
}

const person = objCreate(Person, "yuqingbo", 24);
// const person = new Person("yuqingbo", 24);
