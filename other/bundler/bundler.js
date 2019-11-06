const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = (filename) => {
    const content = fs.readFileSync(filename, 'utf-8');
    // 解析为 抽象语法树
    const ast = parser.parse(content, {
        sourceType: 'module'
    });

    // 解析入口文件依赖
    const dependencies = {};
    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirname = path.dirname(filename);
            const newFile = `./${path.join(dirname, node.source.value)}`;
            dependencies[node.source.value] = newFile;
        }
    });

    // 翻译代码，将 es6 代码转化为 es5
    const { code } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    })

    return {
        filename,
        dependencies,
        code
    }
}

const moduleInfo = moduleAnalyser('./src/index.js');
console.log(moduleInfo);