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

function createDom(fiber) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  // *属性赋值
  const isProperty = key => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name];
    });

  return dom;
}

function commitRoot() {
  // TODO add nodes to dom
}

function render(element, container) {
  // wip 半成品
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    }
  };
  nextUnitofWork = wipRoot;
}

let nextUnitofWork = null;
let wipRoot = null;

function workLoop(deadLine) {
  let shouldYield = false;
  while (nextUnitofWork && !shouldYield) {
    nextUnitofWork = performUnitOfWork(nextUnitofWork);
    shouldYield = deadline.timeRemaining() < 1; // 剩余时间小于1的时候退出循环，放入 requestIdleCallback(workLoop)，以后执行
  }

  if (!nextUnitofWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

/**
 * 重点 --------------------------------------------------------------------------
 */
function performUnitOfWork(fiber) {
  //add dom node
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
  // create new fibers
  const elements = fiber.props.children;
  let index = 0;
  let preSibing = null;
  while (index < elements.length) {
    const element = element[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      preSibing.sibling = newFiber;
    }
    preSibling = newFiber;
    index++;
  }
  // return next unit of work
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
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
