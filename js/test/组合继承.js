function Parent(value) {
  this.value = value;
}

Parent.prototype.getValue = function() {
  return this.value;
};

function Child(value) {
  Parent.call(this, value);
}

Child.prototype = new Parent();

// test
const child = new Child(1);
console.log(child.getValue());
child instanceof Parent;
