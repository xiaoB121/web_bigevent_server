const mysql = require('mysql');

// 设置数据库链接信息
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'my_db_01'
});

//暴漏出去
module.exports = db;