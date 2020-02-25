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

function createTextElement(text) {
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
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  updateDom(dom, {}, fiber.props);

  return dom;
}

const isEvent = key => key.startsWith("on");
const isProperty = key => key !== "children" && !isEvent(key);
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next);
// 新增函数，更新 DOM 节点属性
function updateDom(dom, prevProps = {}, nextProps = {}) {
  // 以 “on” 开头的属性作为事件要特别处理
  // 移除旧的或者变化了的的事件处理函数
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });
  // 移除旧的属性
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = "";
    });
  // 添加或者更新属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      // React 规定 style 内联样式是驼峰命名的对象，
      // 根据规范给 style 每个属性单独赋值
      if (name === "style") {
        Object.entries(nextProps[name]).forEach(([key, value]) => {
          dom.style[key] = value;
        });
      } else {
        dom[name] = nextProps[name];
      }
    });

  // 添加新的事件处理函数
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

// 新增函数，提交根结点到 DOM
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

// 新增子函数
function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  // 当 fiber 是函数组件时节点不存在 DOM，
  // 故需要遍历父节点以找到最近的有 DOM 的节点
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom); // 前一版本只有新增
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    // 直接移除 DOM 替换成 commitDeletion 函数
    commitDeletion(fiber, domParent);
  }
  // 递归子节点和兄弟节点
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

// 新增函数，移除 DOM 节点
function commitDeletion(fiber, domParent) {
  // 当 child 是函数组件时不存在 DOM，
  // 故需要递归遍历子节点找到真正的 DOM
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}

function render(element, container) {
  // wip 半成品
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot
  };
  deletions = [];
  nextUnitOfWork = wipRoot; // 因为赋值了 nextUnitOfWork ，requestIdleWork 一直在等待，启动 workLoop 。
}

let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot = null; // 新增变量，跟踪渲染进行中的根 fiber
let deletions = null;

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1; // 剩余时间小于1的时候退出循环，放入 requestIdleCallback(workLoop)，以后执行
  }
  // 当 nextUnitOfWork 为空则表示渲染 fiber 树完成了，
  // 可以提交到 DOM 了
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}
// ***!!!一旦浏览器空闲，就触发执行单元任务
requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
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
    // nextFiber = undefined;
    nextFiber = nextFiber.parent; // TODO 为什么要不断向上找，向上找的时候，这些父节点fiber早就被执行过了，而且也没发什么什么呀 我觉得可以 nextFiber = null 结束循环。
  }
}

let wipFiber = null;
let hookIndex = null;

// 处理函数组件
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = []; // 为每个 fiber 都增加了 hooks 数组  // 新增 hooks 数组以支持同一个组件多次调用 `useState`
  // 执行函数组件得到 children
  // 执行function函数，得到 Elements，
  // （如果这个 < Component /> 里面还有函数组件，一样的道理，执行到 performUnitOfWork，都会再这执行拿到*更里面*的Elements，
  // 因为是一层一层的。
  // 也因为只是执行了一个函数而已，执行完其他的就被回收了，只留下return出来的Elements，自然是记不住之前函数内的变量的。
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function useState(initial) {
  // 新增 hooks 数组以支持同一个组件多次调用 `useState`
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  const hook = {
    // 第一次渲染使用入参，第二次渲染复用前一次的状态
    state: oldHook ? oldHook.state : initial,
    // 保存每次 setState 入参的队列
    queue: []
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => {
    hook.state = action instanceof Function ? action(hook.state) : action;
  });

  // setState 函数用于更新 state，入参 action
  // 是新的 state 值或函数返回新的 state
  const setState = action => {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  // 保存本次 hook
  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

// 处理原生标签组件
function updateHostComponent(fiber) {
  //add dom node
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}

function reconcileChildren(wipFiber, elements) {
  let index = 0;
  // 上次渲染完成之后的 fiber 节点
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let preSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    // 比较当前和上一次渲染的 type，即 DOM tag 'div'，
    // 暂不考虑自定义组件
    const sameType = oldFiber && element && element.type === oldFiber.type;

    // 同类型节点，只需更新节点 props 即可
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom, // 复用旧节点的 DOM
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE" // 新增属性，在 commit 阶段使用
      };
    }

    // 不同类型节点且存在新的元素时，创建新的 DOM 节点
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT" // PLACEMENT 表示需要添加新的节点
      };
    }
    // 不同类型节点，且存在旧的 fiber 节点时，
    // 需要移除该节点
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      // 当最后提交 fiber 树到 DOM 时，我们是从 wipRoot 开始的，
      // 此时没有上一次的 fiber，所以这里用一个数组来跟踪需要
      // 删除的节点
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      // 同步更新下一个旧 fiber 节点
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      preSibling.sibling = newFiber;
    }
    preSibling = newFiber;
    index++;
  }
}

const Didact = {
  useState,
  createElement,
  render
};

/** @jsx Didact.createElement */
function Counter() {
  const [count1, setCount1] = Didact.useState(0); // 当重新渲染的时候，执行到这里！会遍历 hook.actionQueue，全部执行！！！hook.state = action；所以会覆盖！！！
  const [count2, setCount2] = Didact.useState(0);

  return (
    <div>
      <h1
        onClick={() => {
          // 当这么写的时候，浏览器会按顺序执行，虽然会进去setState中，生成新的nextUnitOfWork，但是！！！浏览器并不空闲！！！!!!所以并不会重新渲染，而是执行完这个函数()=>{set,set,set}才会空闲！！！
          // 只会将其放入队列！！！hook.actionQueue 中，queue.push(1, 2, 3)，并没有执行！！！
          setCount1(1);
          setCount1(2);
          setCount1(3);
        }}
      >
        Count: {count1}
      </h1>
      <h2 onClick={() => setCount2(c => c + 1)}>Count: {count2}</h2>
    </div>
  );
}
const element = <Counter />;
const container = document.getElementById("root");
Didact.render(element, container);
