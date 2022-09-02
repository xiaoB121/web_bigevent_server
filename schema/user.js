// 导入用户验证规则模块
const joi = require('@hapi/joi');

// 注册登录
// 用户验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();
// 注册和登录表单的验证规则对象，暴露出去
exports.reg_login_schema = {
    body: {
        username,
        password,
    }
};

// 用户基本信息
// 定义 id, nickname, emial 的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();
// 更新用户基本信息表单数据验证
exports.update_userinfo_schema = {
    body: {
        id,
        username,
        nickname,
        email,
    }
};

// 重置密码
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
        reNewPwd: joi.ref('newPwd'),
    }
};

// 验证头像
const avatar = joi.string().dataUri().required();
exports.update_avatar_schema = {
    body: {
        avatar,
    }
};