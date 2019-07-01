const fs = require('fs')
const path = require('path')

// function getContentFile (fileName,callback) {
//     const fullFileName = path.resolve(__dirname, 'files', fileName)
//     fs.readFile(fullFileName, (err, data) => {
//         if (err) {
//             console.error(err)
//             return
//         }

//         callback(data.toString())
//     })
// }

// getContentFile('a.json', aData => {
//     console.log('this is a', aData)
//     getContentFile('b.json', bData => {
//         console.log('this is b', bData)
//         getContentFile('c.json', cData => {
//             console.log('this is c', cData)
//         })
//     })
// })

function getContentFile(fileName) {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    const promise = new Promise((resolve, reject) => {
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject(err)
                return
            }
    
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}

getContentFile('a.json').then(aData => {
    console.log('this aData', aData)
    return getContentFile(aData.next)
}).then(bData => {
    console.log('this bData', bData)
    return getContentFile(bData.next)
}).then(cData => {
    console.log('this cData', cData)
}).catch(err => {
    console.log(err)
})

// async await 要点：
// 相当于一个 promise 的语法糖
// 1. await 后面可以追加 promise 对象，获取 resolve 的值
// 2. await 必须包裹在 async 函数里
// 3. async 函数执行返回的也是一个 promise 对象
// 4. try-catch 获取 reject 的值
async function readFileData() {
    // 同步写法
    try {
        const aData = await getContentFile('a.json');
        console.log('a data', aData);
        const bData = await getContentFile(aData.next);
        console.log('b data', bData);
        const cData = await getContentFile(bData.next);
        console.log('c data', cData);
    } catch(err) {
        console.log(err);
    }
}

readFileData();

// // 实践 第 3 点
// async function readData() {
//     const aData = await getContentFile('a.json');
//     return aData;
// }

// async function test() {
//     const aData = await readData();
//     console.log(aData);
// }

// test();