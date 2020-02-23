// const element = (
//   <div id = "foo">
//     <a>bar</a>
//     <b />
//   </div>
// )
// 等价于
// const element = Didact.createElement(
//   "div",
//   { id: "foo" },
//   React.createElement("a", null, "bar"), // <a>bar</a>
//   React.createElement("b") // <b />
// );

// children 可能包含字符串、数字，统一用相同对象形式{type, props}
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
  };
}

// we’ll wrap everything that isn’t an object inside its own element and create a special type for them: TEXT_ELEMENT.
function creasteTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}

const Didact = {
  createElement
};

/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

const container = document.getElementById("root");
ReactDOM.render(element, container);
