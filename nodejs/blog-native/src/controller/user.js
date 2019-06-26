const { exec } = require('../db/mysql');

const loginCheck = (username, password) => {
    let sql = `select username, realname from users where username='${username}' and password='${password}'`;
    return exec(sql).then(rowDataPacket => rowDataPacket[0] || {});
}

module.exports = {
    loginCheck,
}

/**
 * delete insert update
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '(Rows matched: 1  Changed: 1  Warnings: 0',  protocol41: true,
  changedRows: 1 
}
 */

/**
 * selet!!!
[ RowDataPacket {
    id: 2,
    title: '标题B',
    content: '内容B',
    createtime: 1561534541928,
    author: 'lisi' },
  RowDataPacket {
    id: 1,
    title: '标题A',
    content: '内容A',
    createtime: 1561534541828,
    author: 'zhangsan' } 
]
 */