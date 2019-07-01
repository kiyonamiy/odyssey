const xss = require('xss');
const { exec } = require('../db/mysql');

const getList = async (author, keyword) => {
    let sql = `select id, title, content, createtime, author from blogs where 1=1`;        // 1=1 永远成立 占位
    if(author) {
        sql += ` and author='${author}'`;
    }
    if(keyword) {
        sql += ` and title like '%${keyword}%'`;
    }
    
    sql += ` order by createtime desc`;
    // 返回 Promise
    return await exec(sql); 
}

const getDetail = async id => {
    let sql = `select * from blogs where id=${id}`;
    return await exec(sql).then(rowDataPacket => rowDataPacket[0]);   // 返回的是一个只有一个元素的数组
}

const newBlog = async (blogData = {}) => {
    const title = xss(blogData.title);
    const content = xss(blogData.content);
    const author = blogData.author;
    const createTime = Date.now();
    let sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', '${createtime}')`;
    return await exec(sql).then(okPacket => okPacket.insertId);
}

const updateBlog = async (id, blogData = {}) => {
    let sql = `update blogs set title='${blogData.title}', content='${blogData.content}' where id=${id}`;
    return await exec(sql).then(okPacket => {
        if(okPacket.affectedRows > 0) {
            return true;
        }
        return false;
    })
}

const delBlog = async (id, author) => {
    let sql = `delete from blogs where id=${id} and author='${author}'`;
    return await exec(sql).then(okPacket => {         //!!!一定要注意 return promise
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