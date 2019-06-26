const env = process.env.NODE_ENV;

let MYSQL_CONF;

if(env === 'dev') {
    MYSQL_CONF = {
        host: '192.168.147.128',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }
}

if(env === 'production') {
    MYSQL_CONF = {
        host: '192.168.147.128',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF,
};