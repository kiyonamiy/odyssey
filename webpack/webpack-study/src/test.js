

const obj = {};
obj.count = 1;
console.log(obj.count);
setTimeout(() => {
    console.log(`test - ${obj.count}`);
}, 1000);
export default obj;