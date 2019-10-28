/**
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

export const TEXT_ELEMENT = "TEXT ELEMENT";

function createElement(type, config, ...args) {
    const props = Object.assign({}, config);
    const hasChildren = args.length > 0;
    const rawChildren = hasChildren ? [...args] : [];
    props.children = rawChildren
                        .filter(child => child != null && child !== false)
                        .map(child => child instanceof Object ? child : createTextElement(child));
    return { type, props };
}

function createTextElement(value) {
    return createElement(TEXT_ELEMENT, { nodeValue: value });
}