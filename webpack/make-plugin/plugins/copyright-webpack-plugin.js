// loader 都是函数；plugin 都是类
// 额外添加文件
class CopyrightWebpackPlugin {
    // constructor() {
    //     console.log('plugin start');
    // }

    apply(compiler) {
        // 在生命周期特定时间执行 (emit)
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
            // 添加文件
            compilation.assets['copyright.txt'] = {
                source: function() {
                    return 'copyright by Yu';
                },
                size: function() {
                    return 15;
                }
            }
            cb();
        })
    }
}

module.exports = CopyrightWebpackPlugin;