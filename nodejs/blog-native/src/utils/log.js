const fs = require('fs');
const path = require('path');

const ACCESS_FILE_NAME = 'access.log';

// 写日志（关键）
const writeLog = (writeStream, log) => {
    writeStream.write(log + '\n');
}

const createWriteStream = fileName => {
    const fullFileName = path.resolve(__dirname, '../', '../', 'log', fileName);
    return fs.createWriteStream(fullFileName);
}

const accessWriteStream = createWriteStream(ACCESS_FILE_NAME);
const access = log => {
    writeLog(accessWriteStream, log);
}

module.exports = {
    access,
}