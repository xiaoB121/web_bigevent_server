const db = require('../db/index');
// 插入加密模块，验证密码是否正确
const bcryptjs = require('bcryptjs');
const { id } = require('@hapi/joi/lib/base');

// 获取用户基本信息
module.exports.getUserInfo = (req, res) => {
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?';
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err);
        // 执行 SQL 语句成功，但查询到数据条数不等于1
        if (results.length !== 1) return res.cc('获取用户信息失败！');

        // 把信息响应给客户端
        res.send({
            status: 0,
            message: '获取用户基本信息成功',
            data: results[0],
        });
    });
}

// 更新用户基本信息
module.exports.updateUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id = ?';
    db.query(sql, [req.body, req.user.id], (err, results) => {
        // 执行sql 语句失败
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！');
        return res.cc('修改用户基本信息成功！', 0);
    });
}

// 重置密码
module.exports.updatePassword = (req, res) => {
    // 查id 在不在
    const sql = 'select * from ev_users where id=?';
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('用户不存在');

        // 判断提交旧密码是否正确
        const compareResult = bcryptjs.compareSync(req.body.oldPwd, results[0].password);
        if (!compareResult) return res.cc('原密码错误！');

        // 更新新密码
        const sql = 'update ev_users set password = ? where id = ?';
        const newPwd = bcryptjs.hashSync(req.body.newPwd, 10);
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更新失败！');
            return res.cc('更新成功！', 0);
        });
    });
};

// 更新头像
module.exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic = ? where id = ?';
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err);
        // 执行成功了，但影响行数不等于1
        if (results.affectedRows !== 1) return res.cc('更新失败！');
        return res.cc('更新成功！', 0);
    });
}