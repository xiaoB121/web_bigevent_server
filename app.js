const express = require('express');
const app = express();

// 导入并配置跨域cors中间件
const cors = require('cors');
app.use(cors());

//导入表单验证模块
const joi = require('@hapi/joi');

// 导入配置文件
const config = require('./config');

// 导入解析Token中间件
const expressJWT = require('express-jwt');



// 配置解析表单数据的中间件，就是解析 application/x-www-form-urlencoded 格式数据
app.use(express.urlencoded({ extended: false }));

//一定要在路由之前，封装res.cc 函数,cc函数必须放在token认证前
app.use((req, res, next) => {
    // status 默认值为1，表示失败的情况
    // err 的值，可能是一个错误对象，也可能是一个错误描述的字符串
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        });
    }
    next();
});

// 肯定在路由前，加入这个token认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }));




// 导入注册登录路由
const userRouter = require('./router/user');
app.use('/api', userRouter);

// 导入个人中心路由
const userInfoRouter = require('./router/userinfo');
app.use('/my', userInfoRouter);

// 导入文章分类管理路由
const artcateRouter = require('./router/artcate');
app.use('/my/article', artcateRouter);

// 导入文章管理路由
const articleRouter = require('./router/article');
app.use('/my/article', articleRouter);


// 错误中间件
app.use(function (err, req, res, next) {
    //数据验证错误
    if (err instanceof joi.ValidationError) return res.cc(err);

    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！');
    //未知错误
    res.cc(err);
})

app.listen(3007, () => {
    console.log('express server running at http://127.0.0.1:3007');
});