const TEXT_ELEMENT = "TEXT ELEMENT";

class Component {
    constructor(props) {
        this.props = props;
        this.state = this.state || {};
    }

    setState(partialState) {
        this.state = Object.assign({}, this.state, partialState);
    }
}

function createPublicInstance(element, internalInstance) {
    const { type, props } = element;
    const publicInstance = new type(props);
    publicInstance.__internalInstance = internalInstance;
    return publicInstance;
}

function instantiate(element) {
    const { type, props } = element;
    const isDomElement = typeof type === "string";

    if(isDomElement) {
        // Instantiate DOM element
        const isTextElement = type === TEXT_ELEMENT;
        const dom = isTextElement ? document.createTextNode("") : document.createElement(type);

        updateDomProperties(dom, [], props);

        const childElements = props.children || [];
        const childInstances = childElements.map(instantiate);
        const childDoms = childInstances.map(childInstance => childInstance.dom);
        childDoms.forEach(childDom => dom.appendChild(childDom));

        const instance = { dom, element, childInstances };
        return instance;
    } else {
        const instance = {};
        const publicInstance = createPublicInstance(element, instance);
        const childElement = publicInstance.render();
        const childInstance = instantiate(childElement);
        const dom = childInstance.dom;

        Object.assign(instance, { dom, element, childInstance, publicInstance });
        return instance;
    }
}

function reconcile(parentDom, instance, element) {
    if(instance == null) {
        // Create instance
        const newInstance = instantiate(element);
        parentDom.appendChild(newInstance.dom);
        return newInstance;
    } else if(element == null) {
        // Remove instance
        parentDom.removeChild(instance.dom);
        return null;
    } else if(instance.element.type !== element.type) {
        // Replace instance
        const newInstance = instantiate(element);
        parentDom.replaceChild(newInstance.dom, instance.dom);
        return newInstance;
    // 底下都是 type 相等的情况
    } else if(typeof element.type === "string") {
        updateDomProperties(instance.dom, instance.element.props, element.props);
        instance.childInstances = reconcileChildren(instance, element);
        instance.element = element;
        return instance;
    } else {
        // Update composite instance
        instance.publicInstance.props = element.props;
        const childElement = instance.publicInstance.render();
        const oldChildInstance = instance.childInstance;
        const childInstance = reconcile(parentDom, oldChildInstance, childElement);
        instance.dom = childInstance.dom;
        instance.childInstance = childInstance;
        instance.element = element;
        return instance;
    }
}

// 旧版
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

// 旧版
function instantiate(element) {
    const { type, props } = element;
    // Create DOM element
    const isTextElement = type === TEXT_ELEMENT;

    const dom = isTextElement ? document.createTextNode("") : document.createElement(type);

    updateDomProperties(dom, [], props);

    // Instantiate and append children
    const childElements = props.children || [];
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map(childInstance => childInstance.dom);
    childDoms.forEach(childDom => dom.appendChild(childDom));

    const instance = { dom, element, childInstances };
    return instance;
}