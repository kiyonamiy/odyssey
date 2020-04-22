console.log(window.name.length); // 你会发现，window 自带一个 name 的属性，且是一个空字符串！难怪我后面打印出来是“”！！！幸好我说的是 undefined！牛比！
var name = "外边"; // 等价于 window.name

const opt = {
  name: "Amy",
  name2: this.name,
  say: function () {
    return this.name;
  },
  say2: function () {
    setTimeout(function () {
      console.log(this.name);
    });
  },
  say3: function () {
    setTimeout(() => {
      console.log(this.name);
    });
  },
};

console.log(opt.name2); //1. 这里打印出什么？
console.log(opt.say); //2. 这里打印出什么？
opt.say2(); //3. 这里打印出什么？
opt.say3(); //4. 这里打印出什么？

// undefined
// function() {}
// undefined
// Amy
