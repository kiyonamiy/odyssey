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

function creasteTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}

/**
 * 本次重点
 * @param {*} element 子节点对象
 * @param {*} container 父节点 node
 */
function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT" // 区分纯文本节点
      ? document.createTextNode("")
      : document.createElement(element.type);
  // *递归 render，dom 作为父节点（想想 DailyEventType 那次递归，数组想遍历，递归数据结构想递归）
  // 问题：Once we start rendering, we won’t stop until we have rendered the complete element tree. If the element tree is big, it may block the main thread for too long.
  // And if the browser needs to do high priority stuff like handling user input or keeping an animation smooth, it will have to wait until the render finishes.
  element.props.children.forEach(child => render(child, dom));

  // *属性赋值
  const isProperty = key => key !== "children"; // 只需要普通的属性
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name];
    });

  container.appendChild(dom);
}

const Didact = {
  createElement,
  render
};

/** @jsx Didact.createElement */
const element = (
  <div style="background: salmon">
    <h1>Hello World</h1>
    <h2 style="text-align:right">from Didact</h2>
  </div>
);

const container = document.getElementById("root");
Didact.render(element, container);
