const express = require('express');
const router = express.Router();

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入文章的验证模块
const { add_article_schema, delete_article_schema } = require('../schema/article');


// 导入解析formdata格式表单
const multer = require('multer');
// 导入处理路径模块
const path = require('path');

// 创建multer实例对象，通过dest属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') });

// 应用模块
const article_handler = require('../router_handler/article');



// 发布文章
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle);
// 获取文章的列表数据
router.get('/list', article_handler.getArticle);
// 根据id删除文章数据
router.get('/delete/:id', expressJoi(delete_article_schema), article_handler.deleteArticleById);

module.exports = router;