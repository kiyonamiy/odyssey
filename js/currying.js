const currying = fn => {
    const args = [];
    
    return function() {
        if(arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            Array.prototype.push.apply(args, arguments);
            return arguments.callee;
        }
    }
}

const cost = (() => {
    let money = 0;

    return function() {
        for(let i = 0; i < arguments.length; i ++) {
            money += arguments[i];
        }
        return money;
    }
})();

const costCurrying = currying(cost);

costCurrying(100);
costCurrying(200);
costCurrying(300);
costCurrying(400);

costCurrying();
costCurrying();

console.log(costCurrying());