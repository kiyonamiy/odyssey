const divSelection = d3.select("div");
const spanSelction = divSelection.select("header").select("#one");
console.log(divSelection);
console.log(spanSelction);

// 源码中，如果 querySelector('#111')，返回 null，则报错。
