const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
    let sql = `select id, title, content, createtime, author from blogs where 1=1`;        // 1=1 永远成立 占位
    if(author) {
        sql += ` and author='${author}'`;
    }
    if(keyword) {
        sql += ` and title like '%${keyword}%'`;
    }
    
    sql += ` order by createtime desc`;
    // 返回 Promise
    return exec(sql); 
}

const getDetail = id => {
    let sql = `select * from blogs where id=${id}`;
    return exec(sql).then(rowDataPacket => rowDataPacket[0]);   // 返回的是一个只有一个元素的数组
}

const newBlog = (blogData = {}) => {
    let sql = `insert into blogs (title, content, author, createtime) values ('${blogData.title}', '${blogData.content}', '${blogData.author}', '${blogData.createtime}')`;
    return exec(sql).then(okPacket => okPacket.insertId);
}

const updateBlog = (id, blogData = {}) => {
    let sql = `update blogs set title='${blogData.title}', content='${blogData.content}' where id=${id}`;
    return exec(sql).then(okPacket => {
        if(okPacket.affectedRows > 0) {
            return true;
        }
        return false;
    })
}

const delBlog = (id, author) => {
    let sql = `delete from blogs where id=${id} and author='${author}'`;
    return exec(sql).then(okPacket => {         //!!!一定要注意 return promise
        if(okPacket.affectedRows > 0) {
            return true;
        }
        return false;
    });
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}