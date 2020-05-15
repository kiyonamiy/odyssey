// src/selector.js
function none() {}

function selector(selector) {
  return selector == null
    ? none
    : function () {
        return this.querySelector(selector);
      };
}

// src/select.js
function select(selector) {
  return typeof selector === "string"
    ? new Selection(
        [[document.querySelector(selector)]],
        [document.documentElement]
      )
    : new Selection([[selector]], root);
}

// 导出模块
const d3 = {
  select,
};
