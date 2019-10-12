let rootInstance = null;

// Each DOM node will have a matching instance. 

function render(element, container) {
    const prevInstance = rootInstance;
    const nextInstance = reconcile(container, prevInstance, element);
    rootInstance = nextInstance;
}

function reconcile(parentDom, instance, element) {
    if(instance == null) {
        const newInstance = instantiate(element);
        parentDom.appendChild(newInstance.dom);
        return newInstance;
    } else {
        const newInstance = instantiate(element);
        parentDom.replaceChild(newInstance.dom, instance.dom);
        return newInstance;
    }
}

const TEXT_ELEMENT = "text element";


// An instance represents an element that has been rendered to the DOM. 
function instantiate(element) {
    const {type, props} = element;
    const isTextElement = type === TEXT_ELEMENT;
    const newDom = isTextElement ? document.createTextNode("") : document.createElement();

    // Add event listeners
    const isListener = name => name.startsWith("on");
    Object.keys(props).filter(isListener).forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        newDom.addEventListener(eventType, props[name]);
    });

    // Set properties
    const isAttribute = name => !isListener(name) && name !== "children";
    Object.keys(props).filter(isAttribute).forEach(name => {
        newDom[name] = props[name];
    });

    // Instantiate and append children
    const childElements = props.children || [];
    const childInstances = childElements.map(instantiate);  // {!!!}递归子节点
    const childDoms = childInstances.map(childInstance => childInstance.dom);
    childDoms.forEach(childDom => newDom.appendChild(childDom));

    const instance = { dom: newDom, element, childInstances };   // newDom 带了所有的子节点（此时应该还没有挂载到页面上）（但是应该只是根节点的索引）；element { type, props } 节点；childInstances 递归生成的 { newDom, element, childInstances } 数组
    return instance;
}