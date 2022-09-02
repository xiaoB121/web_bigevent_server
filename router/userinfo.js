const express = require('express');
const router = express.Router();

// 引入用户应用
const userinfoHandler = require('../router_handler/userinfo');

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi');
// 引入验证规则对象
const {
    update_userinfo_schema,
    update_password_schema,
    update_avatar_schema, }
    = require('../schema/user');


// 获取用户信息
router.get('/userinfo', userinfoHandler.getUserInfo);
// 更新用户信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfoHandler.updateUserInfo);
// 重置密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfoHandler.updatePassword);
// 更新头像
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfoHandler.updateAvatar);

module.exports = router;