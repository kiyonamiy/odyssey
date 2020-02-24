const updateValue = e => {
  rerender(e.target.value);
};

const rerender = value => {
  // const element = (
  //   <div>
  //     <input onInput={updateValue} value={value} />
  //     <h2>Hello {value}</h2>
  //   </div>
  // )
  // Didact.render(element, container)
};

// h2 child
const textElement1 = {
  type: "TEXT_ELEMENT",
  props: {
    nodeValue: "Hello",
    children: []
  }
};

// h2 child
const textElement2 = {
  type: "TEXT_ELEMENT",
  props: {
    nodeValue: "world",
    children: []
  }
};

const inputElement = {
  type: "input",
  props: {
    onInput: updateValue,
    value: "world",
    children: []
  }
};

const h2Element = {
  type: "h2",
  props: {
    children: [textElement1, textElement2]
  }
};

const divElement = {
  type: "div",
  props: {
    children: [inputElement, h2Element]
  }
};

const fiber1 = {
  // 根没有类型
  dom: `div#root`,
  props: {
    children: [divElement]
  },
  // parent: null, while(nextFiber) {nextFiber = nextFiber.parent;} 循环终点，觉得没有必要呀？？？
  alternate: null,
  child: fiber2 // 经过一次 reconcileChildren 父子绑定  // if (index === 0) { wipFiber.child = newFiber; }
};

// 不同类型节点且存在新的元素时，创建新的 DOM 节点 if (element && !sameType)
const fiber2 = {
  type: "div",
  dom: null, // 还需要等待下一次进入 performUnitOfWork 执行 fiber.dom = createDom(fiber);
  props: {
    children: [inputElement, h2Element]
  },
  parent: fiber1, // const domParent = fiber.parent.dom; 在最后 commit 中，通过该引用拿到父节点的dom，调用appendChild、removeChild操作当前fiber的dom。
  alternate: null,
  effectTag: "PLACEMENT"
};

const fiber3 = {
  type: "input",
  dom: null,
  props: {
    onInput: updateValue,
    value: "world",
    children: []
  },
  parent: fiber2,
  alternate: null,
  effectTag: "PLACEMENT",
  sibling: fiber4
};

const fiber4 = {
  type: "h2",
  dom: null,
  props: {
    children: [textElement1, textElement2]
  },
  parent: fiber2,
  alternate: null,
  effectTag: "PLACEMENT"
};

// react 之前的实现是通过一次性递归生成dom结构，中间不可中断，如果结构庞大，则会使浏览器的高优先级的功能受到影响（比如动画不能流畅播放）
// 而现在提供的fiber数据结构，配合 requestIdleCallback(workLoop)，是在浏览器空闲之时执行，可间断地生成dom结构，建立fiber树级连接，在最后一次性commit，根据effectTag添加/修改/删除到真实的dom。
// fiber 是一种树形结构，不同于二叉树，是一颗多叉树，使用孩子兄弟表示法。(是对之前的虚拟dom做了一次扩展{type: '', props: {},})一个fiber是根据虚拟dom生成的。
// 每个fiber就是一个工作单元，记录了:
// type: "div", 本单元节点类型，
// dom: null, 本次生成的dom结构，
// props 该元素节点的属性，内部含有 children 保存着孩子的元素信息对象（虚拟dom）
// parent 父fiber，
// alternate 旧fiber
// effectTag 操作标记（用于最后的commit操作，该修改还是删除还是新增）

// reconcileChildren 的主要作用就是根据当前fiber的props.children（子虚拟dom对象数组），生成新的fiber，并建立父子绑定，兄弟绑定，形成fiber树结构。

// rerender() 中调用 Didact.render =>

// Didact.render(element, container) 产生第一个 fiber（wipRoot）, nextUnitofWork = wipRoot; =>

// 由于一开始就打开了 requestIdleCallback(workLoop) 等待任务 nextUnitofWork，fiber 产生后，进入 workLoop =>

// workLoop(deadline) 函数中，只要时间充分&&有下一个任务就一直执行 performUnitOfWork(nextUnitofWork)

// performUnitOfWork(fiber)，拿到该 fiber 所有的 element children，执行 reconcileChildren(fiber, elements);

// 第一次执行 reconcileChildren，根据fiber.props中的每个children---虚拟dom对象，创建了新的fiber，完成父子fiber的双向引用绑定。（此时 dom 为 null！还需要等待下一次进入 performUnitOfWork 执行 fiber.dom = createDom(fiber);）

// 执行完 performUnitOfWork，提供了新的 nextUnitofWork=fiber2，继续循环。

// 第二次进入 performUnitOfWork(fiber2)，
// 此时dom为空，则执行 fiber.dom = createDom(fiber); 根据fiber中的 type 和 props 创建 dom 。
// 再 reconcileChildren(fiber2, elements); 这里的 elements 即 fiber2.props.children，即虚拟dom元素，即 inputElement、h2Element。遍历根据类型和props生成两个新的fiber。添加父fiber引用，兄弟fiber引用。（if (index === 0) {wipFiber.child = newFiber;} 父fiber2的child 只引用第一个子fiber3）
// 结束 reconcileChildren  if (fiber.child) { return fiber.child; } 返回 fiber3

//
// 最后到了 commitRoot，先删掉能删的真实dom，再增删改真实dom，（一次性提交，一次性修改，不会显示一半的ui，专业）

// 初始化完毕！！！
