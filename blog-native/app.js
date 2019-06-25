const serverHandle = (req, res) => {

    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');

    // 返回数据
    const resData = {
        name: 'KiyonamiYu',
        site: 'local',
        env: process.env.NODE_ENV,
    }

    // 返回
    res.end(
        JSON.stringify(resData)
    );
}

module.exports = serverHandle;
//更多是业务配置