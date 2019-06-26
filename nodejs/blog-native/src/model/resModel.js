class BaseModel {
    constructor(data, message) {        //默认 data 是对象， message 是字符串
        if(typeof data === 'string') {  //兼容方式，若只传了一个字符串
            this.message = data;
            data = null;
            message = null;
        }
        if(data) {
            this.data = data;
        }
        if(message) {
            this.message = message;
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = 0;
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
};