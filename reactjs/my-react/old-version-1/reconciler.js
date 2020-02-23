// Fiber tags
const HOST_COMPONENT = "host";
const CLASS_COMPONENT = "class";
const HOST_ROOT = "root";

// Global state
const updateQueue = [];
let nextUnitOfWork = null;
let pendingCommit = null;

function render(elements, containerDom) {
    updateQueue.push({
        from: HOST_COMPONENT,
        dom: containerDom,
        newProps: {
            children: elements
        }
    });
    requestIdleCallback(performWork);   // 一帧空闲时段执行
}

function scheduleUpdate(instance, partialState) {
    updateQueue.push({
        from: CLASS_COMPONENT,
        instance,
        partialState,
    });
    requestIdleCallback(performWork);
}


const ENOUGH_TIME = 1;  // milliseconds

function performWork(deadline) {
    workLoop(deadline);
    if(nextUnitOfWork || updateQueue.length > 0) {  // 如果还有任务就继续执行
        requestIdleCallback(performWork);
    }
}

function workLoop(deadline) {
    if(!nextUnitOfWork) {
        resetNextUnitOfWork();
    }

    while(nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {   // 还有剩余时间，那就继续执行（应该是保证每个 UnitOfWork 很小）   // timeRemaining: function 该帧剩余可用时间
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    if(pendingCommit) {
        commitAllWork(pendingCommit);
    }
}

// takes an update and convert to the first nextUnitOfWork
function resetNextUnitOfWork() {
    const update = updateQueue.shift();
    if(!update) {
        return;
    }

    // Copy the setState parameter from the update payload to the corresponding fiber
    if(update.partialState) {
        update.instance.__fiber.partialState = update.partialState;
    }

    const root = update.from == HOST_ROOT ? update.dom._rootContainerFiber : getRoot(update.instance.__fiber);

    nextUnitOfWork = {
        tag: HOST_ROOT,
        stateNode: update.dom || root.stateNode,
        props: update.newProps || root.props,
        alternate: root,
    };
}

function getRoot(fiber) {
    let node = fiber;
    while(node.parent) {
        node = node.parent;
    }
    return node;
}