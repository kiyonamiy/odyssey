const TEXT_ELEMENT = "TEXT ELEMENT";

/**
 * 
 * @param {*} type 
 * @param {*} config 
 * @param  {...any} args 
 */
// 并没有实际性的增加，而是改进了开发体验（只是封装，或者配合 babel 解析。这和按照规则直接写 element 是一样的
function createElement(type, config, ...args) {
    const props = Object.assign({}, config);
    // 处理子节点（之后传入的参数，都是子节点（只是多做了这一步
    const hasChildren = args.length > 0;
    const rawChildrenElements = hasChildren ? [...args] : [];
    // 如果传入的不是对象而是字符串，需要创建文字对象
    props.children = rawChildrenElements.map(rawChildrenElement => rawChildrenElement instanceof Object ? rawChildrenElement : createTextElement(rawChildrenElement))

    return { type, props };
}

function createTextElement(str) {
    return createElement(TEXT_ELEMENT, { nodeValue: str });
    // // 等价于
    // return {
    //     type: TEXT_ELEMENT,
    //     nodeValue: str,
    // }
}

/**
 * 
 * @param {*} element 
 * @param {*} parentDom 
 */
// equivalent to ReactDOM.render
// Note that we are setting the element properties instead of attributes.
function render(element, parentDom) {
    const { type, props } = element;    // type 和 props 一定不为 null

    // 将 DOM 文字节点的 type 特殊化 并 判断
    const isTextElement = type === TEXT_ELEMENT;

    const newDom = isTextElement ? document.createTextNode("") : document.createElement(type);

    // 处理监听事件
    const isListener = name => name.startsWith("on");
    Object.keys(props).filter(isListener).forEach(name => {
        newDom.addEventListener(name, props[name]);
    });
    
    // 处理其他属性
    const isAttribute = name => !isListener(name) && name !== "children";
    Object.keys(props).filter(isAttribute).forEach(name => {
        newDom[name] = props.name;
    })

    // 递归处理子节点 props.children
    const childElemnts = props.children || [];
    childElemnts.foreach(childElement => {
        render(childElement, newDom);
    });

    parentDom.append(newDom);
}


/**

createElement

const element = (
  <div id="container">
    <input value="foo" type="text" />
    <a href="/bar">bar</a>
    <span onClick={e => alert("Hi")}>click me</span>
  </div>
);

==============================================

const element = createElement(
  "div",
  { id: "container" },
  createElement("input", { value: "foo", type: "text" }),
  createElement(
    "a",
    { href: "/bar" },
    "bar"
  ),
  createElement(
    "span",
    { onClick: e => alert("Hi") },
    "click me"
  )
);

 */


/**

render

<div id="container">
    <input value="foo" type="text">
    <a href="/bar"></a>
    <span>my-test-text</span>
</div>

==============================================

// elements 只包含两个属性：type 和 props 。
// props 中包含子节点 children ，结构相同。（递归的关系）
const element = {
    // type 可以是一个字符串或者一个函数
    type: 'div',
    // props 可以是空对象，但不为 null
    props: {
        id: 'container',
        children: [
            {
                type: 'input',
                props: {
                    value: 'foo',
                    type: 'text',
                }
            },
            {
                type: 'a',
                props: {
                    href: '/bar',
                }
            },
            {
                type: span,
                props: {
                    children: [
                        {
                            type: "TEXT ELEMENT",
                            nodeValue: "my-test-text",
                        },
                    ]
                }
            }
        ]
    }
}
 */