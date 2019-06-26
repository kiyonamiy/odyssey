const getList = (author, keyword) => {
    //先返回假数据（格式正确）
    return [
        {
            id: 1, 
            title: '标题1',
            content: '内容1',
            createTime: 1546610491112,
            author: 'zhangsan'
        },
        {
            id: 2, 
            title: '标题2',
            content: '内容2',
            createTime: 1546610501112,
            author: 'lisi'
        }
    ]
}

const getDetail = (id) => {
    ////先返回假数据（格式正确）
    return {
        id: 1, 
        title: '标题1',
        content: '内容1',
        createTime: 1546610491112,
        author: 'zhangsan'
    }
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content 属性

    return {
        id: 3      //表示新建博客，插入到数据表里面的 id
    }
}

const updateBlog = (id, blogData = {}) => {
    return true;
}

const delBlog = (id) => {
    return true;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}