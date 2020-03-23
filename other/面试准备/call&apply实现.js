Function.prototype.myCall = function(context) {
  context = context || window;
  context.fn = this; // this 就是函数，即 record
  let args = [...arguments].slice(1); // arguments 不是纯数组  // 0: person 1: 24 2: "110" length: 3
  const result = context.fn(...args);
  delete context.fn; // 删除原来的
  return result;
};

// 测试
const person = {
  name: "yuqingbo"
};

// 登记个人信息
function record(age, tel) {
  return {
    name: this.name,
    age,
    tel
  };
}

record.myCall(person, 24, "110");
// {name: "yuqingbo", age: 24, tel: "110"}
