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

function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  // *递归 render，dom 作为父节点
  element.props.children.forEach(child => render(child, dom));

  // *属性赋值
  const isProperty = key => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name];
    });

  container.appendChild(dom);
}

/**
 * 重点 --------------------------------------------------------------------------
 */
let nextUnitofWork = null;

function workLoop(deadLine) {
  let shouldYield = false;
  while (nextUnitofWork && !shouldYield) {
    nextUnitofWork = performUnitOfWork(nextUnitofWork);
    shouldYield = deadline.timeRemaining() < 1; // 剩余时间小于1的时候退出循环，放入 requestIdleCallback(workLoop)，以后执行
  }
  requestIdleCallback(workLoop);
}

function performUnitOfWork(nextUnitofWork) {
  // TODO
}
/**
 * **** --------------------------------------------------------------------------
 */
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
