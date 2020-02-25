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
  parent: fiber1,
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
// parent 父fiber，() // const domParent = fiber.parent.dom; 在最后 commit 中，通过该引用拿到父节点的dom，调用appendChild、removeChild操作当前fiber的dom。
// alternate 旧fiber
// effectTag 操作标记（用于最后的commit操作，该修改还是删除还是新增）

// 过程挺简单的就是，拿到一个fiber，就是一个工作单元，执行，拿到下一个fiber，如果时间空闲就执行。关键是这个fiber的数据结构比较复杂，各种链和属性。

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

// 先从根节点直接到最底的子节点，再从子节点从下至上遍历每层的兄弟节点，一直重新回到顶层父节点，结束。

//
// 最后到了 commitRoot，先删掉能删的真实dom，再增删改真实dom，（一次性提交，一次性修改，不会显示一半的ui，专业）

// 初始化完毕！！！

// 当点击 h1 的时候，调用 setState，因为 闭包 的缘故，内部的 hook 即为对应的 hook 。
// 其实就做了两件事情，
// 一个是将要执行的动作 * 放入队列 *（所以调用的时候，并没有改变state的值！！！而是等下一次经过actions.forEach(action)执行）！
// 一个是创建新的从div#root开始的工作单元（fiber）, 赋值给nextUnitOfWork，等待浏览器空闲执行。

// 然后新的工作单元开始，又按照之前的逻辑走了下来，因为是函数组件，又执行到了 updateFunctionComponent（wipFiber=当前的fiber，hookIndex清零又可以重新对应），又会调用一次fiber.type(fiber.props)，执行了一次函数组件，走了内部，又调用了一遍 useState，
// wipFiber 是当前组件，其 alternate 属性保存着对应的旧的 fiber，从中取出对应的旧hook{state: 1, queue: [function(setState放进去的), ]}（因为component内部的useState是按顺序重新执行，index又重新置为0，所以又一一对应上）。
// 又新建hook{state: oldHook.state, queue: []}
// 现在执行 oldHook.actionQueue，赋值给当前的 hook.state
// 所以说异步，并不是真的异步，只是放入一个队列，统一遍历执行 hook.state = newState，自然会是前面的覆盖后面的。
const actions = oldHook ? oldHook.queue : [];
actions.forEach(action => {
  hook.state = action instanceof Function ? action(hook.state) : action; // 所以函数可以使用上一个state的值进行累加，而单纯的连续的 setState(1), setState(2), setState(3) 只会等于最后的 3。
});

/** @jsx Didact.createElement */
function Counter() {
  const [count1, setCount1] = Didact.useState(0); // 当重新渲染的时候，执行到这里！会遍历 hook.actionQueue，全部执行！！！hook.state = action；所以会覆盖！！！// 拿到3，就是 Count: {count1}
  const [count2, setCount2] = Didact.useState(0);

  return (
    <div>
      <h1
        onClick={() => {
          // 当这么写的时候，点击触发事件，浏览器会按顺序执行，虽然会进去setState中，生成新的nextUnitOfWork，但是！！！浏览器并不空闲（异步产生原因）！！！!!!所以并不会重新渲染，而是执行完这个函数()=>{set,set,set}才会空闲！！！
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

// react 提高性能的两个方式：shouldComponentUpdate && Key 的使用

// 口头表述 setState 异步原理：
// 假如一个按钮，里面触发的事件是 setState(1); setState(2); setState(3);
// 首先先理解一下 setState 内部做了哪些操作？就做了两件事情，一个是将当前的参数放入当前hook的执行队列，并没有执行或赋值！二是产生新的unitOfWork，浏览器可以等空闲的时候，requestIdleCallBack 就会执行 workLoop，重新渲染了。
// 所以执行setState(1)将1放入队列，同时生成新的工作单元，但此时浏览器并不空闲，不能重新渲染，因为还在执行触发的事件；
// 所以继续执行setState(2)将2放入队列，没有执行；
// 同理将setState(3)将3放入队列，没有执行，此时事件函数结束，浏览器空闲，因为之前产生了新的unitofwork即fiber，requestIdleCallBack执行从头渲染。
// 又进入到了组件函数内部，又遇到了 React.useState(0)，进入到u sestate 函数内部，拿到旧的hook，此时的hook内部有一个队列，放着1，2，3。此时才执行（点击不执行，存队列，重新渲染的时候一次执行），一次性遍历队列赋值！！！hook.state=newState，所以产生了覆盖！
// 所以组件函数内部取到[3, setState]，再将3渲染到屏幕上。
