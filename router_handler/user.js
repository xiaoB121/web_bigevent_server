// 导入数据库操作模块
const db = require('../db/index');
// 导入加密
const bcrypt = require('bcryptjs');
// 导入token字符串生成包
const jwt = require('jsonwebtoken');
// 导入jwt中间件
const config = require('../config');


//用户注册
exports.regUser = function (request, response) {
    // 获取用户信息
    const userinfo = request.body;

    // // 查询用户密码是否合法，是否为空
    // if (!userinfo.username || !userinfo.password) {
    //     // return response.send({ status: 1, message: '用户名不合法！' });
    //     return response.cc('用户名不合法！');
    // }

    // 查询用户名是否被占用了
    const sql = 'select * from ev_users where username = ?';
    db.query(sql, userinfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return response.cc(err);
        // 判断用户名是否被占用
        if (results.length > 0) return response.cc('用户名被占用，请更换其他用户名！');
        // 用户名可以使用

        // 密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10);

        const sql = 'insert into ev_users set ?';
        db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
            // 判断sql语句是否执行成功
            if (err) return response.cc(err);
            // 判断影响行数是否为1
            if (results.affectedRows !== 1) return response.cc('注册用户失败，请稍后再试');
            // 注册成功
            // response.send({ status: 0, message: '注册成功！' });
            response.cc('注册成功！', 0);
        });
    });



}

//用户登录
exports.login = function (request, response) {
    let userinfo = request.body;
    // 根据用户名查询用户的数据
    const sql = 'select * from ev_users where username =?';
    db.query(sql, userinfo.username, function (err, results) {
        // 执行 SQL 语句错误
        if (err) return response.cc(err);
        // 执行成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return response.cc('登录失败！');
        // T0DD:判断用户输入的登录密码是否和数据库中的密码一致

        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password);
        if (!compareResult) return response.cc('登录失败！');
        // T0DD:登录成功了

        // 生成token字符串
        const user = { ...results[0], password: '', user_pic: '' };
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', //有效期十小时
        });
        response.send({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr,
        });
    });

    // response.send('login OKk!');
}



