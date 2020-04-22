function deepCopy(obj) {
  if (obj == null) {
    return null;
  }
  if (typeof obj !== "object") {
    return obj;
  }
  const newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepCopy(obj[key]);
    }
  }
  return newObj;
}

const person = {
  name: {
    first: "Yu",
    last: "Qingbo",
  },
  age: 16,
};

deepCopy(person);
