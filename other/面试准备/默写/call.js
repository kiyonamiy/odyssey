Function.prototype.myCall = function(context, ...args) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

const person = {
  name: "yuqingbo"
};

const record = function(age, tel) {
  return {
    name: this.name,
    age,
    tel
  };
};

record.myCall(person, 24, "110");
