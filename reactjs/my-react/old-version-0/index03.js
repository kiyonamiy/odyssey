// In order to reuse dom nodes, we will need a way to update the dom properties (className, style, onClick, etc.) without creating a new dom node. 
let rootInstance = null;

const TEXT_ELEMENT = "TEXT ELEMENT";

function render(element, container) {
    const prevInstance = rootInstance;
    const nextInstance = reconcile(container, prevInstance, element);
    rootInstance = nextInstance;
}

function reconcile(parentDom, instance, element) {
    if(instance == null) {
        // Create instance
        const newInstance = instantiate(element);
        parentDom.appendChild(newInstance.dom);
        return newInstance;
    } else if (element == null) {
        // Remove instance
        parentDom.removeChild(instance.dom);
        return null;
    } else if(instance.element.type === element.type) {
        // Update instance
        updateDomProperties(instance.dom, instance.element.props, element.props);   // 只是更新了当前节点的属性，并没有处理子节点变化的情况
        instance.childInstances = reconcileChildren(instance, element);     // 调和子节点{!!!}
        instance.element = element;
        return instance;
    } else {
        // 只要类型不一样，全部替换
        const newInstance = instantiate(element);
        parentDom.replaceChild(newInstance.dom, instance.dom);
        return newInstance;
    }
}

function instantiate(element) {
    const { type, props } = element;
    // Create DOM element
    const isTextElement = type === TEXT_ELEMENT;

    const dom = isTextElement ? document.createTextNode("") : document.createElement(type);

    updateDomProperties(dom, {}, props);

    // Instantiate and append children
    const childElements = props.children || [];
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map(childInstance => childInstance.dom);
    childDoms.forEach(childDom => dom.appendChild(childDom));

    const instance = { dom, element, childInstances };
    return instance;
}

// 把所有旧的属性 prevProps 全部移除，再换上新属性 nextProps
function updateDomProperties(dom, prevProps, nextProps) {
    const isEvent = name => name.startsWith("on");
    const isAttribute = name => !isEvent && name !== 'children';

    // Remove event listeners
    Object.keys(prevProps).filter(isEvent).forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
    });

    // Remove attributes
    Object.keys(prevProps).filter(isAttribute).forEach(name => {
        dom[name] = null;
    });

    // Add event listeners
    Object.keys(nextProps).filter(isAttribute).forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, nextProps[name]);
    });

    // Set attributes
    Objects.keys(nextProps).filter(isEvent).forEach(name => {
        dom[name] = nextProps[name];
    })
}

function reconcileChildren(instance, element) {
    const dom = instance.dom;
    const childInstances = instance.childInstances;
    const nextChildElements = element.props.children || [];
    const newChildInstances = [];
    const count = Math.max(childInstances.length, nextChildElements.lenth);
    for(let i = 0; i < count; i ++) {
        const childInstance = childInstances[i];
        const childElement = nextChildElements[i];
        const newChildInstance = reconcile(dom, childInstance, childElement);   // {!!!}递归
        newChildInstance.push(newChildInstance);
    }

    return newChildInstances.filter(instance => instance != null);
}

// problems {!!!}
// Every change triggers the reconciliation on the full virtual DOM tree
// State is global
// We need to explicitly call the render function after changes to the state